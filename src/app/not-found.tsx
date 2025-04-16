"use client";

import Footer from "@/components/layout/Footer";
import { useTheme } from "@/components/ThemeProvider";
import Critter from "@/components/ui/Critter";
import RotatingButton from "@/components/ui/RotatingButton";
import { THEME } from "@/lib/theme";

export default function NotFound() {
    const { theme } = useTheme();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <Critter
                size={2}
                legs={8}
                tail={20}
                color={
                    theme === "dark"
                        ? THEME.colors["text-dark"]
                        : THEME.colors["text-light"]
                }
            />

            <div className="text-6xl md:text-8xl mb-6 font-background bg-cover bg-left clip-text">
                404 - Not Found
            </div>

            <div className="text-lg md:text-xl max-w-md mb-12">
                <p>
                    Just like this critter, you were chasing after something unworldly.
                </p>
            </div>

            <RotatingButton
                href="/"
                texts={["Back to", "Home", "Page"]}
                size={120}
            />

            <Footer />
        </div>
    );
}
