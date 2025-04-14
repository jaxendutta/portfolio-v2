"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import RotatingButton from "@/components/ui/RotatingButton";
import { contactFormFields } from "@/data/contactData";
import { GiFloorHatch, GiHandTruck } from "react-icons/gi";

export const Input: React.FC<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
        type?: string;
    }
> = ({ name, type, required, placeholder, value, onChange, ...rest }) => {
    return type === "textarea" ? (
        <textarea
            name={name}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={twMerge(
                `w-full p-4 border-t border-t-[#F4F1EA] text-[#F4F1EA]
                hover:bg-[darkblue] hover:text-[palegreen] focus:bg-[darkblue] focus:text-[palegreen]
                transition-all duration-300 ease-in-out h-32 border-b border-b-[#F4F1EA]`
            )}
            cols={50}
            rows={20}
            {...rest}
        />
    ) : (
        <input
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={twMerge(
                `w-full p-4 border-t border-t-[#F4F1EA] text-[#F4F1EA]
                hover:bg-[darkblue] hover:text-[palegreen] focus:bg-[darkblue] focus:text-[palegreen]
                transition-all duration-300 ease-in-out h-16`
            )}
            {...rest}
        />
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

                <div className="flex justify-between gap-4 px-8 md:px-16 py-4">
                    <RotatingButton
                        className="w-full mt-4"
                        size={100}
                        rotationDuration={10}
                        centerIcon={<GiFloorHatch />}
                        texts={["CLEAR", "RESET", "RESTART"]}
                        type="reset"
                        onClick={() => setFormData(emptyForm)}
                    />
                    <RotatingButton
                        className="w-full mt-4"
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