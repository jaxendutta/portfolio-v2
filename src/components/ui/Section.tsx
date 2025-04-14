// src/components/ui/Section.tsx
"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import SectionHeader, {
    SectionHeaderProps,
} from "@/components/ui/SectionHeader";

interface SectionProps {
    headerProps: SectionHeaderProps;
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({
    headerProps: headerProps,
    children,
    className = "",
}: SectionProps) {
    return (
        <section
            id={headerProps.title.toLowerCase()}
            className={twMerge(
                "relative w-full text-[4rem] md:text-[6rem] lg:text-[10em]",
                className
            )}
        >
            <SectionHeader {...headerProps} />
            <div className="p-[5vw]">{children}</div>
        </section>
    );
}
