import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Anirban Dutta",
    description:
        "Personal portfolio website for Anirban (Jaxen) Dutta - UX/UI Engineer, HCI Researcher, Web Designer, App Developer",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.png" type="image/png" />
                {/*<link rel="apple-touch-icon" href="/icon.png" />*/}
            </head>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
