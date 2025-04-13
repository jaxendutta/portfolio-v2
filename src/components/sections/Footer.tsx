"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { twMerge } from "tailwind-merge";

export const Footer = ({ className = "" }) => {
    const text = "Jaxen Anirban Dutta //";

    return (
        <div
            className={twMerge(
                "flex justify-center items-center overflow-hidden",
                "h-4 m-4 f opacity-60 font-sans uppercase",
                className
            )}
        >
            <Marquee
                direction="up"
                speed={30}
                loop={0}
                autoFill={true}
                pauseOnHover={true}
                gradient={false}
            >
                <div className="flex flex-col">
                    {Array(8)
                        .fill(text)
                        .map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                </div>
            </Marquee>
        </div>
    );
};
