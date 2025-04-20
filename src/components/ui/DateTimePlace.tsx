// src/components/ui/DateTimePlace.tsx
import { motion } from "framer-motion";
import { PiGlobeSimpleThin } from "react-icons/pi";
import { useState, useEffect } from "react";

export function DateTimePlace() {
    const [currentTime, setCurrentTime] = useState("");

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const estTime = new Date().toLocaleString("en-CA", {
                timeZone: "America/Toronto",
                hour12: false,
            });
            setCurrentTime(estTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`fixed bottom-2.5 left-2.5 flex flex-row items-center justify-center gap-2`}
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
