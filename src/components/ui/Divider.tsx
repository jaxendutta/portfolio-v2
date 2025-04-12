// src/components/ui/Divider.tsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface DividerProps {
    index: number;
}

export default function Divider({ index }: DividerProps) {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollY } = useScroll();
    const { theme } = useTheme();

    // Transform scroll position to skew and scale values
    const skewX = useTransform(
        scrollY,
        [0, 5000],
        [0, index % 2 === 0 ? 10 : -10]
    );

    const scaleRange = 0.2;
    const scale = useTransform(
        scrollY,
        [0, 5000],
        [1, (scaleRange * (Math.sin(index * 10) + 1)) / 2 + (1 - scaleRange)]
    );

    const translateX = useTransform(
        scrollY,
        [0, 5000],
        [0, index % 2 === 0 ? 80 : -80]
    );

    const rotate = useTransform(
        scrollY,
        [0, 5000],
        [0, index % 4 === 0 ? 2 : index % 4 === 1 ? -2 : 0]
    );

    return (
        <div className="w-full overflow-hidden">
            <motion.p
                ref={ref}
                style={{
                    skewX,
                    scale,
                    translateX,
                    rotate,
                }}
                className="whitespace-nowrap text-2xl font-heading text-center mx-auto my-0 border-t border-b border-text-dark dark:border-text-dark py-1 text-gray-400 dark:text-gray-400"
            >
                {
                    "JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN == JAXEN == ANIRBAN =="
                }
            </motion.p>
        </div>
    );
}
