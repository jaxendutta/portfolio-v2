// src/components/sections/HeroSection.tsx
"use client";

import { useTheme } from "@/components/ThemeProvider";
import RotatingButton from "@/components/ui/RotatingButton";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { displayFont } from "@/styles/fonts";
import { GiMaterialsScience } from "react-icons/gi";

export default function HeroSection() {
    const { theme } = useTheme();

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

            {/* Main intro content */}
            <div className="absolute text-center top-[15vh] w-screen h-screen text-3xl md:text-5xl text-[#F4F1EA] flex flex-col justify-center items-center gap-[5vh]">
                <div className="hero-container">
                    <h1
                        className={twMerge(
                            displayFont,
                            "text-8xl md:text-[6.5rem] italic pr-[0.1em] clip-text",
                            theme === "DARK"
                                ? "bg-[url('https://i.gifer.com/ByRk.gif')] bg-cover bg-top"
                                : "bg-[url('https://media.giphy.com/media/YAxpwobytgjWgmIbP9/giphy.gif')] bg-cover bg-top"
                        )}
                    >
                        <em>{`¿ JAXEN DUTTA ?`}</em>
                    </h1>
                </div>

                <div className="w-2/3 flex justify-end">
                    <RotatingButton
                        texts={["PROJECTS", "WORK", "RÉSUMÉ"]}
                        delimiters={["✦"]}
                        href="#projects"
                        centerIcon={GiMaterialsScience}
                    />
                </div>
            </div>
        </section>
    );
}
