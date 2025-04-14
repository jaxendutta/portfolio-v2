// src/components/ui/Section.tsx
"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import SectionHeader, {
    SectionHeaderProps,
} from "@/components/ui/SectionHeader";

interface SectionProps {
    sectionHeaderProps: SectionHeaderProps;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({
    sectionHeaderProps,
    children,
    className = "",
}: SectionProps) {
    return (
        <section
            id={sectionHeaderProps.title.toLowerCase()}
            className={twMerge(
                "relative w-full font-heading text-[4rem] md:text-[6rem] lg:text-[10em]",
                className
            )}
        >
            <SectionHeader {...sectionHeaderProps} />
            {children}
        </section>
    );
}
