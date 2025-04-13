"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";

interface SectionHeaderProps {
    title: string;
    symbol?: string;
    className?: string;
    textClassName?: string;
    symbolClassName?: string;
    repeat?: number;
}

export default function SectionHeader({
    title,
    symbol = "⚕♨✦❍",
    className = "",
}: SectionHeaderProps) {
    return (
        <div
            className={twMerge(
                "w-full font-heading text-6xl md:text-8xl lg:text-10xl",
                className
            )}
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
                        direction === "left" ? "-mt-[0.6em]" : "opacity-20"
                    }
                    style={{
                        fontSize: "inherit",
                        fontFamily: "inherit",
                    }}
                >
                    <span className="px-[0.25em]">
                        {`${title} ${symbol}`}
                    </span>
                </Marquee>
            ))}
        </div>
    );
}
