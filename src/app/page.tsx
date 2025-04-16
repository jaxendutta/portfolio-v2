// src/app/page.tsx
"use client";

import ContactSection from "@/components/sections/contact/ContactSection";
import HeroSection from "@/components/layout/HeroSection";
import ProjectsSection from "@/components/sections/project/ProjectsSection";
import WorkSection from "@/components/sections/work/WorkSection";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Critter from "@/components/ui/Critter";
import { useTheme } from "@/components/ThemeProvider";
import { THEME } from "@/lib/theme";

export default function Home() {
    const { theme } = useTheme();
    return (
        <div className="max-w-screen overflow-clip">
            <Navbar />
            <main className="flex flex-col items-center justify-center relative">
                <ThemeSwitch />
                <HeroSection />
                <Critter
                    size={1}
                    legs={8}
                    tail={20}
                    color={
                        theme === "dark"
                            ? THEME.colors["text-dark"]
                            : THEME.colors["text-light"]
                    }
                    className="opacity-50"
                />
                <ProjectsSection />
                <WorkSection />
                <ContactSection />

                <Footer />
            </main>
        </div>
    );
}
