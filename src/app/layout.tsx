import "@/styles/globals.css";
import type { Metadata } from "next";
import { majorMono, firaCode } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import BottomBar from "@/components/layout/BottomBar";

export const metadata: Metadata = {
    title: "Jaxen",
    description:
        "Personal portfolio website for Anirban (Jaxen) Dutta - UX/UI Engineer, HCI Researcher, Web Designer, App Developer",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${majorMono.className} ${firaCode.className}`}
        >
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.png" type="image/png" />
            </head>
            <body className="min-h-screen">
                <Analytics />
                <ThemeProvider>
                    <BottomBar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
