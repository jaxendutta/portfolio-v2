// src/components/ui/ThemeSwitch.tsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { GiUbisoftSun } from "react-icons/gi";
import { SiIcomoon } from "react-icons/si";

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            animate={{ rotate: 360 }}
            transition={{
                duration: 75,
                repeat: Infinity,
                ease: "linear",
            }}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            className="flex items-center justify-center fixed bottom-3 right-3 text-4xl opacity-75 cursor-pointer z-10 mixed-blend-difference"
        >
            {theme === "dark" ? <GiUbisoftSun /> : <SiIcomoon className="text-4xl p-0.5" />}
        </motion.button>
    );
}
