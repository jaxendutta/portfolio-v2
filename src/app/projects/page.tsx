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
import FilterContainer, {
    FilterTag,
    FilterSection,
} from "@/components/ui/FilterContainer";

export default function ProjectsPage() {
    const projects = projectsData;
    const projectIds = Object.keys(projects);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
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

    // Filter projects based on search query, selected tech stacks, and years
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
                selectedYears.length === 0 ||
                (project.date &&
                    selectedYears.includes(project.date.getFullYear()));

            return matchesSearch && matchesTechStack && matchesYear;
        });
    }, [projectIds, projects, searchQuery, selectedTechStack, selectedYears]);

    // Toggle tech stack selection
    const toggleTechStack = (tech: string) => {
        setSelectedTechStack((prev) =>
            prev.includes(tech)
                ? prev.filter((t) => t !== tech)
                : [...prev, tech]
        );
    };

    // Toggle year selection
    const toggleYear = (year: number) => {
        setSelectedYears((prev) =>
            prev.includes(year)
                ? prev.filter((y) => y !== year)
                : [...prev, year]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setSelectedTechStack([]);
        setSelectedYears([]);
    };

    // Check if any filters are active
    const hasActiveFilters =
        searchQuery !== "" ||
        selectedTechStack.length > 0 ||
        selectedYears.length > 0;

    return (
        <div className="min-h-screen px-4">
            {/* Header with navigation buttons */}
            <motion.header
                className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-[var(--color-background)] bg-opacity-80 backdrop-blur-sm"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
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

            {/* Page title and description */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="mb-12 pt-8"
            >
                <motion.div
                    className={`text-5xl md:text-8xl text-center ${headingFont} italic clip-text mb-8`}
                    style={{
                        textDecoration: "none",
                        fontStyle: "italic",
                    }}
                >
                    PROJECTS
                </motion.div>
                <p className="text-sm md:text-base text-center opacity-80 max-w-2xl mx-auto mb-8">
                    Showcasing my work across web development, UX/UI design, and
                    software engineering.
                </p>

                {/* Results count and filter controls */}
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-current pb-4">
                        {/* Results count with detailed filter information */}
                        <div className="text-center md:text-left text-sm md:text-base flex-grow">
                            <span className="font-bold">
                                {filteredProjects.length}
                            </span>{" "}
                            projects found
                            {selectedTechStack.length > 0 && (
                                <>
                                    {" "}
                                    filtered by{" "}
                                    <span className="text-accent">
                                        {selectedTechStack.length}{" "}
                                        {selectedTechStack.length === 1
                                            ? "technology"
                                            : "technologies"}
                                    </span>
                                </>
                            )}
                            {selectedYears.length > 0 && (
                                <>
                                    {" "}
                                    from{" "}
                                    <span className="text-accent">
                                        {selectedYears.length === 1
                                            ? "year"
                                            : "years"}{" "}
                                        {selectedYears.join(", ")}
                                    </span>
                                </>
                            )}
                            {searchQuery && (
                                <>
                                    {" "}
                                    matching{" "}
                                    <span className="text-accent italic">
                                        &quot;{searchQuery}&quot;
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Filter controls */}
                        <div className="flex items-center gap-4">
                            {hasActiveFilters && (
                                <motion.button
                                    onClick={clearFilters}
                                    className="px-3 py-1.5 border border-current hover:bg-[var(--color-text)] hover:text-[var(--color-background)] text-sm transition-colors flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    <RiCloseLine className="text-lg" />
                                    <span>Clear filters</span>
                                </motion.button>
                            )}

                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-3 py-1.5 border border-current hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-colors flex items-center gap-2 text-sm"
                                aria-label={
                                    showFilters
                                        ? "Hide filters"
                                        : "Show filters"
                                }
                            >
                                {showFilters ? (
                                    <RiCloseLine className="text-lg" />
                                ) : (
                                    <RiFilterLine className="text-lg" />
                                )}
                                <span>
                                    {showFilters
                                        ? "Hide filters"
                                        : "Show filters"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Filter section using custom FilterContainer component */}
            <FilterContainer
                isVisible={showFilters}
                className="container mx-auto"
            >
                <div className="flex flex-col gap-6">
                    {/* Search Box */}
                    <div className="w-full">
                        <div className="relative">
                            <GiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 border border-current bg-transparent focus:outline-none focus:ring-1 focus:ring-accent"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Tech Stack Filter */}
                        <FilterSection
                            title="Tech Stack Filter"
                            icon={<GiTechnoHeart />}
                        >
                            {allTechStacks.map((tech) => (
                                <FilterTag
                                    key={tech}
                                    label={tech}
                                    isActive={selectedTechStack.includes(tech)}
                                    onClick={() => toggleTechStack(tech)}
                                />
                            ))}
                        </FilterSection>

                        {/* Year Filter */}
                        {allYears.length > 0 && (
                            <FilterSection
                                title="Year Filter"
                                icon={<GiCalendar />}
                            >
                                {allYears.map((year) => (
                                    <FilterTag
                                        key={year}
                                        label={year.toString()}
                                        isActive={selectedYears.includes(year)}
                                        onClick={() => toggleYear(year)}
                                    />
                                ))}
                            </FilterSection>
                        )}
                    </div>
                </div>
            </FilterContainer>

            {/* Projects display */}
            <main className="containerd">
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
                            type="button"
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
