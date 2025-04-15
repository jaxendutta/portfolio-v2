"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import RotatingButton from "@/components/ui/RotatingButton";
import { contactFormFields } from "@/data/contactData";
import { GiFloorHatch, GiHandTruck } from "react-icons/gi";

export const Input: React.FC<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
        type?: string;
    }
> = ({ name, type, required, placeholder, value, onChange, ...rest }) => {
    return (
        <motion.div
            className={twMerge(
                "flex p-4 border-t border-theme-text focus:outline-none",
                type === "textarea" ? "border-b" : ""
            )}
            whileHover={{
                background: "var(--color-highlight-bg)",
                color: "var(--color-highlight-text)",
            }}
            whileFocus={{
                background: "var(--color-highlight-bg)",
                color: "var(--color-highlight-text)",
            }}
        >
            {type === "textarea" ? (
                <textarea
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    className="flex-grow focus:outline-none"
                    onChange={onChange}
                    cols={50}
                    rows={10}
                    {...rest}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    className="flex-grow focus:outline-none"
                    onChange={onChange}
                    {...rest}
                />
            )}
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
        <div className="flex flex-col justify-center self-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(formData);
                    // Add your form submission logic here
                }}
            >
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
            </form>
        </div>
    );
};

export default ContactForm;
