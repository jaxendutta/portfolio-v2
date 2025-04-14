"use client";

import Link from "next/link";
import { Social } from "@/data/contactData";
import { BsArrowUpRight } from "react-icons/bs";

export const SocialItem = ({ item, index }: { item: Social; index: number }) => {
    return (
        <Link
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full p-4 font-mono text-[#F4F1EA] hover:bg-[darkblue]
                flex flex-row justify-between items-center group
                border-b border-[#F4F1EA] hover:text-[palegreen]
                transition-all duration-300 ease-in-out`}
        >
            <div className="flex items-center gap-4">
                <span>{`${(index + 1).toString().padStart(2, "0")}.`}</span>
                <span>{item.platform}</span>
            </div>
            <div className="flex items-center gap-4 text-2xl opacity-60">
                <span className="hidden md:flex">{item.handle}</span>
                <BsArrowUpRight />
            </div>
        </Link>
    );
};

export const SocialItems = ({ socials }: { socials: Social[] }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center self-center">
            {socials.map((social, index) => (
                <SocialItem key={index} item={social} index={index} />
            ))}
        </div>
    );
};

export default SocialItems;