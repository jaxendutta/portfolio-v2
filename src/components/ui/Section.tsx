// src/components/ui/Section.tsx
"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import SectionHeader from "@/components/ui/SectionHeader";

interface SectionProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({
    title = "Section",
    children,
    className = "",
}: SectionProps) {
    return (
        <section
            id={title.toLowerCase()}
            className={twMerge(
                "relative w-full overflow-hidden font-heading text-[4rem] md:text-[6rem] lg:text-[10em]",
                className
            )}
        >
            <SectionHeader title={title} />
            {children}
        </section>
    );
}
