// src/components/ui/SectionHeader.tsx
"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";
import { heading } from "@/styles/fonts";

export interface SectionHeaderProps {
    title: string;
    symbol?: string;
    actionButton?: React.ReactNode;
    className?: string;
    textClassName?: string;
    symbolClassName?: string;
    repeat?: number;
    actionButtonPosition?: string;
}

export default function SectionHeader({
    title,
    symbol = "⚕♨✦❍",
    actionButton,
    actionButtonPosition = "2/3",
    className = "",
}: SectionHeaderProps) {
    return (
        <div className={twMerge("relative flex items-center mt-25 mb-15", className)}>
            <div
                className={`w-full text-6xl md:text-8xl lg:text-10xl ${heading}`}
            >
                {["right", "left"].map((direction, index) => (
                    <Marquee
                        key={index}
                        direction={direction as "left" | "right"}
                        speed={50}
                        loop={0}
                        autoFill={true}
                        gradient={false}
                        className={
                            direction === "left" ? "-mt-[0.75em]" : "opacity-20"
                        }
                    >
                        <span className="px-[0.25em]">{`${title} ${symbol}`}</span>
                    </Marquee>
                ))}
            </div>
            {actionButton && (
                <div
                    className={`absolute top-1/2 left-${actionButtonPosition} -translate-y-1/2 z-10 p-2 rounded-full bg-theme`}
                >
                    {actionButton}
                </div>
            )}
        </div>
    );
}
