// src/components/sections/project/sections/NameSection.tsx
"use client";

import { motion } from "framer-motion";
import { displayFont } from "@/lib/fonts";

interface NameSectionProps {
    id?: string;
    name: string;
}

export default function NameSection({ id, name }: NameSectionProps) {
    return (
        <div id={id} className="section flex items-center justify-center">
            <motion.h1
                className={`text-[100vh] font-bold leading-none ${displayFont}`}
                style={{
                    fontStyle: "italic",
                    backgroundImage: "var(--font-background)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    paddingRight: "0.1em",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {name.toUpperCase()}
            </motion.h1>
        </div>
    );
}
