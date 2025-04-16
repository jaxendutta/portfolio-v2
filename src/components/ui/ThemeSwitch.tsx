// src/components/ui/ThemeSwitch.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useTheme } from "@/components/ThemeProvider";
import { GiUbisoftSun } from "react-icons/gi";
import { SiIcomoon } from "react-icons/si";

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme} mode`}
            className={twMerge(
                "flex items-center justify-center fixed bottom-3 right-3 text-4xl cursor-pointer z-10 mixed-blend-difference",
                theme === "DARK" ? "opacity-75" : ""
            )}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                >
                    {theme === "DARK" ? (
                        <GiUbisoftSun />
                    ) : (
                        <SiIcomoon className="p-0.5" />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}
