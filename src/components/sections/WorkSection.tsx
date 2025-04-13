// src/components/sections/WorkSection.tsx
"use client";

import WorkItem from "@/components/work/WorkItem";
import Section from "@/components/ui/Section";
import { workData } from "@/data/workData";

export default function WorkSection() {
    const workIds = Object.keys(workData);
    return (
        <Section title="WORK">
            <div className="my-20 flex flex-col items-center">
                <div className="w-[90vw] max-w-[1200px] flex flex-col counter-reset-[option-counter]">
                    {workIds.map((id, index) => (
                        <WorkItem
                            key={id}
                            id={id}
                            data={workData[id]}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
