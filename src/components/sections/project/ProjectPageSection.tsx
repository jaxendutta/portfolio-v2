// src/components/sections/project/ProjectPageSection.tsx
"use client";

import { motion } from "framer-motion";
import { displayFont } from "@/lib/fonts";

interface ProjectPageSectionProps {
    id?: string;
    title: string[];
    children?: React.ReactNode;
}

export const ProjectPageSection = ({
    id,
    title,
    children,
}: ProjectPageSectionProps) => {
    return (
        <section
            id={id}
            className="flex items-center justify-center snap-start"
        >
            <div className="flex items-center justify-center -rotate-90 text-5xl">
                <motion.span
                    className={displayFont}
                    style={{
                        fontStyle: "italic",
                    }}
                >
                    {title.join("\n")}
                </motion.span>
            </div>

            <div className="flex">{children}</div>
        </section>
    );
};
