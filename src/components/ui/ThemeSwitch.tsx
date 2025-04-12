// src/components/ui/ThemeSwitch.tsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        toggleTheme();
        setTimeout(() => setIsAnimating(false), 1000);
    };

    return (
        <motion.button
            onClick={handleClick}
            className="fixed bottom-2.5 right-2.5 flex text-2xl lg:text-3xl cursor-pointer text-[#F4F1EA] dark:text-[#F4F1EA] bg-transparent border-none transition-all duration-250 ease-in-out z-10 blend-difference p-0"
            whileHover={{ scale: 1.1 }}
            animate={isAnimating ? { rotate: 360 } : {}}
            transition={{ duration: 1 }}
            aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
            {theme === "dark" ? (
                <FaSun className="block" />
            ) : (
                <FaMoon className="block" />
            )}
        </motion.button>
    );
}
