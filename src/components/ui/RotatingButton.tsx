// src/components/ui/RotatingButton.tsx
"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface RotatingButtonProps {
    texts: string[];
    delimiters?: string[];
    size?: number;
    href?: string;
    onClick?: () => void;
    centerIcon?: ReactNode | IconType;
    className?: string;
    rotationDuration?: number;
    fontSize?: number;
    textColor?: string;
    hoverTextColor?: string;
    iconColor?: string;
    hoverIconColor?: string;
    centerBgColor?: string;
    hoverCenterBgColor?: string;
}

const RotatingButton: React.FC<RotatingButtonProps> = ({
    texts,
    delimiters = ["✦"],
    size = 120,
    href,
    onClick,
    centerIcon,
    className = "",
    rotationDuration = 10,
    fontSize = 14,
    textColor = "currentColor",
    hoverTextColor,
    iconColor,
    hoverIconColor,
    centerBgColor,
    hoverCenterBgColor,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [textPaths, setTextPaths] = useState<React.ReactNode[]>([]);

    // Calculate the radius based on the size
    const radius = size / 2;

    // Calculate the inner circle radius (where the icon sits)
    const innerRadius = radius * 0.65;

    // Path definition for text to follow
    const pathDefinition = `M ${radius}, ${radius} m -${radius * 0.8}, 0 a ${
        radius * 0.8
    },${radius * 0.8} 0 1,1 ${radius * 1.6},0 a ${radius * 0.8},${
        radius * 0.8
    } 0 1,1 -${radius * 1.6},0`;

    // Calculate the circumference of the text path circle
    const circumference = 2 * Math.PI * (radius * 0.8);

    useEffect(() => {
        if (!svgRef.current) return;

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
        const totalTextLength = segments.reduce(
            (acc, segment) => acc + segment.length,
            0
        );

        // Calculate the empty space available for distribution
        const emptySpace = circumference - totalTextLength * fontSize * 0.5; // Approximate char width
        const spaceBetweenSegments = emptySpace / segments.length;

        // Create textPath elements with appropriate spacing
        const textPathElements = segments.map((segment, index) => {
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
                    fill={textColor}
                    className={
                        hoverTextColor ? `group-hover:${hoverTextColor}` : ""
                    }
                >
                    <textPath
                        href={`#circle-path-${size}`}
                        startOffset={`${offsetPercentage}%`}
                    >
                        {segment}
                    </textPath>
                </text>
            );
        });

        setTextPaths(textPathElements);
    }, [
        texts,
        delimiters,
        fontSize,
        circumference,
        size,
        textColor,
        hoverTextColor,
    ]);

    // Render the Icon, supporting both ReactNode and IconType
    const renderIcon = () => {
        if (!centerIcon) return null;

        // Check if centerIcon is an IconType from react-icons
        if (typeof centerIcon === "function") {
            const IconComponent = centerIcon as IconType;
            return <IconComponent size={innerRadius * 0.8} />;
        }

        // Otherwise, render it as a ReactNode
        return centerIcon;
    };

    // Animation settings for framer-motion
    const animationSettings = {
        animate: { rotate: 360 },
        transition: {
            duration: rotationDuration,
            repeat: Infinity,
            ease: "linear",
        },
    };

    // The main button content
    const buttonContent = (
        <div
            className={twMerge(
                `relative inline-flex items-center justify-center rounded-full group`,
                `text-[${textColor}]`,
                className
            )}
            style={{ width: size, height: size }}
        >
            {/* Rotating text using SVG */}
            <motion.svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${size} ${size}`}
                {...animationSettings}
            >
                <defs>
                    <path id={`circle-path-${size}`} d={pathDefinition} />
                </defs>
                {textPaths}
            </motion.svg>

            {/* Center circle with icon */}
            <div
                className={twMerge(
                    "absolute flex items-center justify-center rounded-full",
                    hoverIconColor
                        ? `group-hover:text-[${hoverIconColor}]`
                        : "",
                    hoverCenterBgColor
                        ? `group-hover:bg-[${hoverCenterBgColor}]`
                        : "",
                    `t-${radius - innerRadius}px l-${radius - innerRadius}px`,
                    `bg-[${centerBgColor}]`,
                    `text-[${iconColor}]`,
                    `w-${innerRadius * 2}px h-${innerRadius * 2}px`
                )}
            >
                {renderIcon()}
            </div>
        </div>
    );

    // Render as button if onClick is provided
    if (onClick) {
        return (
            <button
                onClick={onClick}
                className="focus:outline-none"
                aria-label={texts[0] || "Rotating button"}
            >
                {buttonContent}
            </button>
        );
    }

    // Render as Link if href is provided
    if (href) {
        return (
            <Link
                href={href}
                className="focus:outline-none"
                aria-label={texts[0] || "Rotating link button"}
            >
                {buttonContent}
            </Link>
        );
    }

    // Fallback to div if neither onClick nor href is provided
    return (
        <div
            className="focus:outline-none"
            aria-label={texts[0] || "Rotating element"}
        >
            {buttonContent}
        </div>
    );
};

export default RotatingButton;
