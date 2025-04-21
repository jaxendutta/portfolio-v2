// src/components/sections/contact/ContactForm.tsx
"use client";

import { useState, createElement, useRef } from "react";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import RotatingButton from "@/components/ui/RotatingButton";
import { contactFormFields } from "@/data/contactData";
import { GiFloorHatch, GiHandTruck } from "react-icons/gi";
import { sendEmail } from "@/app/actions";

export const Input: React.FC<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
        type?: string;
    }
> = ({ name, type, required, placeholder, value, onChange, ...rest }) => {
    return (
        <div className="flex w-full">
            {createElement(
                (type === "textarea"
                    ? motion.textarea
                    : motion.input) as React.ElementType,
                {
                    id: name,
                    name,
                    required,
                    placeholder: `${placeholder}${required ? "*" : ""}`,
                    value,
                    className:
                        "flex w-full border-t border-current p-4 focus:outline-none bg-transparent",
                    whileHover: {
                        backgroundColor: "var(--color-highlight-bg)",
                        color: "var(--color-highlight-text)",
                    },
                    whileFocus: {
                        backgroundColor: "var(--color-highlight-bg)",
                        color: "var(--color-highlight-text)",
                    },
                    onChange,
                    ...(type === "textarea" ? { rows: 10 } : {}),
                    ...rest,
                }
            )}
        </div>
    );
};

export const ContactForm: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        linkedin: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            linkedin: "",
            message: "",
        });
        // remove focus from inputs
        const inputs = document.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
            (input as HTMLInputElement | HTMLTextAreaElement).blur();
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");

        // Validation check
        if (!formRef.current?.checkValidity()) {
            console.log("Form validation failed");
            formRef.current?.reportValidity();
            return;
        }

        setIsSubmitting(true);

        try {
            const formDataObj = new FormData(formRef.current!);
            console.log(
                "Submitting form with data:",
                Object.fromEntries(formDataObj.entries())
            );

            const result = await sendEmail(formDataObj);
            console.log("Server action response:", result);

            if (result.success) {
                toast.success(result.message || "Message sent successfully!");
                handleReset();
            } else {
                if (result.errors) {
                    Object.entries(result.errors.fieldErrors).forEach(
                        ([field, errors]) => {
                            if (errors && errors.length > 0) {
                                toast.error(`${field}: ${errors[0]}`);
                            }
                        }
                    );
                } else {
                    toast.error(result.message || "Failed to send message");
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" richColors />
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex w-full flex-col justify-center self-center"
            >
                <div className="flex w-full flex-wrap border-b">
                    <div className="flex min-w-[400px] flex-1 flex-col">
                        {contactFormFields.map((field, index) => {
                            const { name, type, required } = field;
                            return (
                                <Input
                                    key={index}
                                    name={name as string}
                                    type={type}
                                    required={required}
                                    placeholder={`${(index + 1)
                                        .toString()
                                        .padStart(
                                            2,
                                            "0"
                                        )}. ${(name as string).toUpperCase()}`}
                                    value={
                                        formData[name as keyof typeof formData]
                                    }
                                    onChange={handleChange}
                                />
                            );
                        })}
                    </div>
                    <div className="flex min-w-[400px] flex-1">
                        <Input
                            key={contactFormFields.length}
                            name="message"
                            type="textarea"
                            required={true}
                            placeholder={`${(contactFormFields.length + 1)
                                .toString()
                                .padStart(2, "0")}. MESSAGE`}
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-between gap-4 px-8 py-8 md:px-16">
                    <RotatingButton
                        size={100}
                        rotationDuration={10}
                        centerIcon={GiFloorHatch}
                        texts={["CLEAR", "RESET", "RESTART"]}
                        type="button" // Change to button type
                        onClick={handleReset}
                    />
                    <RotatingButton
                        size={100}
                        rotationDuration={isSubmitting ? 5 : 10}
                        centerIcon={GiHandTruck}
                        texts={
                            isSubmitting
                                ? ["SENDING..", "SUBMITTING.."]
                                : ["SEND", "SUBMIT", "POST"]
                        }
                        type="submit"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </>
    );
};

export default ContactForm;
