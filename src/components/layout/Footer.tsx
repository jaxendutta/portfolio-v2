"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

const Footer = ({ className = "" }) => {
    const text = "Jaxen Anirban Dutta //";

    return (
        <div
            className={twMerge(
                "flex justify-center items-center overflow-hidden",
                "h-4 m-4 mt-20 opacity-60 font-sans uppercase",
                className
            )}
        >
            {text}
        </div>
    );
};

export default Footer;
