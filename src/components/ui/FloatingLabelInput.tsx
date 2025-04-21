// components/ui/FloatingLabelInput.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface FloatingLabelInputProps
    extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    index: number;
    name: string;
    label: string;
    prefix?: string;
    type?: string;
    required?: boolean;
    maxLength?: number;
    showCount?: boolean;
    className?: string;
    value: string;
}

export const FloatingLabelInput = ({
    index,
    name,
    label,
    prefix,
    type = "text",
    required = false,
    maxLength,
    showCount = false,
    className,
    value = "",
    onChange,
    ...props
}: FloatingLabelInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const isActive = isFocused || value.length > 0;
    const indexStr = (index + 1).toString().padStart(2, "0");

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // Create label text that will be displayed
    const labelText = `${indexStr}. ${label.toUpperCase()}${required ? "*" : ""}`;

    return (
        <div className="relative w-full">
            {/* Animating Label */}
            <motion.label
                animate={{
                    y: isActive ? -4 : 24,
                    scale: isActive ? 0.4 : 1,
                    opacity: 1,
                }}
                transition={{
                    type: "tween",
                    duration: 0.2,
                    ease: "easeInOut",
                }}
                className={`absolute px-4 z-10 origin-left pointer-events-none text-3xl ${isActive ? "text-current/70" : "text-current/50"}`}
                htmlFor={name}
            >
                {labelText}
            </motion.label>

            {/* Input Container */}
            <div className="relative flex w-full items-center border-t border-current">
                {/* Optional Prefix */}
                {prefix && isActive && (
                    <span className="pointer-events-none text-current/70 opacity-80">
                        {prefix}
                    </span>
                )}

                {/* Actual Input */}
                {type === "textarea" ? (
                    <textarea
                        id={name}
                        name={name}
                        required={required}
                        value={value}
                        placeholder=""
                        className={twMerge(
                            "flex-1 bg-transparent px-4 py-6 focus:outline-none transition-colors",
                            prefix && isActive && "pl-0",
                            className,
                            "hover:bg-[var(--color-highlight-bg)] hover:text-[var(--color-highlight-text)]",
                            "focus:bg-[var(--color-highlight-bg)] focus:text-[var(--color-highlight-text)]"
                        )}
                        rows={6}
                        maxLength={maxLength}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={onChange}
                        {...props}
                    />
                ) : (
                    <input
                        id={name}
                        name={name}
                        type={type}
                        required={required}
                        value={value}
                        placeholder=""
                        className={twMerge(
                            "flex-1 bg-transparent px-4 py-6 focus:outline-none transition-colors",
                            prefix && isActive && "pl-0",
                            className,
                            "hover:bg-[var(--color-highlight-bg)] hover:text-[var(--color-highlight-text)]",
                            "focus:bg-[var(--color-highlight-bg)] focus:text-[var(--color-highlight-text)]"
                        )}
                        maxLength={maxLength}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={onChange}
                        {...props}
                    />
                )}
            </div>

            {/* Word Count Display */}
            {showCount && maxLength && (
                <div className="mt-1 pr-4 text-right text-xs opacity-60">
                    <span
                        className={
                            value.length > maxLength * 0.9 ? "text-red-500" : ""
                        }
                    >
                        {value.length}
                    </span>
                    <span>/{maxLength}</span>
                </div>
            )}
        </div>
    );
};
