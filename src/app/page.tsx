// src/app/page.tsx
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/project/ProjectsSection";
import WorkSection from "@/components/work/WorkSection";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { Footer } from "@/components/sections/Footer";
import Navbar from "@/components/navigation/Navbar";
import { display } from "@/styles/fonts";

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
                <div className="w-full h-screen flex items-center justify-center text-center">
                    <h2 className={`text-4xl ${display} text-[#F4F1EA]`}>
                        More sections coming...
                    </h2>
                </div>

                {/* Footer */}
                <Footer />
            </main>
        </>
    );
}
