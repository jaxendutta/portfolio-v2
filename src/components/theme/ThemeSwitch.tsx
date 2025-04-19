// src/components/ui/ThemeSwitch.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useTheme } from "@/components/theme/ThemeProvider";
import { GiUbisoftSun } from "react-icons/gi";
import { SiIcomoon } from "react-icons/si";

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={() => toggleTheme()}
            aria-label={`Switch to ${theme} mode`}
            className={twMerge(
                "flex items-center justify-center fixed bottom-3 right-3 text-4xl cursor-pointer z-10 mixed-blend-difference",
                theme === "dark" ? "opacity-75" : ""
            )}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                        <GiUbisoftSun />
                    ) : (
                        <SiIcomoon className="p-0.5" />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.button>
    );
}
