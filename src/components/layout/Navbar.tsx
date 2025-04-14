// src/components/navigation/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Define nav link type with proper typing
type NavLinkType = {
    name: string;
    href: string;
    section: string;
};

// Navigation data
const navLinks: NavLinkType[] = [
    { name: "HOME", href: "#main", section: "main" },
    { name: "PROJECTS", href: "#projects", section: "projects" },
    { name: "WORK", href: "#work", section: "work" },
    { name: "CONTACT", href: "#contact", section: "contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    // Track scroll position to highlight active section
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY + window.innerHeight / 3;

            // Find the active section
            for (const link of navLinks) {
                const element = document.getElementById(link.section);
                if (!element) continue;

                const { top, bottom } = element.getBoundingClientRect();
                const sectionTop = top + window.scrollY;
                const sectionBottom = bottom + window.scrollY;

                if (
                    currentPosition >= sectionTop &&
                    currentPosition <= sectionBottom
                ) {
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Check immediately

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]); // Re-run when page changes

    // Split links for layout
    const linkLength = navLinks.length / 2;
    const leftLinks = navLinks.slice(0, linkLength);
    const rightLinks = navLinks.slice(linkLength);

    return (
        <div className="flex justify-between p-4 w-full fixed z-50 mix-blend-difference">
            {[leftLinks, rightLinks].map((links, index) => (
                <div key={index} className={`flex gap-[5vw]`}>
                    {links.map((link) => (
                        <NavLink key={link.name} {...link} />
                    ))}
                </div>
            ))}
        </div>
    );
}

// NavLink component with proper hover effects
function NavLink(link: NavLinkType) {
    // Hover state for custom effects that can't be done with Tailwind alone
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={link.href}
            className={`flex items-center gap-1 relative transition-colors duration-200
                         font-heading text-md md:text-lg lg:text-xl`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Prefix symbol that changes on hover (similar to original site) */}
            <span className="transition-opacity duration-200">
                {isHovered ? ">" : "\\"}
            </span>

            {/* Link text */}
            {link.name}

            {/* Underline indicator ONLY for hover state, not active state */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#D7482F]"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.2 }}
            />
        </Link>
    );
}
