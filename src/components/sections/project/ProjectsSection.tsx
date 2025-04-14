// components/sections/ProjectsSection.tsx
"use client";

import Section from "@/components/ui/Section";
import { GiStrongbox } from "react-icons/gi";

export default function ProjectsSection() {
    return (
        <Section
            headerProps={{
                title: "PROJECTS",
                buttonProps: {
                    onClick: () => (window.location.href = "/projects"),
                    texts: ["Click Here", "Access the Vault"],
                    centerIcon: GiStrongbox,
                },
            }}
        >
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
