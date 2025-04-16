"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WorkExperience } from "@/types/work";
import Link from "next/link";
import parse from "html-react-parser";
import { RxPlus } from "react-icons/rx";
import { TbArrowLeftFromArc } from "react-icons/tb";
import { workData } from "@/data/workData";
import { code } from "@/styles/fonts";

// Individual work item component with animations
export const WorkItem = ({
    data,
    index,
    isActive,
    onToggle,
}: {
    data: WorkExperience;
    index: number;
    isActive: boolean;
    onToggle: () => void;
}) => {
    return (
        <motion.div
            className={`px-2 md:px-4 py-2 relative overflow-hidden flex flex-col justify-center w-full border-b border-current ${code}`}
            initial={false}
            animate={{
                height: isActive ? "auto" : "6rem",
            }}
            transition={{
                height: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
            whileHover={
                !isActive
                    ? {
                          backgroundColor: "var(--highlight-color, darkblue)",
                          color: "var(--highlight-font-color, palegreen)",
                      }
                    : {}
            }
        >
            {/* Header section - clickable */}
            <motion.div
                className={`flex justify-between items-center relative flex-shrink-0 z-20 ${
                    !isActive ? "cursor-pointer" : ""
                }`}
                onClick={() => !isActive && onToggle()}
            >
                <div className="flex items-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl mr-5 flex items-center">
                        {(index + 1).toString().padStart(2, "0")}.
                    </div>
                    <div className="flex-grow flex flex-col justify-center pr-8">
                        <div className="md:font-medium text-lg md:text-2xl">
                            {data.title}
                        </div>
                        <div className="text-sm md:text-xl flex flex-wrap items-center">
                            <Link
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-inherit no-underline flex items-center z-30"
                                style={{
                                    transition: "color 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color =
                                        "var(--accent-color-constant, #D7482F)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "";
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {data.company}
                                <TbArrowLeftFromArc className="ml-1 transform transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Toggle button */}
                <motion.button
                    className="relative z-30 flex items-center justify-center cursor-pointer rounded-full flex-shrink-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                    aria-label={
                        isActive ? "Collapse section" : "Expand section"
                    }
                    initial={false}
                    animate={{
                        rotate: isActive ? 45 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    <RxPlus
                        className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0"
                        style={{
                            filter: !isActive
                                ? "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))"
                                : "none",
                        }}
                    />
                </motion.button>
            </motion.div>

            {/* Content section - not clickable */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="w-3/4 px-4 py-6 opacity-0 flex flex-col items-start relative left-0 right-0 z-10 cursor-default"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-wrap justify-start gap-2.5 pointer-events-auto">
                            {data.skills.map((skill) => (
                                <motion.span
                                    key={skill}
                                    className="font-sans text-xs md:text-base align-middle p-[5px_7px] border border-current rounded-full"
                                    whileHover={{
                                        backgroundColor:
                                            "var(--text-color, #F4F1EA)",
                                        color: "var(--background-color, #17181C)",
                                    }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>

                        {data.team && (
                            <div className="py-6 text-xl w-full border-b border-current">
                                {data.team.url ? (
                                    <Link
                                        href={data.team.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2"
                                        style={{
                                            transition: "color 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color =
                                                "#D7482F";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color = "";
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {data.team.name}
                                        <TbArrowLeftFromArc className="transform transition-transform duration-300" />
                                    </Link>
                                ) : (
                                    data.team.name
                                )}
                            </div>
                        )}

                        <div className="space-y-4 mt-4">
                            {data.description.map((desc, i) => (
                                <div key={i} className="text-base">
                                    {parse(desc)}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Date vertical line */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="absolute right-3 md:right-6 top-20 bottom-5 flex flex-col items-center justify-between z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="[writing-mode:vertical-rl] text-orientation-mixed text-sm">
                            {data.duration.start.replace(" ", " ")}
                        </span>

                        <motion.div
                            className="flex-grow w-0.5 bg-current my-2.5 origin-top"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.75, ease: "easeInOut" }}
                        />

                        <span className="[writing-mode:vertical-rl] text-orientation-mixed text-sm">
                            {data.duration.end.replace(" ", " ")}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export const WorkItems = ({
    expandedItems,
    toggleItem,
}: {
    expandedItems: Record<string, boolean>;
    toggleItem: (id: string) => void;
}) => {
    return Object.entries(workData).map(([id, experience], index) => (
        <WorkItem
            key={id}
            data={experience}
            index={index}
            isActive={!!expandedItems[id]}
            onToggle={() => toggleItem(id)}
        />
    ));
};
