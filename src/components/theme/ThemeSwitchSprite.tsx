// src/components/ui/ThemeSwitchSprite.tsx
"use client";

import { useState, useEffect } from "react";
import { IconType } from "react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import { LuSunMoon, LuWorm, LuX } from "react-icons/lu";
import { FaQuestion, FaExclamation } from "react-icons/fa";
import { RiFontSizeAi } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { PiSpeedometer } from "react-icons/pi";
import Sprite from "@/components/theme/Sprite";
import { COLORS, ColorSet } from "@/lib/theme";
import { BsChevronDown } from "react-icons/bs";

type BaseSettingTemplateProps = {
    title: string;
    subtitle?: string;
    icon?: IconType;
    theme: keyof ColorSet;
};

type ToggleSettingTemplateProps = BaseSettingTemplateProps & {
    type: "toggle";
    isChecked: boolean;
    onToggle: () => void;
};

type SliderSettingTemplateProps = BaseSettingTemplateProps & {
    type: "slider";
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    minLabel?: React.ReactNode;
    maxLabel?: React.ReactNode;
};

type DropdownSettingTemplateProps = BaseSettingTemplateProps & {
    type: "dropdown";
    options: { label: string; value: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
};

type SettingTemplateProps =
    | ToggleSettingTemplateProps
    | SliderSettingTemplateProps
    | DropdownSettingTemplateProps;

const SettingTemplate = (props: SettingTemplateProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { title, subtitle, icon, theme, type } = props;

    return (
        <div
            className={twMerge(
                "flex items-center justify-between gap-2 mb-2",
                type === "slider" ? "flex-col" : "flex-row"
            )}
        >
            <div className="w-full">
                <div className="flex items-center gap-2 text-lg font-medium">
                    {icon && icon({})}
                    {title}
                </div>
                <span className="flex text-xs text-gray-500 dark:text-gray-400">
                    {subtitle}
                </span>
            </div>
            {(() => {
                switch (type) {
                    case "toggle":
                        return (
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={props.isChecked}
                                    onChange={props.onToggle}
                                    aria-label={title}
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                            </label>
                        );
                    case "slider":
                        return (
                            <div className="flex flex-col w-full">
                                <input
                                    type="range"
                                    min={props.min || 0}
                                    max={props.max || 100}
                                    value={props.value}
                                    onChange={(e) =>
                                        props.onChange(Number(e.target.value))
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    aria-label={title}
                                />
                                <div className="flex justify-between text-xs mt-1">
                                    <span>
                                        {props.minLabel || props.min || 0}
                                    </span>
                                    <span>
                                        {props.maxLabel || props.max || 100}
                                    </span>
                                </div>
                            </div>
                        );
                    case "dropdown":
                        return (
                            <div className="relative w-full text-sm">
                                <button
                                    type="button"
                                    className="w-full p-3 border-1 focus:outline-none appearance-none rounded-none flex justify-between items-center"
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    aria-label={title}
                                >
                                    {props.options.find(
                                        (option) =>
                                            option.value === props.selectedValue
                                    )?.label || "Select an option"}
                                    <BsChevronDown
                                        className={`w-5 h-5 transition-transform ${
                                            dropdownOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.ul
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto" }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute w-full backdrop-blur-lg border rounded-none shadow-lg z-10"
                                        >
                                            {props.options.map((option) => (
                                                <motion.li
                                                    key={option.value}
                                                    className="p-3 cursor-pointer"
                                                    onClick={() => {
                                                        props.onChange(
                                                            option.value
                                                        );
                                                        setDropdownOpen(false);
                                                    }}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    whileHover={{
                                                        backgroundColor:
                                                            COLORS.HIGHLIGHT_BG[
                                                                theme
                                                            ],
                                                        color: COLORS
                                                            .HIGHLIGHT_TEXT[
                                                            theme
                                                        ],
                                                    }}
                                                >
                                                    {option.label}
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    default:
                        return null;
                }
            })()}
        </div>
    );
};

const SpeechBubble = ({ content }: { content: React.ReactNode }) => (
    <motion.div
        className="flex items-center justify-center" // Center the speech bubble
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ duration: 0.2 }}
    >
        <div className="relative bg-white rounded-xl border-1 px-4 py-3 mix-blend-difference">
            <div className="flex items-center justify-center text-lg">
                {content}
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white border-r-1 border-b-1 rotate-45 -z-10" />
        </div>
    </motion.div>
);

interface ThemeSwitchSpriteProps {
    className?: string;
}

// Fix for ThemeSwitchSprite.tsx
// In ThemeSwitchSprite.tsx
export default function ThemeSwitchSprite({
    className = "",
}: ThemeSwitchSpriteProps) {
    const [showModal, setShowModal] = useState(false);
    const [speechState, setSpeechState] = useState<
        "exclamation" | "ellipsis" | "question" | "none"
    >("exclamation");
    const [showBug, setShowBug] = useState(true);

    // Cycle speech bubble state randomly, ensuring it doesn't repeat the same state consecutively
    useEffect(() => {
        if (showModal) return;

        let previousState: "exclamation" | "ellipsis" | "question" | "none" =
            "none";

        const interval = setInterval(() => {
            setSpeechState(() => {
                const states: Array<
                    "exclamation" | "ellipsis" | "question" | "none"
                > = ["exclamation", "ellipsis", "question", "none"];
                const filteredStates = states.filter(
                    (state) => state !== previousState
                );
                const randomIndex = Math.floor(
                    Math.random() * filteredStates.length
                );
                const nextState = filteredStates[randomIndex];
                previousState = nextState;
                return nextState;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [showModal]);

    // Bug visibility handling remains the same
    useEffect(() => {
        const critterElement = document.querySelector(
            ".fixed > canvas"
        ) as HTMLElement;
        if (critterElement) {
            critterElement.style.display = showBug ? "block" : "none";
        }

        localStorage.setItem("showBug", showBug.toString());
    }, [showBug]);

    useEffect(() => {
        const savedShowBug = localStorage.getItem("showBug");
        if (savedShowBug !== null) {
            setShowBug(savedShowBug === "true");
        }
    }, []);

    // The speech content function remains the same
    const renderSpeechContent = () => {
        switch (speechState) {
            case "exclamation":
                return (
                    <FaExclamation className="animate-bounce text-red-500" />
                );
            case "ellipsis":
                return (
                    <div className="flex gap-1 items-center justify-center bg-transparent">
                        {[0, 0.2, 0.4].map((delay) => (
                            <motion.span
                                key={delay}
                                className="w-1 h-1 border border-gray-500 rounded-full bg-gray-500 relative"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay,
                                }}
                            />
                        ))}
                    </div>
                );
            case "question":
                return <FaQuestion className="animate-pulse text-blue-500" />;
            case "none":
            default:
                return null;
        }
    };

    return (
        <>
            {/* Fixed positioning wrapper with proper clickable area */}
            <motion.div
                className={twMerge(
                    "fixed bottom-4 right-2 z-50 cursor-pointer flex flex-col items-center gap-1",
                    className
                )}
                onClick={() => setShowModal(true)}
            >
                {/* Speech bubble */}
                {speechState !== "none" && (
                    <AnimatePresence>
                        <SpeechBubble content={renderSpeechContent()} />
                    </AnimatePresence>
                )}

                {/* Adjust the sprite to fit within this container */}
                <Sprite scale={2} />
            </motion.div>

            {/* Important: Render the modal when showModal is true */}
            <AnimatePresence>
                {showModal && (
                    <SettingsModal
                        onClose={() => setShowModal(false)}
                        showBug={showBug}
                        setShowBug={setShowBug}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

interface SettingsModalProps {
    onClose: () => void;
    showBug: boolean;
    setShowBug: (value: boolean) => void;
}

function SettingsModal({ onClose, showBug, setShowBug }: SettingsModalProps) {
    const { theme, toggleTheme } = useTheme();
    const themeList = Object.keys(COLORS.BACKGROUND) as Array<
        keyof typeof COLORS.BACKGROUND
    >;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="flex flex-col gap-4 rounded-xl max-w-md w-full p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: COLORS.BACKGROUND[theme],
                    color: COLORS.TEXT[theme],
                }}
            >
                {/* Modal header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-bold">Settings</div>
                    <button
                        type="button"
                        aria-label="Close settings modal"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <LuX className="w-6 h-6" />
                    </button>
                </div>

                <SettingTemplate
                    title="Theme"
                    subtitle="Switch between themes"
                    icon={LuSunMoon}
                    theme={theme}
                    type="dropdown"
                    options={themeList.map((theme) => ({
                        label:
                            theme.charAt(0).toUpperCase() +
                            theme.slice(1).toLowerCase(),
                        value: theme,
                    }))}
                    selectedValue={theme}
                    onChange={(value) => toggleTheme(value as keyof ColorSet)}
                />

                {/* Bug visibility toggle */}
                <SettingTemplate
                    title="Critter"
                    subtitle="Shun away the critter on the page"
                    icon={LuWorm}
                    theme={theme}
                    type="toggle"
                    isChecked={showBug}
                    onToggle={() => setShowBug(!showBug)}
                />

                {/* Text Size */}
                <SettingTemplate
                    title="Text Size"
                    icon={RiFontSizeAi}
                    theme={theme}
                    type="slider"
                    value={3}
                    min={1}
                    max={5}
                    minLabel={<span className="text-xs">A</span>}
                    maxLabel={<span className="text-xl">A</span>}
                    onChange={(value) =>
                        console.log("Text size changed to:", value)
                    }
                />

                {/* Animation speed */}
                <SettingTemplate
                    title="Animation Speed"
                    icon={PiSpeedometer}
                    theme={theme}
                    type="slider"
                    value={3}
                    min={1}
                    max={5}
                    minLabel="Slow"
                    maxLabel="Fast"
                    onChange={(value) =>
                        console.log("Animation speed changed to:", value)
                    }
                />
            </motion.div>
        </motion.div>
    );
}
