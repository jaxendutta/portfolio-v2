// src/components/project/TechStackSection.tsx
"use client";

interface TechStackSectionProps {
    techStack: Record<string, string[]>;
}

export default function TechStackSection({ techStack }: TechStackSectionProps) {
    return (
        <div className="section flex flex-col md:flex-row">
            <div className="vertical-header writing-vertical-rl text-orientation-mixed transform rotate-180 font-heading text-5xl italic pt-20 pb-12 pr-20 md:pt-10 md:pr-0 md:pl-20 w-full h-auto md:w-min">
                TECHSTACK
                <br />
                TechStaCk
                <br />
                TecHStAck
            </div>

            <div className="flex flex-row flex-wrap content-start self-center gap-9 mr-[100px] max-h-[80vh] w-full box-border">
                {Object.entries(techStack).map(
                    ([category, technologies], index) => (
                        <div
                            key={index}
                            className="w-full md:w-[300px] mr-0 md:mr-8"
                        >
                            <h2 className="font-heading italic text-4xl my-4 lowercase">
                                {category}
                            </h2>

                            <div className="h-0.5 bg-gradient-to-r from-accent-dark to-transparent relative">
                                <span></span>
                            </div>

                            <ul className="list-none p-0 mt-4 font-code text-xl text-text-dark">
                                {technologies.map((tech, techIndex) => (
                                    <li key={techIndex} className="mb-2">
                                        {tech.toUpperCase()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
