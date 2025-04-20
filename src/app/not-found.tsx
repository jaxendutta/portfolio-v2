// src/app/not-found.tsx
"use client";

import Footer from "@/components/layout/Footer";
import RotatingButton from "@/components/ui/RotatingButton";
import ThemeSwitch from "@/components/theme/ThemeSwitch";
import { motion } from "framer-motion";
import { GiParanoia } from "react-icons/gi";
import DateTimePlace from "@/components/ui/DateTimePlace";

export default function NotFound() {
    return (
        <motion.div className="min-h-screen flex flex-col items-center justify-center p-4 gap-12 text-center">
            <div>
                <div className="text-4xl md:text-6xl">404 - Not Found</div>
            </div>

            <div className="text-lg md:text-xl max-w-md">
                <span>Let&apos;s get you back home.</span>
            </div>

            <RotatingButton
                href="/"
                texts={["Back to", "Home", "Shelter", "Safety"]}
                size={120}
                centerIcon={<GiParanoia className="text-5xl" />}
            />

            <DateTimePlace />
            <ThemeSwitch />

            <Footer />
        </motion.div>
    );
}
