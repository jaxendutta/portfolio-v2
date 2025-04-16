"use client";

import Footer from "@/components/layout/Footer";
import { useTheme } from "@/components/ThemeProvider";
import Critter from "@/components/ui/Critter";
import RotatingButton from "@/components/ui/RotatingButton";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/theme";
import { GiParanoia } from "react-icons/gi";
import DateTimePlace from "@/components/ui/DateTimePlace";

export default function NotFound() {
    const { theme } = useTheme();
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center p-4 gap-12 text-center"
            style={{
                backgroundColor: COLORS.BACKGROUND[theme],
                color: COLORS.TEXT[theme],
            }}
        >
            <Critter size={2} legs={8} tail={20} color={COLORS.TEXT[theme]} />

            <div>

                <div className="text-4xl md:text-6xl">
                    404 - Not Found
                </div>
            </div>

            <div className="text-lg md:text-xl max-w-md">
                Just like this critter, you were chasing after something
                unworldly.
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
