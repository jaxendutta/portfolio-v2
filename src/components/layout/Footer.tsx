"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useTheme } from "@/components/ThemeProvider";

const Footer = ({ className = "" }) => {
    const text = "Jaxen Anirban Dutta //";
    const { theme } = useTheme();
    return (
        <div
            className={twMerge(
                "flex justify-center items-center overflow-hidden",
                "h-4 m-4 mt-20 font-sans uppercase",
                theme === "DARK" ? "opacity-60" : "",
                className
            )}
        >
            {text}
        </div>
    );
};

export default Footer;
