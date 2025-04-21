// src/app/actions.ts
"use server";

import { Resend } from "resend";
import { z } from "zod";
import { render } from "@react-email/render";
import ContactEmail from "@/components/emails/ContactEmail";

// Enhanced form validation schema
const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Valid email is required"),
    linkedin: z
        .string()
        .optional()
        .refine(
            (val) =>
                !val ||
                val.startsWith("https://linkedin.com/in/") ||
                val.startsWith("https://www.linkedin.com/in/"),
            {
                message:
                    "LinkedIn URL must be in format: https://linkedin.com/in/username",
            }
        )
        .refine(
            (val) =>
                !val ||
                val.match(
                    /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{3,100}\/?$/
                ),
            {
                message: "LinkedIn URL appears to be invalid",
            }
        ),
    message: z
        .string()
        .min(5, "Message is too short")
        .max(5000, "Message is too long"),
});

export async function sendEmail(formData: FormData) {
    console.log(
        "Server action triggered with:",
        Object.fromEntries(formData.entries())
    );

    // Extract form data
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        linkedin: formData.get("linkedin") || "",
        message: formData.get("message"),
    };

    // Validate form data
    const result = formSchema.safeParse(rawData);

    if (!result.success) {
        console.log("Validation failed:", result.error.flatten());
        return {
            success: false,
            message: "Validation failed",
            errors: result.error.flatten(),
        };
    }

    try {
        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Check for API key
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not set");
            return {
                success: false,
                message: "Email configuration error: API key is missing",
            };
        }

        console.log("Attempting to send email...");

        // Generate HTML email using React Email
        const emailHtml = await render(
            ContactEmail({
                name: result.data.name,
                email: result.data.email,
                linkedin: result.data.linkedin,
                message: result.data.message,
                date: new Date().toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            })
        );

        // Send email
        const { data, error } = await resend.emails.send({
            from: "Contact Form <no-reply@contact.anirban.ca>",
            to: "a9dutta@uwaterloo.ca",
            replyTo: result.data.email,
            subject: `Portfolio Contact: ${result.data.name}`,
            html: emailHtml,
            text: `
Name: ${result.data.name}
Email: ${result.data.email}
${result.data.linkedin ? `LinkedIn: ${result.data.linkedin}` : ""}

Message:
${result.data.message}
      `,
        });

        if (error) {
            console.error("Email sending error details:", error);
            return {
                success: false,
                message: `Failed to send email: ${error.message || JSON.stringify(error)}`,
            };
        }

        console.log("Email sent successfully:", data);
        return {
            success: true,
            message: "Your message has been sent! I'll get back to you soon.",
        };
    } catch (error) {
        console.error("Unexpected error:", error);

        let errorMessage = "An unexpected error occurred";
        if (error instanceof Error) {
            errorMessage += `: ${error.message}`;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
}
