// src/app/projects/[projectId]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { projectsData } from "@/data/projectData";
import NameSection from "@/components/sections/project/sections/NameSection";
import ProjectsPageHeader from "@/components/sections/project/ProjectsPageHeader";
import Skeleton from "@/components/ui/Skeleton";

// Dynamically load heavy sections with skeletons
const OverviewSection = dynamic(
    () => import("@/components/sections/project/sections/OverviewSection"),
    {
        loading: () => <Skeleton className="h-[80vh] w-full" />,
    }
);

const TypographySection = dynamic(
    () => import("@/components/sections/project/sections/TypographySection"),
    {
        loading: () => <Skeleton className="h-[80vh] w-full" />,
    }
);

const ColorSection = dynamic(
    () => import("@/components/sections/project/sections/ColorSection"),
    {
        loading: () => <Skeleton className="h-[80vh] w-full" />,
    }
);

const TechStackSection = dynamic(
    () => import("@/components/sections/project/sections/TechStackSection"),
    {
        loading: () => <Skeleton className="h-[80vh] w-full" />,
    }
);

const FooterSection = dynamic(
    () => import("@/components/sections/project/sections/FooterSection"),
    {
        loading: () => <Skeleton className="h-[80vh] w-full" />,
    }
);

export default function ProjectPage() {
    const { projectId } = useParams();
    const id = typeof projectId === "string" ? projectId : projectId?.[0] || "";
    const mainRef = useRef<HTMLElement>(null);
    const [titleVisible, setTitleVisible] = useState(false);
    const [isLandscape, setIsLandscape] = useState(true);

    const project = projectsData[id];

    // Memoized wheel handler
    const handleWheel = useCallback(
        (e: WheelEvent) => {
            if (isLandscape && mainRef.current) {
                const { deltaX, deltaY } = e;
                const isHorizontalScroll = Math.abs(deltaX) > Math.abs(deltaY);

                if (!isHorizontalScroll) {
                    e.preventDefault();
                    mainRef.current.scrollBy({
                        left: deltaY * 2,
                        behavior: "smooth",
                    });
                }
            }
        },
        [isLandscape]
    );

    // Scroll and resize handlers
    const updateHeaderVisibility = useCallback(() => {
        if (!mainRef.current) return;
        const nameSection = document.getElementById("project-name-top");
        if (!nameSection) return;

        const rect = nameSection.getBoundingClientRect();
        setTitleVisible(isLandscape ? rect.right <= 10 : rect.bottom <= 10);
    }, [isLandscape]);

    useEffect(() => {
        if (!project) {
            notFound();
            return;
        }

        const mediaQuery = window.matchMedia("(orientation: landscape)");
        const updateOrientation = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsLandscape(e.matches);
        };

        updateOrientation(mediaQuery);
        mediaQuery.addEventListener("change", updateOrientation);

        const main = mainRef.current;
        if (main) {
            main.addEventListener("wheel", handleWheel, { passive: false });
            main.addEventListener("scroll", updateHeaderVisibility, {
                passive: true,
            });

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
    }, [project, handleWheel, updateHeaderVisibility]);

    return (
        <div className="h-screen w-screen overflow-hidden relative">
            <ProjectsPageHeader
                titleVisible={titleVisible}
                isLandscape={isLandscape}
            />

            <motion.main
                ref={mainRef}
                className={`
                    h-screen w-screen scroll-smooth snap-mandatory
                    ${
                        isLandscape
                            ? "flex flex-row overflow-x-auto overflow-y-hidden snap-x"
                            : "flex flex-col overflow-y-auto overflow-x-hidden snap-y"
                    }`}
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollBehavior: "smooth",
                    scrollPaddingTop: "100px",
                    paddingTop: "100px",
                    ...(isLandscape
                        ? { height: "100vh" }
                        : { minHeight: "calc(100vh - 100px)" }),
                }}
            >
                <NameSection name={project.name} />

                {project.overview && (
                    <OverviewSection
                        overview={project.overview}
                        links={project.links}
                    />
                )}

                {project.typography && project.typography.length > 0 && (
                    <TypographySection typography={project.typography} />
                )}

                {project.colors && project.colors.length > 0 && (
                    <ColorSection colors={project.colors} />
                )}

                {project.techStack &&
                    Object.keys(project.techStack).length > 0 && (
                        <TechStackSection techStack={project.techStack} />
                    )}

                {project.footer && <FooterSection footer={project.footer} />}
            </motion.main>
        </div>
    );
}
