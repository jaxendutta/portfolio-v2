// src/components/navigation/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { GlassMorphism } from "@/components/ui/GlassMorphism";
import { twMerge } from "tailwind-merge";

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

    return (
        <Link
            href={href}
            className={twMerge(
                `flex items-center gap-1 relative transition-colors duration-200
               font-heading font-medium text-md md:text-lg lg:text-xl`,
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Prefix symbol that changes on hover (similar to original site) */}
            <span className="transition-opacity duration-200">
                {isHovered ? ">" : "\\"}
            </span>

            {/* Link text */}
            {name}

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

    // Track whether user has scrolled past hero section
    const [showGlassEffect, setShowGlassEffect] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Get the hero section - try both by ID and by looking for a main element
            const heroSection =
                document.getElementById("main") ||
                document.querySelector("main") ||
                document.querySelector("section:first-of-type");

            if (heroSection) {
                // Calculate when we've scrolled past ~10% of the hero section
                const scrollThreshold = heroSection.offsetHeight * 0.1;

                // Also check if we're near the top of the page (within 5vh)
                const topThreshold = window.innerHeight * 0.05;

                // Show glass when we're past hero AND not at the top of the page
                const shouldShowGlass =
                    window.scrollY > scrollThreshold &&
                    window.scrollY > topThreshold;

                // Update state only if changed
                if (showGlassEffect !== shouldShowGlass) {
                    console.log(
                        "Updating glass effect:",
                        shouldShowGlass,
                        "at scrollY:",
                        window.scrollY
                    );
                    setShowGlassEffect(shouldShowGlass);
                }
            } else {
                console.log("Hero section not found, waiting for DOM to load");
                // Default to showing navbar without glass effect if section not found
                setShowGlassEffect(false);
            }
        };

        // Add a small delay for initial check to ensure DOM is loaded
        const initialCheckTimer = setTimeout(handleScroll, 100);

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        return () => {
            clearTimeout(initialCheckTimer);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [showGlassEffect]); // Add dependency to ensure correct comparison

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ease-in-out">
            {showGlassEffect ? (
                <GlassMorphism>
                    {[leftLinks, rightLinks].map((links, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center gap-6 mix-blend-normal text-white"
                        >
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    className="text-white"
                                    {...link}
                                />
                            ))}
                        </div>
                    ))}
                </GlassMorphism>
            ) : (
                <div className="flex justify-between items-center ">
                    {[leftLinks, rightLinks].map((links, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center gap-6"
                        >
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    className="bmix-blend-difference"
                                    {...link}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
}
