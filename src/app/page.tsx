// src/app/page.tsx
"use client";

import ContactSection from "@/components/sections/contact/ContactSection";
import Hero from "@/components/layout/Hero";
import ProjectsSection from "@/components/sections/project/ProjectsSection";
import WorkSection from "@/components/sections/work/WorkSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import DateTimePlace from "@/components/ui/DateTimePlace";
import ThemeSwitch from "@/components/theme/ThemeSwitch";

export default function Home() {
    return (
        <div className="max-w-screen min-h-screen overflow-clip">
            <Navbar />
            <main className="flex flex-col items-center justify-center relative">
                <DateTimePlace />
                <ThemeSwitch />
                <Hero />
                <ProjectsSection />
                <WorkSection />
                <ContactSection />
                <Footer />
            </main>
        </div>
    );
}
