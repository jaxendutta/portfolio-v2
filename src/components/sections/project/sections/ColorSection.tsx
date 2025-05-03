// src/components/sections/project/sections/ColorSection.tsx
"use client";

import { ColorSet } from "@/types/project";
import { motion } from "framer-motion";
import { ProjectPageSection } from "../ProjectPageSection";

const ColorCard = ({
    colorSet,
    calculateBrightness,
}: {
    colorSet: ColorSet;
    calculateBrightness: (color: string) => number;
}) => {
    return (
        <div className="w-full max-w-[1200px] flex flex-col">
            <div className="flex gap-4 h-[200px] mb-6">
                {colorSet.palette.map((color, colorIndex) => {
                    const brightness = calculateBrightness(color);
                    const veryDark = brightness < 0.1;
                    const veryLight = brightness > 0.9;

                    return (
                        <motion.div
                            key={colorIndex}
                            className={`flex-grow rounded-lg relative overflow-hidden cursor-pointer
                                ${veryDark ? "border border-white/30" : ""}
                                ${veryLight ? "border border-black/30" : ""}
                            `}
                            style={{ backgroundColor: color }}
                            whileHover={{
                                borderRadius: "50%",
                                scale: 1.03,
                            }}
                            onClick={() =>
                                window.open(
                                    `https://www.google.com/search?q=${encodeURIComponent(color)}`,
                                    "_blank"
                                )
                            }
                        >
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                            >
                                <span className="px-3 py-1 rounded-md bg-black/70 text-white text-sm shadow-md">
                                    {color}
                                </span>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="p-6 rounded-lg border border-dashed">
                {colorSet.description}
            </div>
        </div>
    );
};

interface ColorSectionProps {
    id?: string;
    colors: ColorSet[];
}

export default function ColorSection({ id, colors }: ColorSectionProps) {
    // Function to calculate text color based on background
    const calculateBrightness = (color: string) => {
        // Remove any leading #
        color = color.replace("#", "");

        // Parse the color
        const r = parseInt(color.substr(0, 2), 16) / 255;
        const g = parseInt(color.substr(2, 2), 16) / 255;
        const b = parseInt(color.substr(4, 2), 16) / 255;

        // Calculate relative luminance
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    return (
        <ProjectPageSection id={id} title={["COLOURS", "c0Lours", "Col0URS"]}>
            {colors.map((colorSet, setIndex) => (
                <ColorCard
                    key={setIndex}
                    colorSet={colorSet}
                    calculateBrightness={calculateBrightness}
                />
            ))}
        </ProjectPageSection>
    );
}
