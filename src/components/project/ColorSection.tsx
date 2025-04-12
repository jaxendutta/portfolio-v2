// src/components/project/ColorSection.tsx
"use client";

import { ColorSet } from "@/types/project";
import { motion } from "framer-motion";

interface ColorSectionProps {
    colors: ColorSet[];
}

export default function ColorSection({ colors }: ColorSectionProps) {
    // Function to determine if a color is very dark or very light
    const getBrightness = (color: string): number => {
        // Remove any leading #
        color = color.replace("#", "");

        // Parse the color
        const r = parseInt(color.substr(0, 2), 16) / 255;
        const g = parseInt(color.substr(2, 2), 16) / 255;
        const b = parseInt(color.substr(4, 2), 16) / 255;

        // Calculate relative luminance
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return luminance;
    };

    return (
        <div className="section flex flex-col md:flex-row">
            <div className="vertical-header writing-vertical-rl text-orientation-mixed transform rotate-180 font-heading text-5xl italic pt-20 pb-12 pr-20 md:pt-10 md:pr-0 md:pl-20 w-full h-auto md:w-min">
                COLOURS
                <br />
                c0Lours
                <br />
                Col0URS
            </div>

            <div className="flex flex-col md:flex-row gap-20 items-center overflow-visible mr-[100px] w-full">
                {colors.map((set, setIndex) => (
                    <div
                        key={setIndex}
                        className="w-full md:w-[75vw] flex flex-col"
                    >
                        <div className="flex flex-row gap-4 h-[200px] md:h-[100px] mb-4">
                            {set.palette.map((color, colorIndex) => {
                                const brightness = getBrightness(color);
                                const isDark = brightness < 0.1;
                                const isLight = brightness > 0.9;

                                return (
                                    <motion.div
                                        key={`${setIndex}-${colorIndex}`}
                                        className={`flex-grow rounded-[15px] relative overflow-hidden transition-all duration-300 ease-in-out ${
                                            isDark
                                                ? "border border-dashed border-white/30 dark:border-white/30"
                                                : ""
                                        } ${
                                            isLight
                                                ? "border-0 dark:border dark:border-dashed dark:border-black/30"
                                                : ""
                                        }`}
                                        style={{ backgroundColor: color }}
                                        whileHover={{ borderRadius: "50%" }}
                                    >
                                        <a
                                            href={`https://www.google.com/search?q=${encodeURIComponent(
                                                color
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center no-underline"
                                        >
                                            <div className="px-2.5 py-1.5 rounded bg-black/50 text-white font-code text-base opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center">
                                                {color}
                                                <span className="ml-1 transition-transform duration-300 inline-block hover:translate-x-0.5 hover:-translate-y-0.5">
                                                    &nearr;
                                                </span>
                                            </div>
                                        </a>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="bg-white/10 rounded-[10px] p-4 flex items-center justify-center text-center font-code text-lg min-h-[100px]">
                            {set.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
