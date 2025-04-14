// src/components/ui/SectionHeader.tsx
"use client";

import React from "react";
import { heading } from "@/styles/fonts";
import { motion } from "framer-motion";
import { FaPersonWalking } from "react-icons/fa6";
import Marquee from "@/components/ui/Marquee";

export interface SectionHeaderProps {
    title: string;
    delimiter?: string;
    actionButton?: React.ReactNode;
    actionButtonPosition?: number; // Between 0 and 1
}

export default function SectionHeader({
    title,
    delimiter = "⚕♨✦❍",
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

    // Format the content with proper spacing
    const iconContent = (
        <div className="flex items-center">
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <FaPersonWalking key={index} className="mx-10 text-4xl" />
                ))}
        </div>
    );

    const textContent = (
        <span className="flex px-4 gap-8 whitespace-nowrap">
            <span>{title}</span>
            <span>{delimiter}</span>
        </span>
    );

    return (
        <div className="relative mt-20 mb-10">
            <div className={`text-6xl md:text-8xl lg:text-10xl ${heading}`}>
                {/* Top marquee with walking icons */}
                <Marquee direction="right" className="opacity-20">
                    {iconContent}
                </Marquee>

                {/* Main title marquee */}
                <Marquee direction="left" className="opacity-100">
                    {textContent}
                </Marquee>

                {/* Bottom marquee (opposite direction) */}
                <Marquee direction="right" className="-mt-10 opacity-20">
                    {textContent}
                </Marquee>
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
