// src/components/ui/SectionHeader.tsx
"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { heading } from "@/styles/fonts";
import { motion } from "framer-motion";
import { FaPersonWalking } from "react-icons/fa6";

export interface SectionHeaderProps {
    title: string;
    symbol?: string;
    actionButton?: React.ReactNode;
    repeat?: number;
    actionButtonPosition?: number; // Between 0 and 1
}

export default function SectionHeader({
    title,
    symbol = "⚕♨✦❍",
    actionButton,
    actionButtonPosition = 2 / 3,
}: SectionHeaderProps) {
    if (
        actionButtonPosition !== undefined &&
        (actionButtonPosition < 0 || actionButtonPosition > 1)
    ) {
        throw new Error(
            "actionButtonPosition must be between 0 and 1! Pass the position as a fraction of the width, e.g. 2/3 for 66.67%."
        );
    }

    return (
        <div className="relative flex items-center w-full h-full mt-25 mb-10">
            <div className={`text-6xl md:text-8xl lg:text-10xl ${heading}`}>
                <Marquee
                    key={0}
                    direction={"right"}
                    speed={50}
                    loop={0}
                    autoFill={true}
                    gradient={false}
                    className={"opacity-20 text-4xl"}
                >
                    <FaPersonWalking />
                </Marquee>
                {["left", "right"].map((direction, index) => (
                    <Marquee
                        key={index}
                        direction={direction as "left" | "right"}
                        speed={50}
                        loop={0}
                        autoFill={true}
                        gradient={false}
                        className={
                            direction === "right"
                                ? "-mt-[0.75em]"
                                : "opacity-20"
                        }
                    >
                        <span className="px-[0.25em]">{`${title} ${symbol}`}</span>
                    </Marquee>
                ))}
            </div>
            {actionButton && (
                <motion.div
                    className="absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full backdrop-blur-lg bg-opacity-60"
                    style={{ left: `${actionButtonPosition * 100}%` }}
                >
                    {actionButton}
                </motion.div>
            )}
        </div>
    );
}
