// src/components/project/TypographySection.tsx
"use client";
import Link from "next/link";
import { FontInfo } from "@/types/project";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface TypographySectionProps {
    typography: FontInfo[];
}

export default function TypographySection({
    typography,
}: TypographySectionProps) {
    // Load all fonts when component mounts
    useEffect(() => {
        const style = document.createElement("style");
        typography.forEach((font) => {
            style.textContent += `@import url('${font.url}');\n`;
        });
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, [typography]);

    return (
        <div className="section flex flex-col md:flex-row">
            <div className="vertical-header writing-vertical-rl text-orientation-mixed transform rotate-180 font-heading text-5xl italic pt-20 pb-12 pr-20 md:pt-10 md:pr-0 md:pl-20 w-full h-auto md:w-min">
                TYPOGRAPHY
                <br />
                TypoGrApHy
                <br />
                tYPOgraPhy
            </div>

            <div className="typography-content flex flex-nowrap flex-col md:flex-row items-start gap-10 pr-8 w-full">
                {typography.map((font, index) => (
                    <div
                        key={index}
                        className="flex-none w-full md:w-[85vw] max-w-[1200px] h-full flex flex-col justify-start p-4 box-border overflow-y-auto"
                    >
                        <Link
                            href={`https://fonts.google.com/specimen/${font.name.replace(
                                " ",
                                "+"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={twMerge(
                                "mb-4 inline align-middle no-underline text-text-dark transition-colors duration-300 text-5xl hover:text-accent-dark group"
                            )}
                        >
                            {font.name}
                            <motion.span
                                className="inline-block w-7 h-7 ml-2"
                                whileHover={{ x: 2, y: -2 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaExternalLinkAlt className="text-xl" />
                            </motion.span>
                        </Link>
                        <div className="h-0.5 bg-gradient-to-r from-accent-dark to-transparent relative">
                            <span></span>
                        </div>

                        <p className="text-lg w-[95%] my-8 font-code">
                            {font.description}
                        </p>

                        <div className="flex flex-row gap-8">
                            {typography.map((font, idx) => (
                                <div
                                    key={idx}
                                    className={twMerge(
                                        "flex-none w-[42.5%] flex flex-col justify-around gap-4 p-4",
                                        "border border-dashed border-text-dark rounded-[20px]",
                                        "text-lg m-0",
                                        font.fontFamily.includes("Mono")
                                            ? "hidden"
                                            : ""
                                    )}
                                >
                                    {[
                                        "font-thin",
                                        "font-normal",
                                        "font-bold",
                                    ].map((weight, i) => (
                                        <span
                                            key={`regular-${weight}`}
                                            className={twMerge(
                                                `opacity-${
                                                    0.3 + 0.7 * (i / 2)
                                                }`,
                                                weight
                                            )}
                                        >
                                            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll
                                            Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx
                                            Yy Zz
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
