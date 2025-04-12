// src/components/ui/RolesSwitcher.tsx
"use client";

import { motion } from "framer-motion";

interface RolesSwitcherProps {
    roles: string[];
}

export default function RolesSwitcher({ roles }: RolesSwitcherProps) {
    const variants = {
        hidden: (i: number) => ({
            y: `${i * 100}%`,
            opacity: 0,
        }),
        visible: (i: number) => ({
            y: `${i * 100}%`,
            opacity: 0.75,
            transition: {
                y: { duration: 0.5 },
            },
        }),
    };

    return (
        <div className="flex items-center">
            <span className="text-2xl">✦</span>

            <div className="overflow-hidden h-10 border border-[#F4F1EA] dark:border-[#F4F1EA] rounded-[30px] mx-2">
                <div className="relative h-full w-full">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role}
                            className="absolute w-full h-10 leading-10 text-center font-orbitron text-base md:text-lg text-[#F4F1EA] dark:text-[#F4F1EA] italic font-medium opacity-75"
                            custom={index}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                opacity: { duration: 0.5 },
                                y: {
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    repeatDelay: 2,
                                    times: [0, 0.1, 0.9, 1],
                                    ease: "easeInOut",
                                    delay: index * 3,
                                },
                            }}
                        >
                            {role}
                        </motion.div>
                    ))}
                </div>
            </div>

            <span className="text-2xl">✦</span>
        </div>
    );
}
