"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";

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
    const x = actionButtonPosition;

    return (
        <div className={twMerge("relative flex items-center", className)}>
            <div className="w-full font-heading text-6xl md:text-8xl lg:text-10xl">
                {["right", "left"].map((direction, index) => (
                    <Marquee
                        key={index}
                        direction={direction as "left" | "right"}
                        speed={50}
                        loop={0}
                        autoFill={true}
                        gradient={false}
                        className={
                            direction === "left" ? "-mt-[0.6em]" : "opacity-20"
                        }
                        style={{
                            fontSize: "inherit",
                            fontFamily: "inherit",
                        }}
                    >
                        <span className="px-[0.25em]">{`${title} ${symbol}`}</span>
                    </Marquee>
                ))}
            </div>
            {actionButton && (
                <div
                    className={`absolute left-${x} top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[--background-color]`}
                >
                    {actionButton}
                </div>
            )}
        </div>
    );
}
