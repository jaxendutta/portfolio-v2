"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import Noise from "@/components/ui/Noise";
import { THEME_COLORS } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

interface MoonContainerProps {
    className?: string;
}

export default function MoonContainer({ className }: MoonContainerProps) {
    const { theme } = useTheme();

    return (
        <div className={twMerge("absolute top-0 w-full h-screen", className)}>
            {/* Noise overlay */}
            <Noise />

            {/* Center with circle element */}
            <motion.div
                className={`w-[200px] h-[200px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/5 rounded-full`}
                style={{
                    background: THEME_COLORS.background[theme],
                }}
                animate={{ y: [-10, 0, -10] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <div className="absolute top-0 w-full h-full flex justify-center items-center"></div>
        </div>
    );
}
