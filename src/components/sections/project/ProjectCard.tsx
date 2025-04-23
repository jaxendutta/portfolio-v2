"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectData } from "@/types/project";
import { displayFont } from "@/lib/fonts";
import { fadeIn } from "@/lib/motionVariants";
import RotatingButton from "@/components/ui/RotatingButton";

interface ProjectCardProps {
    id: string;
    project: ProjectData;
    reversed?: boolean;
}

export default function ProjectCard({
    id,
    project,
    reversed = false,
}: ProjectCardProps) {
    // Use mobile screenshot vs desktop logic based on the ID
    // This is a simple heuristic - we can also check for known mobile projects
    const isMobileProject = ["fabler", "hivemind"].includes(id);
    const projectLink = `/projects/${id}`;

    const exploreButton = (
        <RotatingButton
            className={`hidden md:block ${reversed ? "md:rotate-180" : ""}`}
            centerIcon={project.icon}
            href={projectLink}
            texts={["Explore", "Learn", "More"]}
            size={75}
            fontSize={12}
        />
    );

    return (
        <motion.div
            className="w-[90vw] mx-auto my-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
        >
            <div
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-10 items-center`}
            >
                {/* Project Info */}
                <div
                    className={`w-full md:w-1/2 flex flex-col gap-4 items-center ${reversed ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}
                >
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <Link
                            href={projectLink}
                            className={`text-4xl md:text-5xl lg:text-6xl ${displayFont} italic hover:text-accent transition-colors`}
                            style={{
                                textDecoration: "none",
                                fontStyle: "italic",
                            }}
                        >
                            {project.name.toUpperCase()}
                            {project.subtitle && (
                                <span className="text-2xl md:text-3xl">
                                    {` ${project.subtitle.toUpperCase()}`}
                                </span>
                            )}
                        </Link>
                        <div className="md:hidden">{exploreButton}</div>
                    </div>

                    <div
                        className={`flex flex-wrap gap-2 my-2 justify-center ${reversed ? "md:justify-start" : "md:justify-end"}`}
                    >
                        {project.techStack &&
                            Object.values(project.techStack)
                                .flat()
                                .map((tech, i) => (
                                    <motion.span
                                        key={i}
                                        className="px-3 py-1 border border-current rounded-full text-sm whitespace-nowrap"
                                        whileHover={{
                                            backgroundColor:
                                                "var(--color-text)",
                                            color: "var(--color-background)",
                                            boxShadow:
                                                "0 0 8px var(--color-text)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                    </div>

                    <div className="hidden md:flex">{exploreButton}</div>
                </div>

                {/* Project Image */}
                <div
                    className={`w-full md:w-2/5 relative ${isMobileProject ? (reversed ? "md:-rotate-5" : "md:rotate-5") : ""}`}
                >
                    <Link href={projectLink}>
                        <Image
                            src={`/assets/${id}.png`}
                            alt={project.name}
                            width={isMobileProject ? 280 : 800}
                            height={isMobileProject ? 600 : 450}
                            className={`relative ${isMobileProject ? "max-w-[280px]" : "max-w-[800px]"} mx-auto w-full h-auto ${!isMobileProject ? "border border-white rounded-sm" : ""}`}
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
