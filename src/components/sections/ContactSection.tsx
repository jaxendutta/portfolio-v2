"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

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

    const socials = [
        {
            platform: "E-MAIL",
            handle: "jaxendutta[at]gmail.com",
            url: "mailto:jaxendutta@gmail.com",
        },
        {
            platform: "GITHUB",
            handle: "/jaxendutta",
            url: "https://github.com/jaxendutta",
        },
        {
            platform: "LINKEDIN",
            handle: "/jaxen",
            url: "https://www.linkedin.com/in/jaxen/",
        },
        {
            platform: "RÉSUMÉ",
            handle: "",
            url: "https://docs.google.com/gview?url=https://docs.google.com/document/d/11mhUfmYKXO7jPN1rP6znr2B5zCl0hlrE0pKqAU2lKtU/export?format=pdf",
        },
    ];

    return (
        <section id="contact" className="relative">
            <SectionHeader title="CONTACT" />

            <div className="my-20 flex flex-col items-center">
                <div className="w-[90vw] flex flex-col items-center justify-center self-center">
                    <div className="w-full flex flex-col items-center justify-center counter-reset-[social-counter]">
                        {socials.map((social, index) => (
                            <div key={social.platform} className="w-full">
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener"
                                    className={`self-center w-[88vw] outline-none font-mono h-[1.2em] text-4xl text-[#F4F1EA] no-underline flex flex-row justify-between items-center border-b border-b-[#F4F1EA] transition-all duration-300 ease-in-out bg-transparent p-2 ${
                                        index === socials.length - 1
                                            ? "border-b-0"
                                            : ""
                                    } hover:bg-[darkblue]`}
                                >
                                    <div className="flex items-center">
                                        <div className="mr-2 before:content-[counter(social-counter,decimal-leading-zero)] before:counter-increment-[social-counter]">
                                            {(index + 1)
                                                .toString()
                                                .padStart(2, "0")}
                                            .
                                        </div>
                                        <div className="text-lg md:text-4xl">
                                            {social.platform}
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center gap-2 text-xs md:text-xl">
                                        <span className="hidden md:inline">
                                            {social.handle}
                                        </span>
                                        <FaArrowRightLong className="w-4 h-4 text-[#F4F1EA]" />
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

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

            <footer className="font-sans w-screen h-10 mt-[10%] text-center self-center text-[#F4F1EA] uppercase">
                Jaxen Anirban Dutta //
            </footer>
        </section>
    );
}
