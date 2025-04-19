"use client";

import React, { useState } from "react";
import Form from "next/form";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import RotatingButton from "@/components/ui/RotatingButton";
import { contactFormFields } from "@/data/contactData";
import { GiFloorHatch, GiHandTruck } from "react-icons/gi";
import { THEME_COLORS } from "@/lib/theme";
import { useTheme } from "@/components/theme/ThemeProvider";

export const Input: React.FC<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
        type?: string;
    }
> = ({ name, type, required, placeholder, value, onChange, ...rest }) => {
    const { theme } = useTheme();
    return (
        <motion.div
            className={twMerge("flex w-full p-4 border-t border-theme-text")}
            initial={{
                background: "transparent",
                color: "currentColor",
            }}
            whileHover={{
                background: THEME_COLORS.highlight.bg[theme],
                color: THEME_COLORS.highlight.text[theme],
            }}
            whileFocus={{
                background: THEME_COLORS.highlight.bg[theme],
                color: THEME_COLORS.highlight.text[theme],
            }}
        >
            {React.createElement(type === "textarea" ? "textarea" : "input", {
                id: name,
                name,
                required,
                placeholder,
                value,
                className: "w-full focus:outline-none",
                onChange,
                ...(type === "textarea" ? { rows: 10 } : {}),
                ...rest,
            })}
        </motion.div>
    );
};

export const ContactForm: React.FC = () => {
    const emptyForm = {
        name: "",
        email: "",
        linkedin: "",
        message: "",
    };
    const [formData, setFormData] = useState(emptyForm);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData(emptyForm);
        // remove focus from inputs
        const inputs = document.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            (input as HTMLInputElement | HTMLTextAreaElement).blur();
        });
    };

    return (
        <Form
            className="flex flex-col justify-center self-center w-full"
            action={async (formData) => {
                const data = Object.fromEntries(formData.entries());
                console.log(data);
            }}
        >
            <div className="flex w-full border-b flex-wrap">
                <div className="flex flex-1 flex-col min-w-[600px]">
                    {contactFormFields.map((field, index) => {
                        const { name, type, required } = field;
                        return (
                            <Input
                                key={index}
                                name={name}
                                type={type}
                                required={required}
                                placeholder={`${(index + 1)
                                    .toString()
                                    .padStart(2, "0")}. ${name.toUpperCase()}`}
                                value={formData[name as keyof typeof formData]}
                                onChange={handleChange}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-1 min-w-[300px]">
                    <Input
                        key={contactFormFields.length}
                        name={"message"}
                        type={"textarea"}
                        required={true}
                        placeholder={`${(contactFormFields.length + 1)
                            .toString()
                            .padStart(2, "0")}. ${"message".toUpperCase()}`}
                        value={formData["message"]}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex justify-between gap-4 px-8 md:px-16 py-8">
                <RotatingButton
                    size={100}
                    rotationDuration={10}
                    centerIcon={<GiFloorHatch />}
                    texts={["CLEAR", "RESET", "RESTART"]}
                    type="reset"
                    onClick={handleReset}
                />
                <RotatingButton
                    size={100}
                    rotationDuration={10}
                    centerIcon={<GiHandTruck />}
                    texts={["SEND", "SUBMIT", "POST"]}
                    type="submit"
                />
            </div>
        </Form>
    );
};

export default ContactForm;
