// components/sections/ProjectsSection.tsx
"use client";

import Divider from "@/components/ui/Divider";
import ProjectCard from "@/components/project/ProjectCard";
import Section from "@/components/ui/Section";
import { projectsData } from "@/data/projectData";

export default function ProjectsSection() {
    const projectIds = Object.keys(projectsData);

    return (
        <Section sectionHeaderProps={{ title: "PROJECTS" }}>
            <Divider index={0} />
            <div className="h-64" />
            {/*<div className="my-20 flex flex-col items-center">
                {projectIds.map((id, index) => (
                    <div key={id} className="w-full">
                        <ProjectCard
                            id={id}
                            project={projectsData[id]}
                            reversed={index % 2 !== 0}
                        />

                        {index < projectIds.length - 1 && (
                            <div className="w-full overflow-hidden flex flex-col gap-0">
                                <Divider index={index * 3} />
                                <Divider index={index * 3 + 1} />
                                <Divider index={index * 3 + 2} />
                            </div>
                        )}
                    </div>
                ))}
            </div>*/}
        </Section>
    );
}
