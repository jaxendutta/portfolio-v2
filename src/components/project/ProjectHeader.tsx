// src/components/project/ProjectHeader.tsx
"use client";

import RotatingButton from "@/components/ui/RotatingButton";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa";

interface ProjectHeaderProps {
    projectName: string;
}

export default function ProjectHeader({ projectName }: ProjectHeaderProps) {
    const [isVisible, setIsVisible] = useState(true);
    const { scrollX } = useScroll();

    const position = useTransform(scrollX, [0, 100], ["-120px", "0px"]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition =
                window.scrollX || document.documentElement.scrollLeft;
            const scrollTopPosition =
                window.scrollY || document.documentElement.scrollTop;

            setIsVisible(!(scrollPosition > 0 || scrollTopPosition > 0));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 z-20 p-4 flex items-center italic transition-all duration-300 ease-in-out">
            <motion.div
                style={{ right: position }}
                className="transition-all duration-300 ease-in-out flex items-center"
            >
                <RotatingButton
                    text="✦ BACK ✦ TO ✦ PROJECTS"
                    href="/#projects"
                    icon={<FaArrowLeft />}
                    className="mr-5"
                />

                <div className="w-5"></div>

                <RotatingButton
                    text="✦ SCROLL TO THE ✦ RIGHT"
                    href=""
                    icon={<FaArrowRight />}
                    onClick={() => {
                        const main = document.querySelector("main");
                        if (main) {
                            main.scrollBy({
                                left: window.innerWidth,
                                behavior: "smooth",
                            });
                        }
                    }}
                />

                <div className="flex-1"></div>

                <h1 className="font-majorMono font-normal text-3xl transition-all duration-300 mr-8 text-right uppercase">
                    {projectName}
                </h1>

                <RotatingButton
                    text="✦ BACK TO TOP ✦ BACK TO TOP"
                    href="#project-name-top"
                    icon={<FaArrowUp />}
                    className="ml-6"
                    onClick={() => {
                        if (window.innerWidth > 768) {
                            const main = document.querySelector("main");
                            if (main) {
                                main.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                            }
                        }
                    }}
                />
            </motion.div>
        </header>
    );
}
