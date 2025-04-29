// src/components/sections/project/sections/TechStackSection.tsx
"use client";

import { displayFont } from "@/lib/fonts";
import { motion } from "framer-motion";
import { SkillTag } from "@/components/ui/Tag";
import { ProjectPageSection } from "@/components/sections/project/ProjectPageSection";

interface TechStackSectionProps {
    id?: string;
    techStack: Record<string, string[]>;
}

export default function TechStackSection({
    id,
    techStack,
}: TechStackSectionProps) {
    const categories = Object.entries(techStack);
    return (
        <ProjectPageSection
            id={id}
            title={["TECHSTACK", "T3chs✝aCk", "TeCH$t4cK"]}
        >
            <div className="w-full h-[75vh] max-w-5xl mx-auto p-6 flex items-center justify-center">
                <div className="columns-1 md:columns-2 gap-8">
                    {categories.map(
                        ([category, technologies], categoryIndex) => (
                            <motion.div
                                key={categoryIndex}
                                className="relative my-8 px-4 py-8 break-inside-avoid-column border border-current"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 25px 25px, var(--color-text) 0.3%, transparent 0.6%)`,
                                    backgroundSize: "50px 50px ",
                                    backgroundBlendMode: "soft-light",
                                }}
                            >
                                {/* Category label */}
                                <div
                                    className={`absolute -top-3 left-4 px-3 ${displayFont} text-xl bg-theme lowercase`}
                                >
                                    {category}
                                </div>

                                {/* Decorative circuit nodes */}
                                <div className="absolute top-1/4 right-2 w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>
                                <div className="absolute bottom-2 left-1/4 w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>

                                {/* Tech chips */}
                                <div className="flex flex-wrap gap-2.5 mt-2">
                                    {technologies.map((tech, techIndex) => (
                                        <SkillTag
                                            key={techIndex}
                                            skill={tech}
                                        />
                                    ))}
                                </div>

                                {/* Circuit traces */}
                                <div className="absolute bottom-2 right-2 w-8 h-px bg-current opacity-30"></div>
                                <div className="absolute bottom-0 right-6 w-px h-2 bg-current opacity-30"></div>
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        </ProjectPageSection>
    );
}
