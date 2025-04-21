// src/components/ui/RotatingButton.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

export interface RotatingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    texts: string[];
    delimiters?: string[];
    size?: number;
    variant?: "default" | "frost" | "raised" | "glow";
    href?: string;
    onClick?: () => void;
    centerIcon?: IconType;
    className?: string;
    rotationDuration?: number;
    fontSize?: number;
}

const RotatingButton: React.FC<RotatingButtonProps> = ({
    texts,
    delimiters = ["✦"],
    size = 120,
    variant = "default",
    href,
    onClick = () => {},
    centerIcon,
    className = "",
    rotationDuration = 10,
    fontSize = 14,
}) => {
    texts = texts.map((text) => text.toUpperCase());
    const [pathId] = useState(
        `circle-path-${Math.random().toString(36).slice(2, 11)}`
    );

    // Calculate the radius based on the size
    const radius = size / 2;
    const innerRadius = radius * 0.65;

    // Path definition for text to follow
    const pathDefinition = `M ${radius}, ${radius} m -${radius * 0.8}, 0 a ${
        radius * 0.8
    },${radius * 0.8} 0 1,1 ${radius * 1.6},0 a ${radius * 0.8},${
        radius * 0.8
    } 0 1,1 -${radius * 1.6},0`;

    // Create text segment with appropriate spacing
    const createTextSegments = () => {
        // Create interleaved segments array
        const segments: string[] = [];
        texts.forEach((text, index) => {
            segments.push(text);
            if (index < texts.length - 1 || true) {
                // Always add delimiter
                segments.push(delimiters[index % delimiters.length]);
            }
        });

        // Calculate total text length to determine spacing
        const circumference = 2 * Math.PI * (radius * 0.7);
        const totalTextLength = segments.reduce(
            (acc, segment) => acc + segment.length,
            0
        );

        // Calculate the empty space available for distribution
        const emptySpace = circumference - totalTextLength * fontSize * 0.5; // Approximate char width
        const spaceBetweenSegments = emptySpace / segments.length;

        return segments.map((segment, index) => {
            // Calculate offset based on previous segments and spacing
            let offset = 0;
            for (let i = 0; i < index; i++) {
                offset +=
                    segments[i].length * fontSize * 0.5 + spaceBetweenSegments;
            }

            // Convert to percentage of circumference
            const offsetPercentage = (offset / circumference) * 100;

            return (
                <text key={index} fontSize={fontSize}>
                    <textPath
                        href={`#${pathId}`}
                        startOffset={`${offsetPercentage}%`}
                    >
                        {segment}
                    </textPath>
                </text>
            );
        });
    };

    // Render icon
    const renderIcon = () => {
        if (!centerIcon) return null;

        if (typeof centerIcon === "function") {
            const IconComponent = centerIcon as IconType;
            return <IconComponent size={innerRadius} />;
        }

        return centerIcon;
    };

    // Apply variant-specific styles
    const getVariantClass = () => {
        switch (variant) {
            case "frost":
                return "bg-opacity-10 backdrop-blur-md shadow-md";
            case "raised":
                return "shadow-md hover:shadow-lg";
            case "glow":
                return "bg-theme shadow-[0_0_15px_15px_var(--color-background)] hover:shadow-[0_0_45px_45px_var(--color-background)]";
            default:
                return "";
        }
    };

    // The main button content
    const buttonContent = (
        <motion.div
            className={`group relative inline-flex items-center justify-center rounded-full ${getVariantClass()}`}
            style={{
                width: size,
                height: size,
            }}
        >
            {/* Rotating SVG with text */}
            <motion.svg
                className="absolute inset-0 h-full w-full fill-current group-hover:fill-accent"
                viewBox={`0 0 ${size} ${size}`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: rotationDuration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <defs>
                    <path id={pathId} d={pathDefinition} />
                </defs>
                {createTextSegments()}
            </motion.svg>

            {/* Center circle with icon */}
            <motion.div
                className="absolute flex items-center justify-center rounded-full"
                style={{
                    width: innerRadius * 2,
                    height: innerRadius * 2,
                    top: radius - innerRadius,
                    left: radius - innerRadius,
                }}
            >
                {renderIcon()}
            </motion.div>
        </motion.div>
    );

    // Render the appropriate element based on props
    return (
        <motion.div
            className={`relative inline-flex items-center justify-center rounded-full ${className}`}
            whileHover={{
                color: "var(--color-accent)",
                fill: "var(--color-accent)",
            }}
        >
            {href ? (
                <Link
                    href={href}
                    onClick={onClick}
                    className="flex items-center justify-center focus:outline-none"
                    aria-label={texts[0] || "Rotating button"}
                >
                    {buttonContent}
                </Link>
            ) : onClick ? (
                <button
                    type="button"
                    onClick={onClick}
                    className="flex items-center justify-center focus:outline-none"
                    aria-label={texts[0] || "Rotating button"}
                >
                    {buttonContent}
                </button>
            ) : (
                <div
                    className="flex items-center justify-center focus:outline-none"
                    aria-label={texts[0] || "Rotating element"}
                >
                    {buttonContent}
                </div>
            )}
        </motion.div>
    );
};

export default RotatingButton;
