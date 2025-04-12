// src/app/[projectId]/layout.tsx
import { projectsData } from "@/data/projectData";
import { Metadata } from "next";

type Props = {
    children: React.ReactNode;
    params: { projectId: string };
};

// Generate metadata dynamically based on project ID
export async function generateMetadata(context: { params: { projectId: string } }): Promise<Metadata> {
    // Await params before destructuring
    const { projectId: id } = context.params;

    const project = projectsData[id];

    if (!project) {
        return {
            title: "Project Not Found - Anirban Dutta",
        };
    }

    return {
        title: `${project.name} - Anirban Dutta`,
        description: project.overview[0]?.replace(/<[^>]*>/g, ""),
    };
}

export default function ProjectLayout({ children }: Props) {
    return children;
}
