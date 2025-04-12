// src/components/work/WorkItem.tsx
"use client";

import { WorkExperience } from "@/types/work";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import parse from "html-react-parser";

interface WorkItemProps {
    id: string;
    data: WorkExperience;
    index: number;
}

export default function WorkItem({ data, index }: WorkItemProps) {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    return (
        <motion.div
            className={`relative overflow-hidden flex flex-col font-code h-24 w-[87.5vw] cursor-pointer border-b border-b-text-dark dark:border-b-text-dark z-10 ${
                isActive ? "min-h-[300px]" : ""
            }`}
            animate={{
                height: isActive ? "auto" : "6rem",
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{
                backgroundColor: isActive ? "" : "var(--highlight-dark)",
                color: isActive ? "" : "var(--highlight-font-dark)",
            }}
        >
            {/* Header section */}
            <div className="w-full h-24 box-border px-5 flex justify-between items-center relative flex-shrink-0 top-0 left-0 right-0 z-20">
                <div className="flex items-center">
                    <div className="text-4xl mr-5 flex items-center before:content-[counter(option-counter,decimal-leading-zero)] before:counter-increment-[option-counter]">
                        {(index + 1).toString().padStart(2, "0")}.
                    </div>
                    <div className="flex-grow flex flex-col justify-center pr-8">
                        <div className="font-bold text-2xl">{data.title}</div>
                        <div className="text-xl flex flex-wrap items-center">
                            <span>
                                <a
                                    href={data.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-inherit no-underline transition-colors duration-300 hover:text-accent-dark flex items-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {data.company}
                                    <FaExternalLinkAlt className="ml-1 text-sm transform transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5" />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="w-5 h-5 relative transition-transform duration-300 cursor-pointer z-20 flex-shrink-0"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    onClick={toggleActive}
                >
                    <span className="absolute top-1/2 left-0 right-0 h-0.5 bg-text-dark dark:bg-text-dark transform -translate-y-1/2"></span>
                    <span className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-text-dark dark:bg-text-dark transform -translate-x-1/2"></span>
                </motion.div>
            </div>

            {/* Content section */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="w-3/4 px-10 py-5 opacity-0 flex flex-col items-start text-text-dark dark:text-text-dark relative left-0 right-0 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-wrap justify-start gap-2.5 pointer-events-none">
                            {data.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="font-sans text-base text-text-dark dark:text-text-dark align-middle p-[5px_7.5px] border border-text-dark dark:border-text-dark rounded-[30px]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {data.team && (
                            <div className="pt-4 pb-4 w-full border-b border-b-text-dark dark:border-b-text-dark">
                                {data.team.url ? (
                                    <a
                                        href={data.team.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-inherit no-underline inline-flex items-center transition-colors duration-300 hover:text-accent-dark"
                                    >
                                        {data.team.name}
                                        <FaExternalLinkAlt className="ml-1 text-xs transform transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5" />
                                    </a>
                                ) : (
                                    data.team.name
                                )}
                            </div>
                        )}

                        {data.description.map((desc, i) => (
                            <div key={i} className="text-base mt-4">
                                {parse(desc)}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Date vertical line */}
            <motion.div
                className="absolute right-5 top-20 bottom-5 flex flex-col items-center justify-between opacity-0 z-10"
                animate={{
                    opacity: isActive ? 1 : 0,
                    height: isActive ? "calc(100% - 6rem)" : "0",
                }}
                transition={{ duration: 0.3 }}
            >
                <span className="writing-vertical-rl text-orientation-mixed text-sm">
                    {data.duration.start.replace(" ", "\u00A0")}
                </span>

                <motion.div
                    className="flex-grow w-0.5 bg-text-dark dark:bg-text-dark my-2.5 origin-top"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.75, ease: "easeInOut" }}
                />

                <span className="writing-vertical-rl text-orientation-mixed text-sm">
                    {data.duration.end.replace(" ", "\u00A0")}
                </span>
            </motion.div>
        </motion.div>
    );
}
