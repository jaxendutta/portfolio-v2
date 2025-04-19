// src/components/ui/CaseGlitch.tsx
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { THEME_COLORS } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

interface CaseGlitchProps {
    text: string;
    className?: string;
}

export function CaseGlitch({ text, className }: CaseGlitchProps) {
    const { theme } = useTheme();
    const [glitchState, setGlitchState] = useState(0);

    // Properly typed variants
    const glitchVariants = [
        {
            fontWeight: 400,
            fontStyle: "normal" as const,
            textDecoration: "none" as const,
            textTransform: "none" as const,
        },
        {
            fontWeight: 700,
            fontStyle: "italic" as const,
            textDecoration: "none" as const,
            textTransform: "uppercase" as const,
        },
        {
            fontWeight: 100,
            fontStyle: "normal" as const,
            textDecoration: "underline" as const,
            textTransform: "lowercase" as const,
        },
        {
            fontWeight: 500,
            fontStyle: "italic" as const,
            textDecoration: "line-through" as const,
            textTransform: "capitalize" as const,
        },
        {
            fontWeight: 300,
            fontStyle: "normal" as const,
            textDecoration: "none" as const,
            textTransform: "uppercase" as const,
        },
        {
            fontWeight: 600,
            fontStyle: "italic" as const,
            textDecoration: "none" as const,
            textTransform: "lowercase" as const,
        },
        {
            fontWeight: 200,
            fontStyle: "normal" as const,
            textDecoration: "underline" as const,
            textTransform: "none" as const,
        },
        {
            fontWeight: 800,
            fontStyle: "italic" as const,
            textDecoration: "none" as const,
            textTransform: "capitalize" as const,
        },
        {
            fontWeight: 100,
            fontStyle: "normal" as const,
            textDecoration: "line-through" as const,
            textTransform: "uppercase" as const,
        },
        {
            fontWeight: 500,
            fontStyle: "italic" as const,
            textDecoration: "none" as const,
            textTransform: "lowercase" as const,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchState((prev) => (prev + 1) % glitchVariants.length);
        }, 120); // Change every 120ms for a glitchy feel

        return () => clearInterval(interval);
    }, [glitchVariants.length]);

    return (
        <motion.div
            className={twMerge(
                "flex justify-center items-center gap-4 my-20",
                className
            )}
            style={{
                color: THEME_COLORS.accent[theme],
            }}
            animate={glitchVariants[glitchState]}
            transition={{
                duration: 0.05,
                ease: "easeInOut",
            }}
        >
            {text}
        </motion.div>
    );
}

export default CaseGlitch;
