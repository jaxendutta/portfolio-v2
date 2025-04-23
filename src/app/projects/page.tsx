"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { headingFont } from "@/lib/fonts";
import { fadeIn, staggerContainer, slideUp } from "@/lib/motionVariants";
import { projectsData } from "@/data/projectData";
import RotatingButton from "@/components/ui/RotatingButton";
import { GiMagnifyingGlass, GiTechnoHeart, GiCalendar } from "react-icons/gi";
import { RiFilterLine, RiCloseLine } from "react-icons/ri";
import { HiOutlineArrowLongLeft, HiOutlineArrowLongUp } from "react-icons/hi2";
import ProjectCard from "@/components/sections/project/ProjectCard";
import Footer from "@/components/layout/Footer";

export default function ProjectsPage() {
    const projects = projectsData;
    const projectIds = Object.keys(projects);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    // Extract all unique tech stacks from all projects
    const allTechStacks = useMemo(() => {
        const techStacks = new Set<string>();

        projectIds.forEach((id) => {
            const project = projects[id];
            if (project.techStack) {
                Object.values(project.techStack)
                    .flat()
                    .forEach((tech) => {
                        techStacks.add(tech);
                    });
            }
        });

        return Array.from(techStacks).sort();
    }, [projectIds, projects]);

    // Extract all unique years from project data
    const allYears = useMemo(() => {
        const years = new Set<number>();

        projectIds.forEach((id) => {
            const project = projects[id];
            if (project.date) {
                years.add(project.date.getFullYear());
            }
        });

        return Array.from(years).sort((a, b) => b - a); // Sort descending (newest first)
    }, [projectIds, projects]);

    // Filter projects based on search query, selected tech stacks, and year
    const filteredProjects = useMemo(() => {
        return projectIds.filter((id) => {
            const project = projects[id];
            const matchesSearch =
                searchQuery === "" ||
                project.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (project.subtitle &&
                    project.subtitle
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                (project.overview &&
                    project.overview.some((paragraph) =>
                        paragraph
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                    ));

            const matchesTechStack =
                selectedTechStack.length === 0 ||
                (project.techStack &&
                    selectedTechStack.every(
                        (tech) =>
                            project.techStack &&
                            Object.values(project.techStack)
                                .flat()
                                .includes(tech)
                    ));

            const matchesYear =
                !selectedYear ||
                (project.date && project.date.getFullYear() === selectedYear);

            return matchesSearch && matchesTechStack && matchesYear;
        });
    }, [projectIds, projects, searchQuery, selectedTechStack, selectedYear]);

    const toggleTechStack = (tech: string) => {
        setSelectedTechStack((prev) =>
            prev.includes(tech)
                ? prev.filter((t) => t !== tech)
                : [...prev, tech]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedTechStack([]);
        setSelectedYear(null);
    };

    return (
        <div className="min-h-screen px-4">
            <motion.header
                className="sticky top-0 z-50 flex justify-between items-center px-6 py-4"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
            >
                <RotatingButton
                    href="/#projects"
                    texts={["Back to Home", "Over and Out"]}
                    centerIcon={HiOutlineArrowLongLeft}
                    size={90}
                    fontSize={12}
                    variant="glow"
                />
                <RotatingButton
                    href="#top"
                    texts={["Back to top", "Start of page"]}
                    centerIcon={HiOutlineArrowLongUp}
                    size={90}
                    fontSize={12}
                    variant="glow"
                />
            </motion.header>

            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="mb-12"
            >
                <motion.div
                    className={`text-5xl md:text-8xl text-center ${headingFont} italic clip-text mb-4`}
                    style={{
                        textDecoration: "none",
                        fontStyle: "italic",
                    }}
                >
                    PROJECTS
                </motion.div>
                <p className="text-sm md:text-base text-center opacity-80 max-w-2xl mx-auto">
                    Showcasing my work across web development, UX/UI design, and
                    software engineering.
                </p>
                <div className="flex justify-between items-center gap-4 my-2 text-xs">
                    <p className="text-center mt-2">
                        <span className="font-bold">
                            {filteredProjects.length}
                        </span>{" "}
                        projects found
                        {selectedTechStack.length > 0 && (
                            <>
                                {" "}
                                filtered by {selectedTechStack.length}{" "}
                                technologies
                            </>
                        )}
                        {selectedYear && <> from {selectedYear}</>}
                        {searchQuery && (
                            <>
                                {" "}
                                matching &quot;
                                <span className="italic">{searchQuery}</span>
                                &quot;
                            </>
                        )}
                    </p>
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-2 text-xl hover:text-accent transition-colors"
                        aria-label={
                            showFilters ? "Hide filters" : "Show filters"
                        }
                    >
                        {showFilters ? <RiCloseLine /> : <RiFilterLine />}
                    </button>
                </div>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
                className={`border-b border-current overflow-hidden transition-all duration-300 ${showFilters ? "max-h-[1000px]" : "max-h-0"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: showFilters ? 1 : 0 }}
            >
                <div className="container mx-auto px-6 py-8">
                    <div className="flex flex-col gap-6">
                        {/* Search Box */}
                        <div className="w-full">
                            <div className="relative">
                                <GiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full py-2 pl-10 pr-4 border border-current bg-transparent focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 justify-between">
                            {/* Tech Stack Filter */}
                            <div className="w-full md:w-2/3">
                                <h2 className="text-lg mb-2 flex items-center gap-2">
                                    <GiTechnoHeart /> Tech Stack Filter
                                    {(selectedTechStack.length > 0 ||
                                        selectedYear !== null) && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-accent hover:underline ml-4"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {allTechStacks.map((tech) => (
                                        <motion.button
                                            key={tech}
                                            onClick={() =>
                                                toggleTechStack(tech)
                                            }
                                            className={`px-3 py-1 border rounded-full text-sm ${
                                                selectedTechStack.includes(tech)
                                                    ? "bg-[var(--color-text)] text-[var(--color-background)]"
                                                    : "border-current hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {tech}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Year Filter */}
                            {allYears.length > 0 && (
                                <div className="w-full md:w-1/3">
                                    <h2 className="text-lg mb-2 flex items-center gap-2">
                                        <GiCalendar /> Year Filter
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {allYears.map((year) => (
                                            <motion.button
                                                key={year}
                                                onClick={() =>
                                                    setSelectedYear(
                                                        selectedYear === year
                                                            ? null
                                                            : year
                                                    )
                                                }
                                                className={`px-3 py-1 border rounded-full text-sm ${
                                                    selectedYear === year
                                                        ? "bg-[var(--color-text)] text-[var(--color-background)]"
                                                        : "border-current hover:bg-[var(--color-text)] hover:text-[var(--color-background)]"
                                                }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {year}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            <main className="container mx-auto py-12">
                {filteredProjects.length > 0 ? (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {filteredProjects.map((id, index) => (
                            <motion.div
                                key={id}
                                variants={slideUp}
                                className="p-6 border border-current"
                            >
                                <ProjectCard
                                    id={id}
                                    project={projects[id]}
                                    reversed={index % 2 !== 0}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="text-center py-20"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-2xl mb-8 opacity-70">
                            No projects found matching your criteria
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 border border-current hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-colors"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
}
