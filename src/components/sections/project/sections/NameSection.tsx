// src/components/sections/project/sections/NameSection.tsx
"use client";

import { motion } from "framer-motion";
import { displayFont } from "@/lib/fonts";
import { useState, useEffect } from "react";

interface NameSectionProps {
    name: string;
}

export default function NameSection({ name }: NameSectionProps) {
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
        };

        checkOrientation();
        window.addEventListener("resize", checkOrientation);

        return () => {
            window.removeEventListener("resize", checkOrientation);
        };
    }, []);

    return (
        <motion.div
            className={`p-6 md:p-8 lg:p-10 ${displayFont} snap-start flex items-center justify-center`}
            id="project-name"
            style={{
                fontStyle: "italic",
                backgroundImage: "var(--font-background)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontSize: isPortrait
                    ? "clamp(5rem, 60vh, 20rem)"
                    : "clamp(15rem, 100vh, 55rem)",
                writingMode: isPortrait ? "vertical-lr" : "horizontal-tb",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            {name.toUpperCase()}
        </motion.div>
    );
}
