// src/app/page.tsx
"use client";

import ContactSection from "@/components/sections/contact/ContactSection";
import Hero from "@/components/layout/Hero";
import ProjectsSection from "@/components/sections/project/ProjectsSection";
import WorkSection from "@/components/sections/work/WorkSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BottomBar from "@/components/layout/BottomBar";

export default function Home() {
    return (
        <div className="max-w-screen min-h-screen overflow-clip">
            <Navbar />
            <BottomBar />
            <main className="flex flex-col items-center justify-center relative">
                <Hero />
                <ProjectsSection />
                <WorkSection />
                <ContactSection />
                <Footer />
            </main>
        </div>
    );
}
