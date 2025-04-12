// src/components/navigation/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-row-reverse fixed w-screen transform translate-x-0 translate-y-0 z-50 mix-blend-difference">
            <menu className="flex list-none p-0 m-5 gap-10 font-majorMono text-xl w-full">
                <li>
                    <Link
                        href="#main"
                        className="text-[#F4F1EA] no-underline mix-blend-difference group"
                    >
                        HOME
                        <motion.span
                            className="block w-0 h-0.5 bg-[#D7482F] transition-all duration-200"
                            whileHover={{ width: "100%" }}
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        href="#projects"
                        className="text-[#F4F1EA] no-underline mix-blend-difference group"
                    >
                        PROJECTS
                        <motion.span
                            className="block w-0 h-0.5 bg-[#D7482F] transition-all duration-200"
                            whileHover={{ width: "100%" }}
                        />
                    </Link>
                </li>
                <li className="flex-1"></li>
                <li>
                    <Link
                        href="#work"
                        className="text-[#F4F1EA] no-underline mix-blend-difference group"
                    >
                        WORK
                        <motion.span
                            className="block w-0 h-0.5 bg-[#D7482F] transition-all duration-200"
                            whileHover={{ width: "100%" }}
                        />
                    </Link>
                </li>
                <li>
                    <Link
                        href="#contact"
                        className="text-[#F4F1EA] no-underline mix-blend-difference group"
                    >
                        CONTACT
                        <motion.span
                            className="block w-0 h-0.5 bg-[#D7482F] transition-all duration-200"
                            whileHover={{ width: "100%" }}
                        />
                    </Link>
                </li>
            </menu>
        </div>
    );
}
