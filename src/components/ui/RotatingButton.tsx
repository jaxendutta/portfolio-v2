// src/components/ui/RotatingButton.tsx
"use client";

import React, { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { COLORS } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

const variants = (centerBgColor: string) => ({
    default: {},
    frost: {
        backgroundColor: `${centerBgColor}, 0.1)`,
        backdropFilter: "blur(10px)",
        boxShadow: `0 4px 6px ${centerBgColor}, 0.5)`,
        ":hover": {
            boxShadow: "0 4px 6px rgba(var(--theme-color), 0.3)",
        },
    },
    raised: {
        boxShadow: `0 4px 6px ${centerBgColor}, 0.2)`,
        transition: "box-shadow 0.3s ease",
        ":hover": {
            boxShadow: `0 4px 6px ${centerBgColor}, 0.3)`,
        },
    },
    glow: {
        boxShadow: `0 0 15px 15px ${centerBgColor}`,
        ":hover": {
            boxShadow: `0 0 45px 45px ${centerBgColor}`,
        },
    },
});

export interface RotatingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    texts: string[];
    delimiters?: string[];
    size?: number;
    variant?: keyof ReturnType<typeof variants>;
    href?: string;
    onClick?: () => void;
    centerIcon?: ReactNode | IconType;
    className?: string;
    rotationDuration?: number;
    fontSize?: number;
    centerBgColor?: string;
    hoverCenterBgColor?: string;
}

const RotatingButton: React.FC<RotatingButtonProps> = ({
    texts,
    delimiters = ["✦"],
    size = 120,
    variant = "default",
    href,
    onClick,
    centerIcon,
    className = "",
    rotationDuration = 10,
    fontSize = 14,
    centerBgColor = "transparent",
    hoverCenterBgColor = centerBgColor,
}) => {
    const { theme } = useTheme();

    texts = texts.map((text) => text.toUpperCase());
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
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

    // Create text segment with appropriate spacing - using the original calculation
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
                <text
                    key={index}
                    fontSize={fontSize}
                    fill={isHovered ? COLORS.ACCENT[theme] : COLORS.TEXT[theme]}
                    className="transition-all duration-300 ease-in-out"
                >
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
            return <IconComponent size={innerRadius * 0.8} />;
        }

        return centerIcon;
    };

    // The main button content
    const buttonContent = (
        <motion.div
            ref={containerRef}
            className={twMerge(
                "relative inline-flex items-center justify-center rounded-full cursor-pointer"
            )}
            style={{
                width: size,
                height: size,
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Rotating SVG with text */}
            <motion.svg
                className="absolute inset-0 w-full h-full"
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
                    color: isHovered
                        ? COLORS.ACCENT[theme]
                        : COLORS.TEXT[theme],
                    transition: "color 0.3s ease",
                }}
            >
                {renderIcon()}
            </motion.div>
        </motion.div>
    );

    // Render the appropriate element based on props
    return (
        <motion.div
            className={twMerge(
                "relative inline-flex items-center justify-center rounded-full cursor-pointer",
                className
            )}
            style={{
                backgroundColor: isHovered ? hoverCenterBgColor : centerBgColor,
                ...variants(centerBgColor)[variant],
            }}
        >
            {href ? (
                <Link
                    href={href}
                    onClick={onClick}
                    className="focus:outline-none flex items-center justify-center"
                    aria-label={texts[0] || "Rotating button"}
                >
                    {buttonContent}
                </Link>
            ) : onClick ? (
                <button
                    type="button"
                    onClick={onClick}
                    className="focus:outline-none flex items-center justify-center"
                    aria-label={texts[0] || "Rotating button"}
                >
                    {buttonContent}
                </button>
            ) : (
                <div
                    className="focus:outline-none flex items-center justify-center"
                    aria-label={texts[0] || "Rotating element"}
                >
                    {buttonContent}
                </div>
            )}
        </motion.div>
    );
};

export default RotatingButton;
