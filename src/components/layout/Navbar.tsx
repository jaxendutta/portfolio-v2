// src/components/navigation/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { codeFont } from "@/styles/fonts";
import { THEME_COLORS } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

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

// NavLink component with proper hover effects
interface NavLinkProps extends NavLinkType {
    className?: string;
}

function NavLink({ name, href, className = "" }: NavLinkProps) {
    // Hover state for custom effects that can't be done with Tailwind alone
    const [isHovered, setIsHovered] = useState(false);
    const { theme } = useTheme();

    return (
        <Link
            href={href}
            className={twMerge(
                `flex items-center gap-1 relative`,
                `font-medium text-md md:text-lg lg:text-xl`,
                codeFont,
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                color: "white",
                mixBlendMode: "difference",
                textDecoration: "none",
            }}
        >
            <span className="transition-opacity duration-200">
                {isHovered ? ">" : "\\"}
            </span>

            {/* Link</span> text */}
            {name}

            {/* Underline indicator that animates from left to right */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5"
                style={{ backgroundColor: THEME_COLORS.accent[theme] }}
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.2 }}
            />
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [showGlassEffect, setShowGlassEffect] = useState(false);

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
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    // Track whether user has scrolled past hero section
    useEffect(() => {
        const handleScroll = () => {
            const heroSection =
                document.getElementById("main") ||
                document.querySelector("main") ||
                document.querySelector("section:first-of-type");

            if (heroSection) {
                const scrollThreshold = heroSection.offsetHeight * 0.1;
                const shouldShowGlass = window.scrollY > scrollThreshold;

                setShowGlassEffect(shouldShowGlass);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Split links for layout
    const linkLength = navLinks.length / 2;
    const leftLinks = navLinks.slice(0, linkLength);
    const rightLinks = navLinks.slice(linkLength);

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{
                y: 0,
                opacity: 1,
                backdropFilter: showGlassEffect ? "blur(10px)" : "blur(0px)",
                backgroundColor: showGlassEffect
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0)",
                borderColor: showGlassEffect
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0)",
                boxShadow: showGlassEffect
                    ? "0 4px 6px rgba(0, 0, 0, 0.1)"
                    : "none",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={twMerge(
                "fixed top-0 left-0 right-0 z-1 rounded-full m-4 p-4"
            )}
        >
            <div className="flex justify-between items-center">
                {[leftLinks, rightLinks].map((links, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center gap-6"
                    >
                        {links.map((link) => (
                            <NavLink key={link.name} {...link} />
                        ))}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
