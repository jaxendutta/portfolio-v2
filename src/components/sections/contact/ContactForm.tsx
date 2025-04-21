// components/sections/contact/ContactForm.tsx
"use client";

import { useState, useRef } from "react";
import { toast, Toaster } from "sonner";
import RotatingButton from "@/components/ui/RotatingButton";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { GiFloorHatch, GiHandTruck } from "react-icons/gi";
import { sendEmail } from "@/app/actions";

export const ContactForm: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        linkedin: "", // Just the username part
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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
        // Remove focus from inputs
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

            // Replace the LinkedIn value with the full URL
            if (formData.linkedin) {
                formDataObj.set(
                    "linkedin",
                    `https://linkedin.com/in/${formData.linkedin}`
                );
            }

            console.log(
                "Submitting form with data:",
                Object.fromEntries(formDataObj.entries())
            );

            const result = await sendEmail(formDataObj);
            console.log("Server action response:", result);

            if (result.success) {
                toast.success(result.message || "Message sent successfully!");
                setSubmitted(true);
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
                <div className="w-full border-b">
                    <FloatingLabelInput
                        index={0}
                        name="name"
                        label="NAME"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <FloatingLabelInput
                        index={1}
                        name="email"
                        label="EMAIL"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <FloatingLabelInput
                        index={2}
                        name="linkedin"
                        label="LINKEDIN"
                        prefix="LINKEDIN.COM/IN/"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                    <FloatingLabelInput
                        index={3}
                        name="message"
                        label="MESSAGE"
                        type="textarea"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={5000}
                        showCount={true}
                    />
                </div>

                <div className="flex justify-between gap-4 px-8 py-8 md:px-16">
                    <RotatingButton
                        size={100}
                        rotationDuration={10}
                        centerIcon={GiFloorHatch}
                        texts={["CLEAR", "RESET", "RESTART"]}
                        type="button"
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

            {submitted && (
                <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                    <h3 className="mb-2 text-xl font-semibold text-green-700">
                        Thank You!
                    </h3>
                    <p className="text-green-600">
                        Your message has been sent successfully. I will get back
                        to you soon.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                    >
                        Send Another Message
                    </button>
                </div>
            )}

            <div className="mt-4 px-4 text-center text-xs opacity-60">
                Your information will be used only to respond to your inquiry
                and will never be shared with third parties.
            </div>
        </>
    );
};

export default ContactForm;
