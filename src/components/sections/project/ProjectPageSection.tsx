"use client";

import { motion } from "framer-motion";
import { displayFont } from "@/lib/fonts";
import { ReactNode, useState, useEffect } from "react";

interface ProjectPageSectionProps {
    id?: string;
    title: string[];
    children?: ReactNode;
    className?: string;
}

export const ProjectPageSection = ({
    id,
    title,
    children,
    className = "",
}: ProjectPageSectionProps) => {
    const [orientation, setOrientation] = useState<"landscape" | "portrait">(
        "landscape"
    );

    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(
                window.innerWidth > window.innerHeight
                    ? "landscape"
                    : "portrait"
            );
        };

        // Set initial orientation
        handleOrientationChange();

        // Add event listener for resize
        window.addEventListener("resize", handleOrientationChange);

        // Clean up
        return () =>
            window.removeEventListener("resize", handleOrientationChange);
    }, []);

    const sectionStyles: React.CSSProperties = {
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
        transition: "all 0.3s ease-in-out",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
        ...(orientation === "landscape"
            ? {
                  minWidth: "100vw",
                  height: "80%",
                  display: "flex",
                  gap: "4rem",
                  flexDirection: "row",
                  paddingRight: "6rem",
              }
            : {
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4rem",
                  padding: "6rem 1rem",
              }),
    };

    return (
        <motion.section
            id={id}
            className={`w-full snap-start ${className}`}
            style={sectionStyles}
        >
            <motion.div
                className={`${displayFont} text-5xl whitespace-pre-line`}
                style={{
                    fontStyle: "italic",
                    transform:
                        orientation === "landscape" ? "rotate(-90deg)" : "none",
                }}
            >
                {title.join("\n")}
            </motion.div>
            {children}
        </motion.section>
    );
};
