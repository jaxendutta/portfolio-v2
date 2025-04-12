// src/components/ui/SectionHeader.tsx
"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
    const symbols = "⚕♨✦❍";
    const repeats = 6;

    return (
        <div className="w-full overflow-hidden">
            {/* Forward scrolling header */}
            <div className="bg-second-bg-color font-heading text-text-dark whitespace-nowrap w-screen text-[10em] md:text-[4em] flex opacity-20">
                {Array.from({ length: repeats }).map((_, i) => (
                    <motion.div
                        key={`forward-${i}`}
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                        className="flex-shrink-0"
                    >
                        {title}&nbsp;
                        <span className="text-[1.35em]">{symbols}</span>&nbsp;
                    </motion.div>
                ))}
            </div>

            {/* Backward scrolling header */}
            <div className="bg-second-bg-color font-heading text-text-dark whitespace-nowrap w-screen text-[10em] md:text-[4em] flex mt-[-1.25em] opacity-20">
                {Array.from({ length: repeats }).map((_, i) => (
                    <motion.div
                        key={`backward-${i}`}
                        animate={{ x: "0%" }}
                        initial={{ x: "-100%" }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                        className="flex-shrink-0"
                    >
                        {`${title} ${symbols} `}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
