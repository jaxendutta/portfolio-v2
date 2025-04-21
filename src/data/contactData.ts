// src/data/contactData.ts

export type Social = {
    platform: string;
    handle: string;
    url: string;
};

export const socials: Social[] = [
    {
        platform: "E-MAIL",
        handle: "jaxendutta[at]gmail.com",
        url: "mailto:jaxendutta@gmail.com",
    },
    {
        platform: "GITHUB",
        handle: "/jaxendutta",
        url: "https://github.com/jaxendutta",
    },
    {
        platform: "LINKEDIN",
        handle: "/jaxen",
        url: "https://www.linkedin.com/in/jaxen/",
    },
    {
        platform: "RÉSUMÉ",
        handle: "",
        url: "https://docs.google.com/gview?url=https://docs.google.com/document/d/11mhUfmYKXO7jPN1rP6znr2B5zCl0hlrE0pKqAU2lKtU/export?format=pdf",
    },
];

export type ContactFormField = {
    name: string;
    type: string;
    required: boolean;
    help?: string;
};

export const contactFormFields: ContactFormField[] = [
    {
        name: "name",
        type: "text",
        required: true,
    },
    {
        name: "email",
        type: "email",
        required: true,
    },
    {
        name: "linkedin",
        type: "link",
        required: false,
        help: "Format: https://linkedin.com/in/username"
    },
];
