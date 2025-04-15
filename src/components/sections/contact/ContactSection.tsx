"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import SocialItems from "@/components/sections/contact/SocialItem";
import ContactForm from "@/components/sections/contact/ContactForm";
import { socials } from "@/data/contactData";
import { GiLinkedRings, GiQuillInk } from "react-icons/gi";

export default function ContactSection() {
    const [showSocialItems, setShowSocialItems] = useState(true);
    const toggleView = () => {
        setShowSocialItems((prev) => !prev);
    };

    return (
        <Section
            headerProps={{
                title: "CONTACT",
                buttonProps: {                    
                    onClick: () => toggleView(),
                    size: 140,
                    texts: showSocialItems
                        ? ["Click Here", "To Access", "Contact Form"]
                        : ["Click for", "LinkedIn", "RÉSUMÉ", "GitHub"],
                    centerIcon: showSocialItems ? GiQuillInk : GiLinkedRings,
                    className: "right-1/6",
                }
            }}
            className="text-3xl md:text-4xl lg:text-4xl theme-bg theme-text"
        >
            {showSocialItems ? (
                <SocialItems socials={socials} />
            ) : (
                <ContactForm />
            )}
        </Section>
    );
}
