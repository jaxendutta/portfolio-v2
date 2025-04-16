"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { BsArrowUpRight, BsCopy } from "react-icons/bs";
import { IoCheckboxOutline } from "react-icons/io5";
import { codeFont } from "@/styles/fonts";
import { COLORS } from "@/lib/theme";
import { useTheme } from "@/components/ThemeProvider";
import { Social } from "@/data/contactData";

export const SocialItem = ({
    item,
    index,
}: {
    item: Social;
    index: number;
}) => {
    const { theme } = useTheme();
    const [copied, setCopied] = useState(false);
    return (
        <motion.div
            className="w-full"
            whileHover={{
                background: COLORS.HIGHLIGHT_BG[theme],
                color: COLORS.HIGHLIGHT_TEXT[theme],
            }}
        >
            <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full p-4 border-b ${codeFont} flex flex-row justify-between items-center group`}
            >
                <div className="flex items-center gap-4">
                    <span>{`${(index + 1).toString().padStart(2, "0")}.`}</span>
                    <span>{item.platform}</span>
                </div>
                <div
                    className={twMerge(
                        "flex items-center gap-4 text-2xl",
                        theme === "DARK" ? "opacity-60" : ""
                    )}
                >
                    <span className="hidden md:flex">{item.handle}</span>
                    <BsArrowUpRight />
                    <motion.button
                        type="button"
                        className="cursor-pointer"
                        onClick={async (e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(item.url);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1000);
                        }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            scale: copied ? 1.2 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                        }}
                    >
                        {copied ? (
                            <IoCheckboxOutline className="text-green-800" />
                        ) : (
                            <BsCopy />
                        )}
                    </motion.button>
                </div>
            </Link>
        </motion.div>
    );
};

export const SocialItems = ({ socials }: { socials: Social[] }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center self-center hover:color-heighlight-text">
            {socials.map((social, index) => (
                <SocialItem key={index} item={social} index={index} />
            ))}
        </div>
    );
};

export default SocialItems;
