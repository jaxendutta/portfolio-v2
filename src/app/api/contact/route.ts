// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { name, email, linkedin, message } = data;

        // Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Here you would typically send the email using a service like SendGrid, AWS SES, etc.
        // For demonstration purposes, we'll just return a success response

        console.log("Contact form submission:", {
            name,
            email,
            linkedin,
            message,
        });

        // In a real implementation you would send the email here
        // For example with SendGrid:
        // await sendgrid.send({
        //   to: 'your-email@example.com',
        //   from: 'your-website@example.com',
        //   subject: `Contact form submission from ${name}`,
        //   text: `
        //     Name: ${name}
        //     Email: ${email}
        //     LinkedIn: ${linkedin || 'Not provided'}
        //     Message: ${message}
        //   `
        // });

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json(
            { message: "An error occurred while processing your request" },
            { status: 500 }
        );
    }
}
