// src/app/projects/[projectId]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projectData";
import NameSection from "@/components/sections/project/sections/NameSection";
import OverviewSection from "@/components/sections/project/sections/OverviewSection";
import TypographySection from "@/components/sections/project/sections/TypographySection";
import ColorSection from "@/components/sections/project/sections/ColorSection";
import TechStackSection from "@/components/sections/project/sections/TechStackSection";
import FooterSection from "@/components/sections/project/sections/FooterSection";
import ProjectsPageHeader from "@/components/sections/project/ProjectsPageHeader";

export default function ProjectPage() {
    const { projectId } = useParams();
    const id = typeof projectId === "string" ? projectId : projectId?.[0] || "";
    const mainRef = useRef<HTMLElement>(null);
    const [titleVisible, setTitleVisible] = useState(false);
    const [isLandscape, setIsLandscape] = useState(true);

    const project = projectsData[id];

    // Set up orientation detection and scroll behavior
    useEffect(() => {
        if (!project) {
            notFound();
            return;
        }

        // Detect orientation using media query
        const mediaQuery = window.matchMedia("(orientation: landscape)");

        const updateOrientation = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsLandscape(e.matches);
        };

        // Initialize with current orientation
        updateOrientation(mediaQuery);

        // Listen for orientation changes
        mediaQuery.addEventListener("change", updateOrientation);

        // Handle wheel events for horizontal scrolling in landscape mode
        const handleWheel = (e: WheelEvent) => {
            if (isLandscape && mainRef.current && e.deltaY !== 0) {
                e.preventDefault();

                // Adjust scroll amount - start small to fix overshooting
                const scrollAmount = e.deltaY * 0.8;

                // Use immediate scrolling for responsive feel
                mainRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: "auto",
                });
            }
        };

        // Update header visibility based on scroll position
        const updateHeaderVisibility = () => {
            if (!mainRef.current) return;

            const nameSection = document.getElementById("project-name-top");
            if (!nameSection) return;

            if (isLandscape) {
                // For landscape: check horizontal position
                const nameSectionRight =
                    nameSection.getBoundingClientRect().right;
                setTitleVisible(nameSectionRight <= 10);
            } else {
                // For portrait: check vertical position
                const nameSectionBottom =
                    nameSection.getBoundingClientRect().bottom;
                setTitleVisible(nameSectionBottom <= 10);
            }
        };

        const main = mainRef.current;
        if (main) {
            main.addEventListener("wheel", handleWheel, { passive: false });
            main.addEventListener("scroll", updateHeaderVisibility, {
                passive: true,
            });

            // Ensure we start at the beginning
            setTimeout(() => {
                main.scrollTo(0, 0);
                updateHeaderVisibility();
            }, 100);
        }

        return () => {
            mediaQuery.removeEventListener("change", updateOrientation);
            if (main) {
                main.removeEventListener("wheel", handleWheel);
                main.removeEventListener("scroll", updateHeaderVisibility);
            }
        };
    }, [project, isLandscape]);

    return (
        <div className="h-screen w-screen overflow-hidden relative">
            {/* Header section */}
            <ProjectsPageHeader
                titleVisible={titleVisible}
                isLandscape={isLandscape}
            />

            {/* Main container that adapts to orientation */}
            <motion.main
                ref={mainRef}
                className={`
                    h-screen w-screen
                    ${
                        isLandscape
                            ? "flex flex-row overflow-x-auto overflow-y-hidden snap-x"
                            : "flex flex-col overflow-y-auto overflow-x-hidden snap-y"
                    } 
                    snap-mandatory scroll-smooth gap-20
                `}
                style={{
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE and Edge
                }}
            >
                {/* Project Name Section */}
                <NameSection name={project.name} />

                {/* Overview Section */}
                <OverviewSection
                    overview={project.overview}
                    links={project.links}
                />

                {/* Typography Section - Conditionally render */}
                {project.typography && project.typography.length > 0 && (
                    <TypographySection typography={project.typography} />
                )}

                {/* Colors Section - Conditionally render */}
                {project.colors && project.colors.length > 0 && (
                    <ColorSection colors={project.colors} />
                )}

                {/* Tech Stack Section - Conditionally render */}
                {project.techStack &&
                    Object.keys(project.techStack).length > 0 && (
                        <TechStackSection techStack={project.techStack} />
                    )}

                {/* Footer Section - Conditionally render */}
                {project.footer && <FooterSection footer={project.footer} />}
            </motion.main>
        </div>
    );
}
