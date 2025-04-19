"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

interface NoiseProps {
    className?: string;
}

export default function Noise({ className = "" }: NoiseProps) {
    const { theme } = useTheme();

    const isClient = typeof window !== "undefined";
    const isFirefox =
        isClient && navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

    // Get filter value based on theme and browser
    const getFilterValue = () => {
        if (theme === "dark") {
            return isFirefox
                ? "contrast(125%) brightness(400%) invert(100%)"
                : "contrast(145%) brightness(650%) invert(100%)";
        } else {
            return isFirefox
                ? "contrast(100%) brightness(300%) invert(0%)"
                : "contrast(125%) brightness(400%) invert(0%)";
        }
    };

    return (
        <motion.div
            className={twMerge("w-full h-screen", className)}
            style={{
                marginTop: "-15%",
                backgroundImage: `
          radial-gradient(circle at 50% 10%, ${theme === "dark" ? "rgba(0, 0, 0, 1)" : "rgb(0, 20, 90)"}, rgba(0, 0, 0, 0)),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 700 700' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
        `,
                filter: getFilterValue(),
                mixBlendMode: theme === "dark" ? "difference" : "multiply",
                backgroundSize: "cover",
            }}
        />
    );
}
