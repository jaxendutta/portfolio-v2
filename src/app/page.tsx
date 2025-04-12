// src/app/page.tsx
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WorkSection from "@/components/sections/WorkSection";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center justify-center relative">
                <ThemeSwitch />
                <HeroSection />

                <ProjectsSection />
                <WorkSection />
                <ContactSection />

                {/* Add other sections here */}
                <div className="w-full h-screen flex items-center justify-center">
                    <h2 className="text-4xl font-majorMono text-[#F4F1EA]">
                        More sections coming...
                    </h2>
                </div>
            </main>
        </>
    );
}
