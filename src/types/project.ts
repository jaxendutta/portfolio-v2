import { IconType } from "react-icons";

// src/types/project.ts
export interface ProjectLink {
    name: string;
    url: string;
}

export interface FontInfo {
    name: string;
    fontFamily: string;
    url: string;
    description: string;
}

export interface ColorSet {
    palette: string[];
    description: string;
}

export interface ProjectData {
    name: string;
    subtitle?: string;
    icon: IconType
    overview: string[];
    links: ProjectLink[];
    typography?: FontInfo[];
    colors?: ColorSet[];
    techStack?: Record<string, string[]>;
    footer?: string;
}

export type ProjectsData = Record<string, ProjectData>;
