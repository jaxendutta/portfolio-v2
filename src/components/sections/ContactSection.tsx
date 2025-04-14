"use client";

import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { Social, socials } from "@/data/contactData";
import Marquee from "react-fast-marquee";

const SocialItem = ({ item, index }: { item: Social; index: number }) => {
    return (
        <Link
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full p-4 font-mono text-3xl md:text-4xl text-[#F4F1EA] hover:bg-[darkblue]
                flex flex-row justify-between items-center
                border-b border-[#F4F1EA] hover:text-[palegreen]
                transition-all duration-300 ease-in-out`}
        >
            <div className="flex items-center gap-4">
                <span>{`${(index + 1).toString().padStart(2, "0")}.`}</span>
                <span>{item.platform}</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-2xl opacity-60">
                <span>{item.handle}</span>
                <div className="w-[1em] h-[1.5em] flex items-center gap-6 text-2xl overflow-clip">
                    <Marquee
                        direction="right"
                        speed={20}
                        loop={0}
                        autoFill={true}
                        pauseOnHover={true}
                        className="flex items-center px-2"
                    >
                        <FaArrowRightLong className="px-1.5" />
                    </Marquee>
                </div>
            </div>
        </Link>
    );
};

const SocialItems = ({ socials }: { socials: Social[] }) => {
    return (
        <div className="w-full p-[5vw] flex flex-col items-center justify-center self-center">
            {socials.map((social, index) => (
                <SocialItem key={index} item={social} index={index} />
            ))}
        </div>
    );
};

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        linkedin: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitResult(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitResult({
                    success: true,
                    message: "Message sent successfully!",
                });
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    linkedin: "",
                    message: "",
                });
            } else {
                const errorData = await response.json();
                setSubmitResult({
                    success: false,
                    message:
                        errorData.message ||
                        "Failed to send message. Please try again.",
                });
            }
        } catch (error) {
            setSubmitResult({
                success: false,
                message: "An error occurred. Please try again.",
            });
            console.error("Error sending message:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Section sectionHeaderProps={{ title: "CONTACT" }} >
            <SocialItems socials={socials} />

            <div className="my-20 flex flex-col items-center">
                <div className="w-[90vw] flex flex-col items-center justify-center self-center">
                    <div className="w-full flex flex-col items-center justify-center counter-reset-[social-counter]"></div>

                    <motion.div
                        className="outline-none font-majorMono text-5xl text-[#D7482F] text-center my-10 inline-block"
                        animate={{
                            fontWeight: [100, 500, 700, 500, 100],
                            fontStyle: ["normal", "italic", "normal"],
                            textTransform: [
                                "none",
                                "uppercase",
                                "lowercase",
                                "none",
                            ],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "linear", // Changed from steps(50) to linear
                        }}
                    >
                        or buzz me right here.
                    </motion.div>

                    <div className="p-0 flex flex-col justify-center self-center w-[90vw] overflow-x-hidden">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col overflow-x-hidden"
                        >
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="01. NAME"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-none border-t border-t-[#F4F1EA] border-l-0 border-r-0 border-b-0 bg-transparent outline-none font-mono text-4xl text-[#F4F1EA] h-16 transition-all duration-300 ease-in-out hover:bg-[darkblue] hover:text-[palegreen] focus:bg-[darkblue] focus:text-[palegreen]"
                            />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="02. E-MAIL"
                                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-none border-t border-t-[#F4F1EA] border-l-0 border-r-0 border-b-0 bg-transparent outline-none font-mono text-4xl text-[#F4F1EA] h-16 transition-all duration-300 ease-in-out hover:bg-[darkblue] hover:text-[palegreen] focus:bg-[darkblue] focus:text-[palegreen]"
                            />

                            <input
                                id="linkedin"
                                name="linkedin"
                                type="url"
                                placeholder="03. LINKEDIN"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="w-full rounded-none border-t border-t-[#F4F1EA] border-l-0 border-r-0 border-b-0 bg-transparent outline-none font-mono text-4xl text-[#F4F1EA] h-16 transition-all duration-300 ease-in-out hover:bg-[darkblue] hover:text-[palegreen] focus:bg-[darkblue] focus:text-[palegreen]"
                            />

                            <textarea
                                id="message"
                                name="message"
                                required
                                placeholder="04. MESSAGE"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full rounded-none border-t border-t-[#F4F1EA] border-l-0 border-r-0 border-b-0 bg-transparent outline-none font-mono text-4xl text-[#F4F1EA] h-[30vh] transition-all duration-300 ease-in-out hover:bg-[darkblue] hover:text-[palegreen] focus:bg-[darkblue] focus:text-[palegreen]"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer w-full border-t border-b border-t-[#F4F1EA] border-b-[#F4F1EA] border-l-0 border-r-0 self-center text-[#F4F1EA] hover:text-[#D7482F] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "SENDING..." : "SEND"}
                            </button>

                            {submitResult && (
                                <div
                                    className={`mt-4 p-2 text-center ${
                                        submitResult.success
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {submitResult.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Section>
    );
}
