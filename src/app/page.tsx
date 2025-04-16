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
import DateTimePlace from "@/components/ui/DateTimePlace";
import { useTheme } from "@/components/ThemeProvider";
import { COLORS } from "@/lib/theme";
import { motion } from "framer-motion";

export default function Home() {
    const { theme } = useTheme();
    return (
        <motion.div
            className="max-w-screen overflow-clip"
            style={{
                backgroundColor: COLORS.BACKGROUND[theme],
                color: COLORS.TEXT[theme],
            }}
        >
            <Navbar />
            <main className="flex flex-col items-center justify-center relative">
                <DateTimePlace />
                <ThemeSwitch />
                <HeroSection />
                <Critter
                    size={1}
                    legs={8}
                    tail={20}
                    color={COLORS.TEXT[theme]}
                    className="opacity-50"
                />
                <ProjectsSection />
                <WorkSection />
                <ContactSection />

                <Footer />
            </main>
        </motion.div>
    );
}
