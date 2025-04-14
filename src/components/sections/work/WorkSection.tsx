"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import RotatingButton from "@/components/ui/RotatingButton";
import { WorkItems } from "@/components/sections/work/WorkItem";
import { workData } from "@/data/workData";
import { GiLockedChest, GiOpenTreasureChest } from "react-icons/gi";

export default function WorkSection() {
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
        {}
    );
    const workIds = Object.keys(workData);
    const allExpanded =
        workIds.length > 0 && workIds.every((id) => expandedItems[id]);

    const toggleItem = (id: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleAll = () => {
        if (allExpanded) {
            // Collapse all
            setExpandedItems({});
        } else {
            // Expand all
            const newState: Record<string, boolean> = {};
            workIds.forEach((id) => {
                newState[id] = true;
            });
            setExpandedItems(newState);
        }
    };

    return (
        <Section
            sectionHeaderProps={{
                title: "WORK",
                actionButton: (
                    <RotatingButton
                        className="transition-all duration-300 ease-in-out z-100"
                        onClick={toggleAll}
                        texts={
                            allExpanded
                                ? ["Click Here", "To Collapse All"]
                                : ["Click Here", "To Expand All"]
                        }
                        centerIcon={
                            allExpanded ? GiOpenTreasureChest : GiLockedChest
                        }
                    />
                ),
            }}
        >
            <WorkItems expandedItems={expandedItems} toggleItem={toggleItem} />
        </Section>
    );
}
