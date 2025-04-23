"use client";

import { projectsData } from "@/data/projectData";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/sections/project/ProjectCard";
import { GiPaintBrush } from "react-icons/gi";

export default function ProjectsSection() {
    const projectIds = Object.keys(projectsData);
    const topCount = Math.min(4, projectIds.length);

    return (
        <Section
            headerProps={{
                title: "PROJECTS",
                buttonProps: {
                    href: "/projects",
                    texts: ["All", "Projects", "View More"],
                    centerIcon: GiPaintBrush,
                    className: "right-1/6",
                },
            }}
        >
            <div className="my-20 flex flex-col items-center">
                {projectIds.slice(0, topCount).map((id, index) => (
                    <div
                        key={id}
                        className={`w-full my-8 ${index % 2 === 0 ? "p-4 border border-current" : ""}`}
                    >
                        <ProjectCard
                            id={id}
                            project={projectsData[id]}
                            reversed={index % 2 !== 0}
                        />
                    </div>
                ))}
            </div>
        </Section>
    );
}
