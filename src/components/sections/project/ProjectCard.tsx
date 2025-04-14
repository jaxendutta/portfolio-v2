// src/components/project/ProjectCard.tsx
"use client";

import { ProjectData } from "@/types/project";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCircleInfo } from "react-icons/fa6";
import parse from "html-react-parser";

interface ProjectCardProps {
    id: string;
    project: ProjectData;
    reversed?: boolean;
}

export default function ProjectCard({
    id,
    project,
    reversed = false,
}: ProjectCardProps) {
    return (
        <div
            className="h-screen w-screen flex justify-center items-center"
            id={id}
        >
            <div
                className={`flex flex-col md:flex-row items-center ${
                    reversed ? "md:flex-row-reverse" : ""
                }`}
            >
                <div className="w-full md:w-1/2 flex flex-col md:flex-row-reverse">
                    <div className="p-12 w-full md:w-10/12 max-w-[750px] flex flex-col">
                        <Link
                            href={`/${id}`}
                            className="flex justify-center md:justify-end text-text-dark no-underline transition-colors duration-300 hover:text-accent-dark"
                        >
                            <h1 className="font-heading text-right text-4xl md:text-6xl italic m-4 md:m-1">
                                {project.name.toUpperCase()}
                            </h1>
                        </Link>

                        <div className="flex flex-wrap justify-center md:justify-end gap-2.5 mb-4">
                            {project.techStack &&
                                Object.values(project.techStack)
                                    .flat()
                                    .slice(0, 10)
                                    .map((tech, index) => (
                                        <span
                                            key={`${tech}-${index}`}
                                            className="font-sans text-base text-text-dark text-center align-middle p-[5px_7.5px] border border-text-dark rounded-[30px] transition-all duration-300 hover:bg-text-dark hover:text-background-dark hover:shadow-[0_0_8px] hover:shadow-text-dark"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                        </div>

                        <div className="font-code text-lg leading-relaxed mb-5 text-center md:text-right text-text-dark">
                            {project.overview[0] && parse(project.overview[0])}
                        </div>

                        {/* Mobile image displayed on small screens */}
                        <div className="block md:hidden w-full mb-8">
                            <div className="relative">
                                <Image
                                    src={`/assets/${id}.png`}
                                    alt={`Screenshot of ${project.name}`}
                                    width={500}
                                    height={300}
                                    className="rounded-[15px] border border-text-dark transition-opacity duration-300 hover:opacity-50"
                                />
                                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <motion.div
                                        className="w-[100px] h-[100px] bg-text-dark flex justify-center items-center cursor-pointer"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        <Link href={`/${id}`}>
                                            <FaCircleInfo className="text-4xl text-background-dark" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="self-center md:self-end cursor-pointer text-text-dark h-[50px] w-[250px] text-center transition-all duration-500 relative">
                            <Link
                                href={`/${id}`}
                                className="absolute w-full h-full flex justify-center items-center no-underline text-text-dark"
                            >
                                <span>EXPLORE &gt;&gt;</span>
                            </Link>
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full border border-text-dark bg-transparent z-[-1]"
                                whileHover={{ rotate: -22 }}
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full border border-text-dark bg-transparent z-[-1]"
                                whileHover={{ rotate: 22 }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop image hidden on small screens */}
                <div className="hidden md:block w-1/2">
                    <div className="relative w-[35vw] max-w-[800px] ml-8">
                        <Image
                            src={`/assets/${id}.png`}
                            alt={`Screenshot of ${project.name}`}
                            width={800}
                            height={500}
                            className="rounded-[15px] border border-text-dark transition-opacity duration-300 hover:opacity-50"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <motion.div
                                className="w-[100px] h-[100px] bg-text-dark flex justify-center items-center cursor-pointer"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            >
                                <Link href={`/${id}`}>
                                    <FaCircleInfo className="text-4xl text-background-dark" />
                                </Link>
                            </motion.div>
                        </div>
                        <motion.div
                            className="absolute top-1/2 left-[120%] transform -translate-y-1/2 -translate-x-1/2 text-[8em] text-text-dark opacity-0 transition-opacity duration-300"
                            whileHover={{ opacity: 1 }}
                        >
                            →
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
