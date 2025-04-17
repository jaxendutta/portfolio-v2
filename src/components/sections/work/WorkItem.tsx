"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WorkExperience } from "@/types/work";
import parse from "html-react-parser";
import { RxPlus } from "react-icons/rx";
import { workData } from "@/data/workData";
import { codeFont } from "@/styles/fonts";
import { COLORS } from "@/lib/theme";
import { useTheme } from "@/components/ThemeProvider";
import StyledLink from "@/components/ui/StyledLink";

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
    const { theme } = useTheme();
    return (
        <div className={`w-full border-b border-current ${codeFont}`}>
            {/* Header section - clickable */}
            <div
                className={`flex justify-between items-center h-24 px-2 md:px-4 py-2 ${
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
                        <StyledLink
                            href={data.url}
                            className={`flex flex-wrap gap-1 items-center text-inherit text-sm md:text-xl no-underline z-30`}
                            onClick={(e) => e.stopPropagation()}
                            text={data.company}
                        />
                    </div>
                </div>

                {/* Toggle button */}
                <motion.button
                    className="relative flex items-center justify-center cursor-pointer rounded-full flex-shrink-0"
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
                        ease: "easeInOut",
                    }}
                >
                    <RxPlus className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                </motion.button>
            </div>

            {/* Content section - with proper dropdown animation */}
            <AnimatePresence initial={false}>
                {isActive && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-row relative px-2 md:px-4 pb-8">
                            {/* Main content */}
                            <div className="w-3/4 pr-8">
                                {/* Skills tags */}
                                <div className="flex flex-wrap justify-start gap-2.5 pointer-events-auto mb-6">
                                    {data.skills.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            className="font-sans text-xs md:text-base align-middle p-[5px_7px] border border-current rounded-full"
                                            whileHover={{
                                                backgroundColor:
                                                    COLORS.TEXT[theme],
                                                color: COLORS.BACKGROUND[theme],
                                            }}
                                            transition={{ duration: 0.1 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Team info if available */}
                                {data.team && (
                                    <div className="pt-4 pb-2 text-xl w-full border-b border-current mb-4">
                                        {data.team.url ? (
                                            <StyledLink
                                                href={data.team.url}
                                                text={data.team.name}
                                            />
                                        ) : (
                                            data.team.name
                                        )}
                                    </div>
                                )}

                                {/* Description paragraphs */}
                                <div className="space-y-4">
                                    {data.description.map((desc, i) => (
                                        <div key={i} className="text-base">
                                            {parse(desc)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Date timeline */}
                            <div className="absolute right-4 md:right-6 lg:right-8 top-0 bottom-0 pb-8 flex flex-col items-center justify-between">
                                <span className="[writing-mode:vertical-rl] text-orientation-mixed text-sm">
                                    {new Date(data.duration.start)
                                        .toLocaleString("en", {
                                            year: "numeric",
                                            month: "short",
                                        })
                                        .toUpperCase()}
                                </span>

                                <motion.div
                                    className="flex-grow w-0.5 bg-current my-2.5 origin-top"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    exit={{ scaleY: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                        delay: 0.05,
                                    }}
                                />

                                <span className="[writing-mode:vertical-rl] text-orientation-mixed text-sm">
                                    {new Date(data.duration.end)
                                        .toLocaleString("en", {
                                            year: "numeric",
                                            month: "short",
                                        })
                                        .toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Hover effect handling for work items
export const WorkItemWithHover = (props: {
    data: WorkExperience;
    index: number;
    isActive: boolean;
    onToggle: () => void;
}) => {
    const { theme } = useTheme();

    return (
        <motion.div
            whileHover={
                !props.isActive
                    ? {
                          backgroundColor: COLORS.HIGHLIGHT_BG[theme],
                          color: COLORS.HIGHLIGHT_TEXT[theme],
                          opacity: 0.8,
                      }
                    : {}
            }
        >
            <WorkItem {...props} />
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
        <WorkItemWithHover
            key={id}
            data={experience}
            index={index}
            isActive={!!expandedItems[id]}
            onToggle={() => toggleItem(id)}
        />
    ));
};
