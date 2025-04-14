// src/app/page.tsx
import ContactSection from "@/components/sections/contact/ContactSection";
import HeroSection from "@/components/layout/HeroSection";
import ProjectsSection from "@/components/sections/project/ProjectsSection";
import WorkSection from "@/components/sections/work/WorkSection";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
    return (
        <div className="max-w-screen overflow-clip">
            <Navbar />
            <main className="flex flex-col items-center justify-center relative">
                <ThemeSwitch />
                <HeroSection />

                <ProjectsSection />
                <WorkSection />
                <ContactSection />

                <Footer />
            </main>
        </div>
    );
}
