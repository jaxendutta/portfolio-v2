import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import { twMerge } from "tailwind-merge";

interface DividerProps {
    text: string;
    rows?: number;
    direction?: "left" | "right" | "alternate";
    tilt?: number;
    fontClass?: string;
    className?: string;
}

// Row component to handle hooks properly
const DividerRow: React.FC<{
    index: number;
    text: string;
    direction: "left" | "right" | "alternate";
    tilt: number;
    fontClass?: string;
    scrollY: MotionValue<number>;
}> = ({ index, text, direction, tilt, fontClass, scrollY }) => {
    // Determine direction for this row
    let rowDirection: "left" | "right";

    if (direction === "alternate") {
        rowDirection = index % 2 === 0 ? "left" : "right";
    } else {
        rowDirection = direction;
    }

    // Create unique transformations for each row for varied effect
    const rowTilt = useTransform(
        scrollY,
        [0, 1000],
        [0, rowDirection === "left" ? -tilt : tilt]
    );

    const translateX = useTransform(
        scrollY,
        [0, 3000],
        [0, rowDirection === "left" ? -500 : 500]
    );

    const skewX = useTransform(
        scrollY,
        [0, 1000],
        [0, rowDirection === "left" ? -8 : 8]
    );

    // Different scale effect for each row
    const scaleVariation = 0.05 * (index % 3);
    const scale = useTransform(
        scrollY,
        [0, 1000, 2000, 3000],
        [1, 1 - scaleVariation, 1 + scaleVariation, 1]
    );

    // Add a slight rotate effect based on row index
    const rotate = useTransform(
        scrollY,
        [0, 2000],
        [0, ((index % 3) - 1) * tilt]
    );

    // Spring physics for smoother animations
    const springConfig = { damping: 15, stiffness: 100 };
    const smoothTilt = useSpring(rowTilt, springConfig);
    const smoothTranslateX = useSpring(translateX, springConfig);
    const smoothSkewX = useSpring(skewX, springConfig);
    const smoothScale = useSpring(scale, springConfig);
    const smoothRotate = useSpring(rotate, springConfig);

    return (
        <motion.div
            key={index}
            style={{
                rotate: smoothRotate,
                translateX: smoothTranslateX,
                skewX: smoothSkewX,
                scale: smoothScale,
            }}
            className={`relative py-1 ${index % 2 !== 0 ? "-mt-2" : ""}`}
        >
            <motion.p
                className={twMerge(
                    "whitespace-nowrap text-xl text-center m-0 border-t border-b border-current py-1 px-0 text-gray-400/80",
                    fontClass
                )}
                style={{
                    rotate: smoothTilt,
                }}
            >
                {/* Repeat the text to ensure it fills the container */}
                {Array(10).fill(text).join(" == ")}
            </motion.p>
        </motion.div>
    );
};

const Divider: React.FC<DividerProps> = ({
    text,
    rows = 3,
    direction = "alternate",
    tilt = 2,
    fontClass = "font-mono",
    className,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Create an array of row indices
    const rowIndices = Array.from({ length: rows }, (_, i) => i);

    return (
        <div
            ref={containerRef}
            className={twMerge("w-full overflow-hidden", className)}
        >
            {rowIndices.map((index) => (
                <DividerRow
                    key={index}
                    index={index}
                    text={text}
                    direction={direction}
                    tilt={tilt}
                    fontClass={fontClass}
                    scrollY={scrollY}
                />
            ))}
        </div>
    );
};
export default Divider;
