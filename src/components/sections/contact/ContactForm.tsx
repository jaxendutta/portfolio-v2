// src/components/sections/contact/ContactForm.tsx
"use client";

import React, { useState } from "react";
import Form from "next/form";
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
            className={"flex w-full border-t border-current p-4"}
            whileHover={{
                backgroundColor: "var(--color-highlight-bg)",
                color: "var(--color-highlight-text)",
            }}
            whileFocus={{
                backgroundColor: "var(--color-highlight-bg)",
                color: "var(--color-highlight-text)",
            }}
        >
            {React.createElement(type === "textarea" ? "textarea" : "input", {
                id: name,
                name,
                required,
                placeholder,
                value,
                className: "w-full focus:outline-none bg-transparent",
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
            className="flex w-full flex-col justify-center self-center"
            action={async (formData) => {
                const data = Object.fromEntries(formData.entries());
                console.log(data);
            }}
        >
            <div className="flex w-full flex-wrap border-b">
                <div className="flex min-w-[600px] flex-1 flex-col">
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
                <div className="flex min-w-[300px] flex-1">
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

            <div className="flex justify-between gap-4 px-8 py-8 md:px-16">
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
