// src/components/sections/HeroSection.tsx
"use client";

import { displayFont } from "@/styles/fonts";
import RotatingButton from "@/components/ui/RotatingButton";
import Moon from "@/components/ui/Moon";
import { GiMaterialsScience } from "react-icons/gi";

export default function Hero() {
    return (
        <section
            id="hero-container"
            className="w-full min-h-[500px] h-screen relative"
        >
            {/* Moon and noise effect */}
            <Moon />

            {/* Main intro content */}
            <div className="absolute text-center top-[15vh] w-screen h-screen text-3xl md:text-5xl flex flex-col justify-center items-center gap-[5vh]">
                <div
                    className={`text-8xl md:text-[6.5rem] italic pr-[0.1em] clip-text ${displayFont}`}
                >
                    <em>{`¿ JAXEN DUTTA ?`}</em>
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
