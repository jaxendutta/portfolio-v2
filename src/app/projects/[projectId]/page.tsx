// src/app/projects/[projectId]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projectsData } from "@/data/projectData";
import { headingFont } from "@/lib/fonts";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NameSection from "@/components/sections/project/sections/NameSection";
import OverviewSection from "@/components/sections/project/sections/OverviewSection";
import TypographySection from "@/components/sections/project/sections/TypographySection";
import ColorSection from "@/components/sections/project/sections/ColorSection";
import TechStackSection from "@/components/sections/project/sections/TechStackSection";
import FooterSection from "@/components/sections/project/sections/FooterSection";
import RotatingButton from "@/components/ui/RotatingButton";
import { HiArrowLeft, HiArrowRight, HiArrowUp } from "react-icons/hi";

function getAdjacentProjects(currentId: string): {
    prev: string | null;
    next: string | null;
} {
    const projectIds = Object.keys(projectsData);
    const currentIndex = projectIds.indexOf(currentId);

    const prev = currentIndex > 0 ? projectIds[currentIndex - 1] : null;
    const next =
        currentIndex !== -1 && currentIndex < projectIds.length - 1
            ? projectIds[currentIndex + 1]
            : null;

    return { prev, next };
}

export default function ProjectPage() {
    const { projectId } = useParams();
    const id = typeof projectId === "string" ? projectId : projectId?.[0] || "";
    const mainRef = useRef<HTMLElement>(null);
    const [titleVisible, setTitleVisible] = useState(false);
    const isMobileRef = useRef(false);

    const project = projectsData[id];
    const adjacentProjects = project ? getAdjacentProjects(id) : null;

    // Set up scroll behavior
    useEffect(() => {
        if (!project) {
            notFound();
            return;
        }

        const checkMobile = () => {
            isMobileRef.current = window.innerWidth <= 768;
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Handle wheel events for horizontal scrolling
        const handleWheel = (e: WheelEvent) => {
            if (isMobileRef.current) return; // Skip on mobile

            if (mainRef.current && e.deltaY !== 0) {
                e.preventDefault();
                mainRef.current.scrollLeft += e.deltaY;
            }
        };

        // Update header visibility based on scroll position
        const updateHeaderVisibility = () => {
            if (mainRef.current) {
                // Show project title when scrolled past first section (80% of viewport width)
                setTitleVisible(
                    mainRef.current.scrollLeft > window.innerWidth * 0.8
                );
            }
        };

        const main = mainRef.current;
        if (main) {
            main.addEventListener("wheel", handleWheel, { passive: false });
            main.addEventListener("scroll", updateHeaderVisibility, {
                passive: true,
            });
        }

        return () => {
            if (main) {
                main.removeEventListener("wheel", handleWheel);
                main.removeEventListener("scroll", updateHeaderVisibility);
            }
            window.removeEventListener("resize", checkMobile);
        };
    }, [project]);

    // Scroll right function
    const scrollRight = () => {
        const main = mainRef.current;
        if (main) {
            main.scrollBy({
                left: window.innerWidth,
                behavior: "smooth",
            });
        }
    };

    // Back to top/left function
    const backToTop = () => {
        const main = mainRef.current;
        if (main) {
            main.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.div
            className="h-screen w-screen overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header with floating buttons and conditional title */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center">
                <div className="flex items-center gap-4">
                    <Link href="/#projects" aria-label="Back to Projects">
                        <RotatingButton
                            texts={["BACK TO PROJECTS"]}
                            centerIcon={HiArrowLeft}
                            size={80}
                            fontSize={12}
                        />
                    </Link>

                    <RotatingButton
                        texts={["SCROLL TO THE RIGHT"]}
                        centerIcon={HiArrowRight}
                        size={80}
                        fontSize={12}
                        onClick={scrollRight}
                    />
                </div>

                {/* Project title - only appears when scrolled */}
                <AnimatePresence>
                    {titleVisible && (
                        <motion.div
                            className="flex-1 flex justify-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h1
                                className={`text-3xl tracking-wider uppercase ${headingFont}`}
                            >
                                {project.name}
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-4 ml-auto">
                    <Link href="#project-name-top" aria-label="Back to Top">
                        <RotatingButton
                            texts={["BACK TO TOP"]}
                            centerIcon={HiArrowUp}
                            size={80}
                            fontSize={12}
                            onClick={backToTop}
                        />
                    </Link>

                    {adjacentProjects?.prev && (
                        <Link
                            href={`/projects/${adjacentProjects.prev}`}
                            aria-label={`Previous Project: ${projectsData[adjacentProjects.prev].name}`}
                        >
                            <RotatingButton
                                texts={["PREVIOUS PROJECT"]}
                                centerIcon={HiArrowLeft}
                                size={80}
                                fontSize={12}
                            />
                        </Link>
                    )}

                    {adjacentProjects?.next && (
                        <Link
                            href={`/projects/${adjacentProjects.next}`}
                            aria-label={`Next Project: ${projectsData[adjacentProjects.next].name}`}
                        >
                            <RotatingButton
                                texts={["NEXT PROJECT"]}
                                centerIcon={HiArrowRight}
                                size={80}
                                fontSize={12}
                            />
                        </Link>
                    )}
                </div>
            </header>

            {/* Main horizontal scrolling container */}
            <main
                ref={mainRef}
                className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory h-screen scrollbar-hide scroll-smooth"
                aria-label="Project content - scroll horizontally to navigate"
            >
                {/* Project Name Section */}
                <NameSection id="project-name-top" name={project.name} />

                {/* Overview Section */}
                <OverviewSection
                    overview={project.overview}
                    links={project.links}
                />

                {/* Typography Section - Conditionally render */}
                {project.typography && project.typography.length > 0 && (
                    <TypographySection
                        id="typography"
                        typography={project.typography}
                    />
                )}

                {/* Colors Section - Conditionally render */}
                {project.colors && project.colors.length > 0 && (
                    <ColorSection id="colour-palette" colors={project.colors} />
                )}

                {/* Tech Stack Section - Conditionally render */}
                {project.techStack &&
                    Object.keys(project.techStack).length > 0 && (
                        <TechStackSection
                            id="tech-stack"
                            techStack={project.techStack}
                        />
                    )}

                {/* Footer Section - Conditionally render */}
                {project.footer && (
                    <FooterSection id="footer" footer={project.footer} />
                )}
            </main>

            {/* Global styles */}
            <style jsx global>{`
                html,
                body {
                    overflow: hidden;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }

                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }

                /* Full section size */
                .section {
                    flex: 0 0 100vw;
                    height: 100vh;
                    scroll-snap-align: start;
                    scroll-snap-stop: always;
                }
            `}</style>
        </motion.div>
    );
}
