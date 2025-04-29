// src/components/sections/project/sections/TechStackSection.tsx
"use client";

import { displayFont } from "@/lib/fonts";
import { motion } from "framer-motion";
import { SkillTag } from "@/components/ui/Tag";
import { ProjectPageSection } from "../ProjectPageSection";

interface TechStackCardProps {
    category: string;
    technologies: string[];
    categoryIndex: number;
}

const TechStackCard: React.FC<TechStackCardProps> = ({
    category,
    technologies,
    categoryIndex,
}) => {
    return (
        <motion.div
            key={categoryIndex}
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: categoryIndex * 0.1,
            }}
        >
            <div className="border relative">
                <div
                    className={`p-0.5 text-2xl ${displayFont} bg-theme lowercase border absolute -translate-x-4 -translate-y-1/2`}
                >
                    {category}
                </div>

                <div className="flex flex-wrap p-4 gap-2 mt-4">
                    {technologies.map((tech, techIndex) => (
                        <SkillTag key={techIndex} skill={tech} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

interface TechStackSectionProps {
    id?: string;
    techStack: Record<string, string[]>;
}

export default function TechStackSection({
    id,
    techStack,
}: TechStackSectionProps) {
    return (
        <ProjectPageSection
            id={id}
            title={["TECHSTACK", "T3chs✝aCk", "TeCH$t4cK"]}
        >
            {Object.entries(techStack).map(
                ([category, technologies], categoryIndex) => (
                    <TechStackCard
                        key={categoryIndex}
                        category={category}
                        technologies={technologies}
                        categoryIndex={categoryIndex}
                    />
                )
            )}
        </ProjectPageSection>
    );
}
