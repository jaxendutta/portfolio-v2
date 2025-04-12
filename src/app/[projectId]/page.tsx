// src/app/[projectId]/page.tsx
"use client";

import { projectsData } from "@/data/projectData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import ProjectHeader from "@/components/project/ProjectHeader";
import Link from "next/link";
import parse from "html-react-parser";

export default function ProjectPage({
    params,
}: {
    params: { projectId: string };
}) {
    const router = useRouter();

    // Get the projectId safely
    const id = params?.projectId || "";

    // Get project data
    const project = projectsData[id];

    // Redirect to home page if project doesn't exist
    useEffect(() => {
        if (!project) {
            router.push("/");
        }
    }, [project, router]);

    if (!project) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-3xl font-majorMono mb-4">
                        Project Not Found
                    </h1>
                    <Link href="/" className="text-[#D7482F] hover:underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <ProjectHeader projectName={project.name} />
            <ThemeSwitch />

            <main className="flex overflow-x-auto overflow-y-hidden scroll-smooth hide-scrollbar h-screen">
                {/* Project name section in enormous font */}
                <div
                    className="section flex items-center justify-center min-w-screen"
                    id="project-name-top"
                >
                    <motion.h1
                        className="font-majorMono text-[47vh] italic text-[#F4F1EA] m-0 p-0 pr-4 leading-none uppercase"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {project.name}
                    </motion.h1>
                </div>

                {/* Overview container */}
                <div className="flex flex-row w-max">
                    {project.overview.map((paragraph, index) => (
                        <div
                            key={index}
                            className="section flex-none w-screen h-full flex flex-col items-center justify-center p-8 box-border"
                        >
                            <div className="font-mono text-3xl leading-relaxed max-w-[80%] mx-auto mb-8 text-justify">
                                {parse(paragraph)}
                            </div>

                            {/* Only show links on the last overview paragraph */}
                            {(index === project.overview.length - 1 ||
                                index === 0) &&
                                project.links && (
                                    <div className="flex justify-around w-4/5 mt-8 items-center flex-wrap">
                                        {project.links.map(
                                            (link, linkIndex) => (
                                                <Link
                                                    key={linkIndex}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="no-underline text-[#F4F1EA] font-mono text-3xl relative pl-12 transition-all duration-300 group"
                                                >
                                                    <motion.span
                                                        className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 bg-[#D7482F] rounded-full z-[-1] transition-all duration-300"
                                                        whileHover={{
                                                            width: "115%",
                                                            height: "120%",
                                                            borderRadius:
                                                                "2rem",
                                                        }}
                                                    />
                                                    <span className="relative z-[1] pointer-events-none group-hover:text-[#17181C]">
                                                        {link.name.toUpperCase()}
                                                    </span>
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 z-[1] pointer-events-none group-hover:opacity-100">
                                                        ↗
                                                    </span>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    ))}
                </div>

                {/* Footer section */}
                {project.footer && (
                    <div className="section w-screen flex justify-center">
                        <div className="flex flex-col justify-center items-center text-[#F4F1EA] font-sans text-base text-center w-1/2 max-w-[1000px]">
                            <p className="mb-4">{project.footer}</p>
                            <p className="mt-4">Jaxen Anirban Dutta //</p>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
