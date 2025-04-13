// src/components/sections/HeroSection.tsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import RolesSwitcher from "@/components/ui/RolesSwitcher";
import RotatingButton from "@/components/ui/RotatingButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PiGlobeSimpleThin } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export default function HeroSection() {
    const { theme } = useTheme();
    const [currentTime, setCurrentTime] = useState("");
    const roles = [
        "UX/UI Engineer",
        "HCI Researcher",
        "Web Designer",
        "App Developer",
    ];

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
        <section
            id="hero-container"
            className="w-full min-h-[500px] h-screen relative"
        >
            {/* Moon and noise effect */}
            <div className="absolute top-0 w-screen h-screen">
                <div className="noise" id="noiseId"></div>
                <div className="absolute top-0 w-full h-full flex justify-center items-center">
                    <motion.div
                        className="w-[200px] h-[200px] bg-black dark:bg-black rounded-full absolute top-[-50px]"
                        animate={{ y: [-10, 0, -10] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </div>

            {/* Globe & Time Display */}
            <div className="flex flex-row items-center justify-center fixed bottom-2.5 left-2.5 gap-2 text-[#F4F1EA] opacity-40 mix-blend-difference">
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
                <div className="flex flex-col text-sm">
                    <span>WATERLOO, ON</span>
                    <span>{currentTime}</span>
                </div>
            </div>

            {/* Main intro content */}
            <div className="absolute text-center top-[15vh] w-screen h-screen font-majorMono text-3xl md:text-5xl text-[#F4F1EA] flex flex-col justify-center items-center gap-[5vh]">
                <div className="hero-container">
                    <h1
                        className={twMerge(
                            "text-6xl md:text-[6.5rem] italic pr-[0.1em] clip-text",
                            theme === "dark"
                                ? "bg-[url('https://i.gifer.com/ByRk.gif')] bg-cover bg-top"
                                : "bg-[url('https://media.giphy.com/media/YAxpwobytgjWgmIbP9/giphy.gif')] bg-cover bg-top"
                        )}
                    >
                        {`¿ JAXEN DUTTA ?`}
                    </h1>
                </div>

                <div className="flex items-center">
                    <RolesSwitcher roles={roles} />
                </div>

                <div className="w-2/3 flex justify-end">
                    <RotatingButton
                        texts={["PROJECTS", "WORK", "RÉSUMÉ"]}
                        delimiters={["✦"]}
                        href="#projects"
                        centerIcon={PiGlobeSimpleThin}
                    />
                </div>
            </div>
        </section>
    );
}
