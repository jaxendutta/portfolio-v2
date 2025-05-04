// src/components/sections/project/sections/OverviewSection.tsx
"use client";

import {
    OverviewItem as OverviewSectionType,
    ProjectLink,
} from "@/types/project";
import { motion } from "framer-motion";
import { codeFont } from "@/lib/fonts";
import ProjectButton from "@/components/ui/ProjectButton";
import { ProjectPageSection } from "../ProjectPageSection";

interface OverviewSectionProps {
    overview: OverviewSectionType[];
    links: ProjectLink[];
}

export default function OverviewSection({
    overview,
    links,
}: OverviewSectionProps) {
    return (
        <ProjectPageSection
            title={[]}
            className="flex-none w-screen h-screen flex items-center justify-center snap-start"
            id="overview"
        >
            <div className="flex flex-col items-center w-full max-w-4xl px-8">
                {overview.map((section, index) => (
                    <motion.div
                        key={index}
                        className={`mb-8 w-full flex flex-col items-center ${codeFont}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div
                            className={`leading-relaxed max-w-3xl text-center ${section.className}`}
                        >
                            {section.content}
                        </div>
                    </motion.div>
                ))}
                {/* Project Links */}
                {links.length > 0 && (
                    <div className="mt-4 w-full flex justify-evenly flex-wrap">
                        {links.map((link, linkIndex) => (
                            <ProjectButton
                                key={linkIndex}
                                link={link}
                                index={linkIndex}
                            />
                        ))}
                    </div>
                )}
            </div>
        </ProjectPageSection>
    );
}
