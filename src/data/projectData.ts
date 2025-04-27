// src/data/projectData.ts
import { ProjectsData } from "@/types/project";
import { FaSpaceAwesome } from "react-icons/fa6";
import {
    GiBoltEye,
    GiArtificialIntelligence,
    GiBee,
    GiCardJoker,
} from "react-icons/gi";
import { AiOutlineFolderView } from "react-icons/ai";
import { PiCodesandboxLogoLight } from "react-icons/pi";

export const projectsData: ProjectsData = {
    "evse-opt": {
        name: "EVSE",
        subtitle: "Network Optimization",
        icon: GiBoltEye,
        date: new Date("2024-12-18"),
        overview: [
            "Engineered a Gurobi MILP model processing 7750+ locations to enhance KWC-CMA's EV charging station coverage by +80% while minimizing costs through strategic Level 2 to Level 3 upgrades.",
        ],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/jaxendutta/kwc-ev-charging-network-opt",
            },
        ],
        typography: [],
        colors: [
            {
                palette: ["#FF5733", "#C70039", "#900C3F", "#581845"],
                description:
                    "The color scheme is designed to evoke a sense of urgency and importance, reflecting the critical nature of EV charging network optimization. The vibrant red (#FF5733) and deep magenta (#C70039) create a striking contrast, while the darker shades (#900C3F, #581845) add depth and sophistication.",
            },
        ],
        techStack: {
            "Data Engineering": ["Python", "GeoPandas", "GIS", "SciPy"],
            "Data Visualization": ["Folium", "Matplotlib", "Seaborn"],
            Optimization: ["Gurobi", "MILP"],
            Tools: ["Jupyter"],
        },
        footer: "EVSE Network Optimization is a project focused on optimizing electric vehicle charging networks. The project utilizes advanced algorithms and data analysis techniques to improve the efficiency and accessibility of EV charging stations. By leveraging real-time data and predictive modeling, the project aims to enhance the overall user experience for electric vehicle owners, making charging more convenient and reliable.",
    },
    fabler: {
        name: "Fabler",
        icon: GiArtificialIntelligence,
        date: new Date("2024-08-18"),
        overview: [
            '<div class="cardish">Tired of Generic Visual Novels?</div> Imagine crafting your own story, a world where every narrative unfolds based on your desires. Fabler empowers you to be the author. ✍️',
            '<div class="cardish">But how does it work?</div> Fabler leverages the magic of AI! Simply provide a prompt - a spark of inspiration - and our intelligent system weaves a captivating visual novel tailored to your vision. ✨',
        ],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/SE2-Fabler/",
            },
            {
                name: "Figma",
                url: "https://www.figma.com/proto/kjrv7xO5wJAFPIJFyd4uy4/Fabler?scaling=scale-down",
            },
        ],
        typography: [
            {
                name: "Roboto Flex",
                fontFamily: '"Roboto Flex", sans-serif',
                url: "https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100...900&display=swap",
                description:
                    "Roboto Flex was chosen for its clean and modern aesthetic, which aligns with the app's focus on user-generated content. Its versatility allows for adaptation to various screen sizes and contexts. The consistent use of Roboto Flex throughout the app creates a cohesive and recognizable visual identity.",
            },
            {
                name: "Italiana",
                fontFamily: '"Italiana", sans-serif',
                url: "https://fonts.googleapis.com/css2?family=Italiana&display=swap",
                description:
                    "The Italiana font, with its elegant serifs and subtle contrast, evokes a sense of timeless storytelling perfect for visual novels. Its graceful letterforms harken back to classic literature and fairy tales, creating a fable-like atmosphere.",
            },
        ],
        colors: [
            {
                palette: ["#A35E1E", "#EAD8D0", "#F8E6D0"],
                description:
                    "Fabler's visual identity is characterized by a clean and minimalist aesthetic. The color palette of A35E1E, F8E6D0, and EAD8D0 creates a warm and inviting atmosphere.",
            },
            {
                palette: [
                    "#8B4513",
                    "#4682B4",
                    "#228B22",
                    "#B8860B",
                    "#CD5C5C",
                ],
                description:
                    "Secondary color palette: These colors complement the primary palette and are used in the visual novel elements while generation for accents, backgrounds, and other supporting elements.",
            },
        ],
        techStack: {
            Frontend: ["Kotlin", "Jetpack Compose", "Android SDK"],
            Backend: ["Python", "Ren'Py"],
            "AI/ML": ["OpenAI", "Stable Diffusion"],
            Design: ["Figma", "Sketch", "Material Design", "Miro"],
            "Project Management": ["Trello"],
        },
        footer: "In a large-scale Android visual novel app project, I led development using Jetpack Compose (Kotlin) for the frontend and a Python backend. I spearheaded design and prototyping through Figma and user interviews, ensuring a user-friendly experience. The app features a responsive UI with custom components adhering to Material Design and leverages the OpenAI API to generate storylines and character profiles directly within the visual novels. Additionally, Stable Diffusion AI creates unique images for each story, while Ren'Py converts these elements into interactive narratives. This project demonstrates my expertise in integrating advanced AI systems for innovative mobile storytelling.",
    },
    hivemind: {
        name: "Hivemind",
        icon: GiBee,
        date: new Date("2023-08-18"),
        overview: [
            '<div class="cardish">Collaborative Learning, Reimagined.</div> Hivemind connects students worldwide, fostering a vibrant ecosystem of shared knowledge and collaborative study groups. Break free from isolation and tap into the power of collective intelligence! 🌐🧠',
            '<div class="cardish">How does it work?</div> Our innovative platform uses smart matching algorithms to connect you with like-minded learners, creating the perfect study environment tailored to your needs and learning style. From instant study sessions to long-term project collaborations, Hivemind adapts to your academic journey. 📚🤝',
        ],
        links: [
            {
                name: "Figma",
                url: "https://www.figma.com/proto/OgAWcQHH2BAl2djJTCnHII/Hivemind?scaling=scale-down",
            },
            {
                name: "Case Study",
                url: "https://docs.google.com/document/d/1mqnpwIP3gOAwz9jm2UrgXZnNPSO40aCmM-wA7pEuu2Q/view",
            },
        ],
        typography: [
            {
                name: "M PLUS Rounded 1c",
                fontFamily: '"M PLUS Rounded 1c", sans-serif',
                url: "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap",
                description:
                    "Rounded Mplus 1c Bold is used for larger text elements, embodying the app's friendly nature. Its rounded edges and bold weight create a welcoming atmosphere, reinforcing the app's collaborative spirit and adding a touch of playfulness to the interface.",
            },
            {
                name: "Noto Sans",
                fontFamily: '"Noto Sans", sans-serif',
                url: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap",
                description:
                    "Noto Sans was selected for its clean, modern look and excellent readability across devices. Its neutral yet friendly appearance aligns with Hivemind's inclusive learning environment, ensuring users can easily engage with content and reducing cognitive load during study sessions.",
            },
        ],
        colors: [
            {
                palette: ["#151413", "#FFA800", "#EEDBB7", "#F0F0F0"],
                description:
                    "The primary color palette of Hivemind is inspired by the natural world of bees and hives. The vibrant #FFA800 represents the energy and vitality of honey, while #EEDBB7 provides a softer, complementary tone reminiscent of beeswax. Dark #151413 offers strong contrast for text, while #F0F0F0 ensures readability.",
            },
            {
                palette: ["#FF6633", "#00B383", "#0071C1", "#6D29F6"],
                description:
                    "The secondary color palette introduces additional vibrancy and functionality to the app. These colors work together to create a diverse yet harmonious visual experience that supports various UI elements and user interactions.",
            },
        ],
        techStack: {
            Prototyping: ["Figma", "Sketch", "Miro"],
            "UX Research": ["User Interviews", "User Testing"],
            "Project Management": ["Trello"],
        },
        footer: "As the lead of Hivemind, a collaborative study app project, I directed the design and iOS prototype development efforts. Working with a diverse team, I facilitated Figma prototyping and conducted user interviews, refining the user experience. The app promotes seamless online connections for students worldwide, fostering collaborative study groups. Through iterative design and development, I ensured the app's functionality and visual elements aligned with user needs, resulting in an innovative platform for academic collaboration.",
    },
    "space-invaders": {
        name: "Space Invaders",
        icon: FaSpaceAwesome,
        date: new Date("2023-08-18"),
        overview: [
            '<div class="cardish">Retro Gaming Reimagined</div> Dive into nostalgia with a modern twist! This Space Invaders remake brings the classic arcade experience to your desktop, powered by cutting-edge Kotlin and JavaFX technologies. 🚀👾',
            '<div class="cardish">Challenge the Alien Invasion</div> Test your reflexes and strategy as you defend Earth from waves of descending aliens. With each level, the challenge intensifies, keeping you on the edge of your seat! 🎮🛸',
        ],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/jaxendutta/space-invaders/",
            },
            {
                name: "Download",
                url: "https://github.com/jaxendutta/space-invaders/releases",
            },
        ],
        typography: [
            {
                name: "Press Start 2P",
                fontFamily: '"Press Start 2P", cursive',
                url: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
                description:
                    "Press Start 2P is a bitmap font based on the font design from 1980s Namco arcade games. It perfectly captures the retro feel of classic space shooter games, enhancing the authentic arcade experience.",
            },
            {
                name: "Lucida Console",
                fontFamily: '"Lucida Console", monospace',
                url: "https://fonts.googleapis.com/css2?family=Lucida+Console&display=swap",
                description:
                    "Lucida Console, a monospaced font, is used for displaying game information and instructions. Its clear, easy-to-read design ensures that players can quickly understand the game mechanics and progress through the levels.",
            },
        ],
        colors: [
            {
                palette: ["#00FF00", "#FF00FF", "#FFFFFF", "#000000"],
                description:
                    "The color scheme pays homage to classic arcade games. Bright green (#00FF00) and magenta (#FF00FF) create a vibrant, retro feel against the stark contrast of white (#FFFFFF) and black (#000000), mimicking early CRT displays.",
            },
        ],
        techStack: {
            Frontend: ["Kotlin", "JavaFX"],
            "Build Tools": ["Gradle"],
            "Game Development": [
                "Game Loop",
                "Sprite Animation",
                "Collision Detection",
            ],
        },
        footer: "Created with Kotlin and JavaFX, this game features a visually engaging interface with a title screen, player-controlled ship, and dynamically moving alien fleet. Multiple levels were implemented, each intensifying the challenge as the player progresses. The use of smooth animations and audio feedback enhances the overall gaming atmosphere, showcasing elements of game development and animation techniques.",
    },
    "file-explorer": {
        name: "File Explorer",
        icon: AiOutlineFolderView,
        date: new Date("2023-08-18"),
        overview: [
            '<div class="cardish">Streamlined File Management</div> Experience a modern, intuitive file management solution built with Kotlin and JavaFX. Navigate your digital world with ease and efficiency. 📁🔍',
            '<div class="cardish">Feature-Rich Interface</div> From creating folders to previewing files, our File Explorer puts powerful tools at your fingertips. Enjoy a seamless, user-friendly experience for all your file organization needs. 🖥️📊',
        ],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/jaxendutta/file-explorer/",
            },
            {
                name: "Download",
                url: "https://github.com/jaxendutta/file-explorer/releases",
            },
        ],
        typography: [
            {
                name: "Noto Sans",
                fontFamily: '"Noto Sans", sans-serif',
                url: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap",
                description:
                    "Noto Sans was chosen for its clean, modern look and excellent readability across devices. Its neutral yet friendly appearance aligns with File Explorer's focus on user-friendly file management, ensuring users can easily navigate the interface and access file manipulation options.",
            },
        ],
        colors: [
            {
                palette: [
                    "#2196F3",
                    "#BBDEFB",
                    "#FFFFFF",
                    "#757575",
                    "#212121",
                ],
                description:
                    "The color scheme is designed for clarity and ease of use. The primary blue (#2196F3) highlights interactive elements, while lighter blue (#BBDEFB) subtly marks selections. White (#FFFFFF) backgrounds ensure readability, with dark gray (#212121) for text and medium gray (#757575) for secondary information.",
            },
        ],
        techStack: {
            Frontend: ["Kotlin", "JavaFX"],
            "Build Tools": ["Gradle"],
            "File System Operations": ["Java NIO"],
        },
        footer: "File Explorer features a comprehensive Menu Bar with options for creating folders, opening directories, and exiting the program. The Actions menu empowers users to rename, move, and delete selected files effortlessly. A versatile Tool Bar provides quick access to navigation and file manipulation options. The main File View displays a clear hierarchy of files and directories, complemented by a preview panel for supported file types. Stay informed with the Status Bar, which displays real-time information about the current directory and selected file.",
    },
    lightbox: {
        name: "Lightbox",
        icon: PiCodesandboxLogoLight,
        date: new Date("2023-08-18"),
        overview: [
            '<div class="cardish">Illuminate Your Images</div> Discover Lightbox, a powerful image manipulation tool crafted with Kotlin and JavaFX. Transform your visual content with ease and precision. 🖼️✨',
            '<div class="cardish">Intuitive Image Management</div> From basic edits to advanced manipulations, Lightbox puts a suite of tools at your fingertips. Experience smooth, responsive image handling in a user-friendly interface. 🖱️🎨',
        ],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/jaxendutta/lightbox/",
            },
            {
                name: "Download",
                url: "https://github.com/jaxendutta/lightbox/releases",
            },
        ],
        typography: [
            {
                name: "Noto Sans",
                fontFamily: '"Noto Sans", sans-serif',
                url: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap",
                description:
                    "Noto Sans was chosen for its clean, modern look and excellent readability across devices. Its neutral yet friendly appearance aligns with Lightbox's focus on user-friendly image editing, ensuring users can easily navigate the interface and access editing tools.",
            },
        ],
        colors: [
            {
                palette: [
                    "#3498db",
                    "#ecf0f1",
                    "#34495e",
                    "#2c3e50",
                    "#bdc3c7",
                ],
                description:
                    "The color scheme is designed for a clean, professional look. The primary blue (#3498db) highlights interactive elements, while light gray (#ecf0f1) provides a neutral background that doesn't interfere with image viewing. Dark blues (#34495e, #2c3e50) are used for text and UI accents, with medium gray (#bdc3c7) for secondary elements, creating a balanced and visually appealing interface.",
            },
        ],
        techStack: {
            Frontend: ["Kotlin", "JavaFX"],
            "Build Tools": ["Gradle"],
        },
        footer: "Lightbox showcases a feature-rich Tool Bar equipped with various buttons for comprehensive image manipulation. Users can effortlessly add, delete, rotate, and zoom images, among other operations. The heart of the application, the Preview Pane, offers intuitive image selection, dragging, and stacking capabilities, providing a seamless workflow for managing multiple images. Stay informed with the Status Bar, which displays real-time information on the image count and currently selected image, enhancing user awareness and control throughout the editing process.",
    },
    straights: {
        name: "Straights",
        icon: GiCardJoker,
        date: new Date("2022-08-18"),
        overview: [
            '<div class="cardish">From Terminal to Web: A Card Game Transformation</div> Experience Straights, a classic card game reimagined for the modern web. Originally a C++ terminal game, now playable in your browser thanks to the power of WebAssembly. 🃏💻',
            '<div class="cardish">Strategic 4-Player Action</div> Dive into this engaging 4-player card game where strategy is key. Aim for the lowest score as you navigate through each round, making calculated moves to outplay your opponents. 🏆♠️♥️♣️♦️',
        ],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/jaxendutta/straights/",
            },
            {
                name: "Play",
                url: "https://dutta.itch.io/straights/",
            },
        ],
        typography: [
            {
                name: "Courier Prime",
                fontFamily: '"Courier Prime", monospace',
                url: "https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap",
                description:
                    "Courier Prime, a monospaced font, is reminiscent of classic terminal displays. Its clean, typewriter-style design enhances the retro feel of the game, paying homage to the original C++ version.",
            },
        ],
        colors: [
            {
                palette: ["#000000", "#FFFFFF"],
                description:
                    "Straights pays homage to its terminal roots with a classic black (#000000) and white (#FFFFFF) color scheme. The stark contrast between these colors creates a visually striking interface that is reminiscent of traditional terminal displays.",
            },
        ],
        techStack: {
            Backend: ["C++", "WebAssembly", "Emscripten"],
            Frontend: ["HTML", "CSS", "JavaScript"],
            "Game Development": ["Game State Management"],
        },
        footer: "Straights showcases the seamless integration of C++ and web technologies. The core game logic, originally written in C++, has been recompiled to WebAssembly using Emscripten. This WebAssembly module is then integrated into a modern web application, with HTML, CSS, and JavaScript working in harmony to render the game state and provide an interactive user interface. The result is a fast, efficient game engine with a sleek, accessible front-end, playable directly in the browser without any installations.",
    },
};
