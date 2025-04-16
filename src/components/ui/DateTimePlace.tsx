import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { PiGlobeSimpleThin } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function DateTimePlace() {
    const { theme } = useTheme();
    const [currentTime, setCurrentTime] = useState("");

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const estTime = new Date().toLocaleString("nl-NL", {
                timeZone: "America/Toronto",
            });
            setCurrentTime(estTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={twMerge(
                `flex flex-row items-center justify-center gap-2`,
                `fixed bottom-2.5 left-2.5 theme-text`,
                theme === "LIGHT" ? "font-semibold opacity-70" : "opacity-40"
            )}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 100,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <PiGlobeSimpleThin className="text-4xl" />
            </motion.div>
            <div className="flex flex-col text-sm text-left">
                <span>WATERLOO, ON</span>
                <span>{currentTime}</span>
            </div>
        </div>
    );
}

export default DateTimePlace;
