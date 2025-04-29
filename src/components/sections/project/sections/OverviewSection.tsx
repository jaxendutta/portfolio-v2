// src/components/sections/project/sections/OverviewSection.tsx
"use client";

import { ProjectLink } from "@/types/project";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { codeFont } from "@/lib/fonts";

interface OverviewSectionProps {
    overview: string[];
    links: ProjectLink[];
}

export default function OverviewSection({
    overview,
    links,
}: OverviewSectionProps) {
    return (
        <section className="flex-none w-screen h-screen flex items-center justify-center snap-start">
            <div className="flex flex-col items-center w-full max-w-4xl px-8">
                {/* Overview Container */}
                {overview.map((paragraph, index) => (
                    <motion.div
                        key={index}
                        className={`mb-8 w-full flex flex-col items-center ${codeFont}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="text-xl leading-relaxed max-w-3xl text-center">
                            {parse(
                                paragraph.replace(
                                    /<div class="cardish">(.*?)<\/div>/g,
                                    (_, contents) =>
                                        `<div class="inline-block px-5 py-4 rounded-3xl bg-white/10 backdrop-blur-md shadow-lg border-white/20 italic mb-6 text-left dark:bg-black/10 dark:border-black/20">${contents}</div>`
                                )
                            )}
                        </div>

                        {/* Project Links - only show in last paragraph */}
                        {links.length > 0 && index === overview.length - 1 && (
                            <div className="flex justify-center flex-wrap gap-6 mt-8 w-full">
                                {links.map((link, linkIndex) => (
                                    <motion.a
                                        key={linkIndex}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="uppercase relative pl-12 pr-4 py-3 flex items-center no-underline text-current text-xl group"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            delay: 0.5 + linkIndex * 0.1,
                                        }}
                                    >
                                        {/* Link Button Background Circle */}
                                        <span
                                            className="absolute top-1/2 left-0 w-8 h-8 bg-[var(--accent-color-constant)] rounded-full 
                      -translate-y-1/2 transition-all duration-300 group-hover:w-[115%] group-hover:h-[120%] 
                      group-hover:rounded-2xl -z-10"
                                        />

                                        <span className="relative z-10 pointer-events-none group-hover:text-[var(--background-color)]">
                                            {link.name.toUpperCase()}
                                        </span>

                                        <span
                                            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300 z-10 pointer-events-none text-[var(--background-color)]"
                                        >
                                            ↗
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
