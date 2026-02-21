"use client";

import { useState } from "react";
import TabBar from "@/components/TabBar";
import PageTransition from "@/components/PageTransition";

interface Project {
    id: number;
    name: string;
    description: string;
    tech: string[];
    github: string;
    live: string | null;
    status: "completed" | "in-progress" | "archived";
    stars: number;
    featured: boolean;
    image: string;
    color: string;
}

const projects: Project[] = [
    {
        id: 1,
        name: "bert-misinformation-detection",
        description:
            "IEEE RCSM 2025 paper — Evaluating the portability of BERT-based misinformation detection from Twitter to Bluesky. Achieved F1-score of 0.73 in zero-shot transfer, improving to 0.997 after platform-specific fine-tuning.",
        tech: ["Python", "BERT", "NLP", "Transfer Learning"],
        github: "https://github.com/Swayam200",
        live: null,
        status: "completed",
        stars: 0,
        featured: true,
        image: "/projects/bert-misinfo.png",
        color: "purple",
    },
    {
        id: 2,
        name: "carbon-sleuth",
        description:
            "Hybrid Web + Desktop application for chemical equipment parameter visualisation. Built with Django REST, React frontend, and PyQt5 desktop client with pandas-driven data pipelines.",
        tech: ["Python", "Django REST", "React", "PyQt5", "pandas"],
        github: "https://github.com/Swayam200/carbon-sleuth",
        live: null,
        status: "completed",
        stars: 1,
        featured: true,
        image: "/projects/carbon-sleuth.png",
        color: "blue",
    },
    {
        id: 3,
        name: "goldfish-password-generator",
        description:
            "Novel entropy-based password generation leveraging real-time biological motion patterns of goldfish captured via computer vision. Uses SHA-256 hashing with statistical randomness validation.",
        tech: ["Python", "OpenCV", "Cryptography", "Computer Vision"],
        github: "https://github.com/Swayam200/goldfish_password_generator",
        live: null,
        status: "in-progress",
        stars: 2,
        featured: true,
        image: "/projects/goldfish-rng.png",
        color: "green",
    },
    {
        id: 4,
        name: "leptospirosis-predictor",
        description:
            "Machine learning models to predict leptospirosis risk using climate and epidemiological datasets across multiple European regions. Features spatial risk pattern visualization.",
        tech: ["Python", "scikit-learn", "pandas", "Data Analysis"],
        github: "https://github.com/Swayam200/Leptospirosis-Predictor",
        live: null,
        status: "completed",
        stars: 5,
        featured: true,
        image: "/projects/lepto-predictor.png",
        color: "yellow",
    },
    {
        id: 5,
        name: "darzi-ai-resume-suite",
        description:
            "AI Resume Tailor Suite — leverages NLP and AI algorithms for personalized resume optimization with ATS optimization techniques. Led a 75+ member team as Project Task Lead at VITB AI Innovators Hub.",
        tech: ["TypeScript", "Next.js", "NLP", "AI"],
        github: "https://github.com/VIT-Bhopal-AI-Innovators-Hub/Darzi-AI-Resume-Suite",
        live: "https://darze.vercel.app/",
        status: "completed",
        stars: 0,
        featured: true,
        image: "/projects/darzi.png",
        color: "cyan",
    },
    {
        id: 6,
        name: "blood-cell-detection",
        description:
            "Blood Cell Detection system using YOLOv8 object detection. Trained on annotated microscopy images for real-time identification and classification of blood cells.",
        tech: ["Python", "YOLOv8", "Computer Vision", "Deep Learning"],
        github: "https://github.com/Swayam200/blood_cell_detection",
        live: null,
        status: "completed",
        stars: 0,
        featured: false,
        image: "/projects/blood-cell.png",
        color: "red",
    },
    {
        id: 7,
        name: "abusive-language-censoring-api",
        description:
            "Self-hosted text censoring API with dictionary + ML fallback. Built with FastAPI achieving sub-millisecond latency for real-time text moderation.",
        tech: ["Python", "FastAPI", "NLP", "Machine Learning"],
        github: "https://github.com/Swayam200/abusive-language-censoring-api",
        live: null,
        status: "completed",
        stars: 0,
        featured: false,
        image: "/projects/text-censor.png",
        color: "purple",
    },
    {
        id: 8,
        name: "indian-railways-analysis",
        description:
            "Data analysis and visualization of Indian Railways ticket booking dataset to identify interesting trends, patterns, and insights using pandas and plotly.",
        tech: ["Python", "Jupyter", "pandas", "Data Visualization"],
        github: "https://github.com/Swayam200/Indian-Railways-Analysis",
        live: null,
        status: "completed",
        stars: 1,
        featured: false,
        image: "/projects/ir-analysis.png",
        color: "blue",
    },
    {
        id: 9,
        name: "factly-verify",
        description:
            "Fact verification tool built with TypeScript for checking the veracity of claims and statements using NLP techniques.",
        tech: ["TypeScript", "NLP", "React"],
        github: "https://github.com/Swayam200/factly-verify",
        live: null,
        status: "completed",
        stars: 0,
        featured: false,
        image: "/projects/factly.png",
        color: "green",
    },
    {
        id: 10,
        name: "stt-model",
        description:
            "CPU-based Speech to Text Model using Vosk for offline speech recognition. Designed for low-resource environments without GPU dependency.",
        tech: ["Python", "Vosk", "Speech Recognition"],
        github: "https://github.com/Swayam200/STT_Model",
        live: null,
        status: "completed",
        stars: 0,
        featured: false,
        image: "/projects/stt.png",
        color: "yellow",
    },
];

const statusColors: Record<string, string> = {
    completed: "text-green-400",
    "in-progress": "text-yellow-400",
    archived: "text-gray-500",
};

const statusLabels: Record<string, string> = {
    completed: "completed",
    "in-progress": "in_progress",
    archived: "archived",
};

export default function ProjectsPage() {
    const [filter, setFilter] = useState<string>("all");
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const filteredProjects =
        filter === "all"
            ? projects
            : filter === "featured"
                ? projects.filter((p) => p.featured)
                : projects.filter((p) => p.status === filter);

    const expandedProject = projects.find((p) => p.id === expandedId) || null;

    const colorMap: Record<string, string> = {
        purple: "from-purple-500/20 border-purple-500/30",
        blue: "from-blue-500/20 border-blue-500/30",
        green: "from-green-500/20 border-green-500/30",
        yellow: "from-yellow-500/20 border-yellow-500/30",
        red: "from-red-500/20 border-red-500/30",
        cyan: "from-cyan-500/20 border-cyan-500/30",
    };

    return (
        <>
            <TabBar />
            <PageTransition>
                <div className="flex-1 min-h-0 flex overflow-hidden">
                    {/* Main JSON panel */}
                    <div className={`flex-1 overflow-y-auto p-4 md:p-12 scroll-smooth transition-all duration-300 ${expandedProject ? "md:w-[55%]" : "w-full"}`}>
                        <div className="max-w-4xl mx-auto font-[family-name:var(--font-fira-code)]">
                            {/* File header comment */}
                            <div className="text-sm text-gray-500 mb-6">
                                <span className="text-gray-600">{"// "}</span>
                                <span>projects.json — All projects by Swayam Prakash Panda</span>
                            </div>

                            {/* Filter bar */}
                            <div className="mb-8 flex flex-wrap gap-2 text-xs">
                                <span className="text-gray-500 mr-2 self-center">filter:</span>
                                {["all", "featured", "completed", "in-progress", "archived"].map(
                                    (f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-3 py-1 rounded border transition-colors ${filter === f
                                                ? "bg-[#1e1e1e] text-white border-gray-600"
                                                : "bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300"
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    )
                                )}
                            </div>

                            {/* JSON structure */}
                            <div className="text-sm leading-loose">
                                <span className="text-gray-300">{"{"}</span>
                                <br />
                                <span className="pl-4 text-purple-400">
                                    &quot;projects&quot;
                                </span>
                                <span className="text-gray-300">: [</span>

                                {filteredProjects.map((project, index) => {
                                    const isExpanded = expandedId === project.id;
                                    return (
                                        <div
                                            key={project.id}
                                            className={`pl-8 my-4 group rounded-md transition-colors duration-200 ${isExpanded ? "bg-white/[0.02] -mx-2 px-10 py-2" : ""}`}
                                        >
                                            <div
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setExpandedId(isExpanded ? null : project.id)
                                                }
                                            >
                                                <span className="text-gray-300">{"{"}</span>
                                                {!isExpanded && (
                                                    <span className="text-gray-500 ml-2 group-hover:text-gray-300 transition-colors">
                                                        // {project.name} — click to expand
                                                    </span>
                                                )}
                                            </div>

                                            {/* Expanded project JSON */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${isExpanded
                                                    ? "max-h-[800px] opacity-100"
                                                    : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <div className="pl-4 space-y-1">
                                                    <div>
                                                        <span className="text-blue-400">&quot;name&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className="text-green-300">&quot;{project.name}&quot;</span>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-blue-400">&quot;description&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className="text-green-300">&quot;{project.description}&quot;</span>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-blue-400">&quot;tech&quot;</span>
                                                        <span className="text-gray-300">: [</span>
                                                        {project.tech.map((t, i) => (
                                                            <span key={t}>
                                                                <span className="text-yellow-300">&quot;{t}&quot;</span>
                                                                {i < project.tech.length - 1 && <span className="text-gray-300">, </span>}
                                                            </span>
                                                        ))}
                                                        <span className="text-gray-300">],</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-blue-400">&quot;status&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className={statusColors[project.status]}>&quot;{statusLabels[project.status]}&quot;</span>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-blue-400">&quot;stars&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className="text-orange-300">{project.stars}</span>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-blue-400">&quot;featured&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className={project.featured ? "text-green-400" : "text-red-400"}>
                                                            {project.featured ? "true" : "false"}
                                                        </span>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    <div className="break-all">
                                                        <span className="text-blue-400">&quot;github&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline decoration-gray-700 hover:decoration-green-300 transition-colors">
                                                            &quot;{project.github}&quot;
                                                        </a>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    {project.live && (
                                                        <div>
                                                            <span className="text-blue-400">&quot;live&quot;</span>
                                                            <span className="text-gray-300">: </span>
                                                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 underline decoration-gray-700 hover:decoration-green-300 transition-colors">
                                                                &quot;{project.live}&quot;
                                                            </a>
                                                            <span className="text-gray-300">,</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <span className="text-blue-400">&quot;preview&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className="text-gray-500 hidden md:inline">&quot;→ see side panel&quot;</span>
                                                        <span className="text-gray-500 md:hidden">&quot;→ see below&quot;</span>
                                                    </div>
                                                </div>
                                                {/* Mobile inline project details */}
                                                <div className="md:hidden mt-4 pt-4 border-t border-gray-800/50">
                                                    <p className="text-sm text-gray-400 leading-relaxed mb-4 font-[family-name:var(--font-inter)]">
                                                        {project.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                                        {project.tech.map((t) => (
                                                            <span
                                                                key={t}
                                                                className="px-2 py-0.5 text-[11px] font-[family-name:var(--font-fira-code)] bg-[#1c1c1c] text-gray-300 rounded border border-gray-800"
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-xs font-[family-name:var(--font-fira-code)] text-gray-500 mb-4">
                                                        <span>⭐ {project.stars}</span>
                                                        <span className={statusColors[project.status]}>
                                                            ● {project.status}
                                                        </span>
                                                        {project.featured && (
                                                            <span className="text-yellow-400">★ featured</span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded text-xs text-gray-300 active:text-white transition-colors font-[family-name:var(--font-fira-code)]"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                                                            source
                                                        </a>
                                                        {project.live && (
                                                            <a
                                                                href={project.live}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-gray-700 rounded text-xs text-gray-300 active:text-white transition-colors font-[family-name:var(--font-fira-code)]"
                                                            >
                                                                ↗ live demo
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Collapsed preview */}
                                            {!isExpanded && (
                                                <div className="pl-4 space-y-1">
                                                    <div>
                                                        <span className="text-blue-400">&quot;name&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className="text-green-300">&quot;{project.name}&quot;</span>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-blue-400">&quot;status&quot;</span>
                                                        <span className="text-gray-300">: </span>
                                                        <span className={statusColors[project.status]}>&quot;{statusLabels[project.status]}&quot;</span>
                                                        <span className="text-gray-300">,</span>
                                                    </div>
                                                    <div className="text-gray-600">...</div>
                                                </div>
                                            )}

                                            <span className="text-gray-300">{"}"}</span>
                                            {index < filteredProjects.length - 1 && (
                                                <span className="text-gray-300">,</span>
                                            )}
                                        </div>
                                    );
                                })}

                                <div className="pl-4">
                                    <span className="text-gray-300">]</span>
                                </div>
                                <span className="text-gray-300">{"}"}</span>
                            </div>

                            {/* Footer */}
                            <div className="mt-16 pt-6 border-t border-gray-800 flex justify-between text-xs text-gray-600">
                                <span>
                                    {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
                                </span>
                                <span>projects.json • {projects.length} total entries</span>
                            </div>
                        </div>
                    </div>

                    {/* Side panel — project preview */}
                    <div
                        className={`hidden md:flex flex-col border-l border-gray-800 bg-[#0a0a0a] transition-all duration-300 ease-out overflow-hidden ${expandedProject ? "w-[45%] opacity-100" : "w-0 opacity-0"
                            }`}
                    >
                        {expandedProject && (
                            <div className="p-8 flex flex-col h-full animate-fade-in-fast">
                                {/* Panel header */}
                                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                                    <div className="text-xs font-[family-name:var(--font-fira-code)] text-gray-500">
                                        <span className="text-gray-600">preview/</span>{expandedProject.name}
                                    </div>
                                    <button
                                        onClick={() => setExpandedId(null)}
                                        className="text-gray-500 hover:text-white transition-colors text-sm cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Project image placeholder */}
                                <div className={`relative w-full aspect-video rounded-lg border ${colorMap[expandedProject.color] || "border-gray-700"} bg-gradient-to-br from-transparent to-transparent overflow-hidden mb-6 flex-shrink-0`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[expandedProject.color]?.split(" ")[0] || "from-gray-500/20"} to-transparent`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-4xl mb-2 opacity-30">
                                                {expandedProject.status === "completed" ? "✓" : expandedProject.status === "in-progress" ? "⚡" : "📦"}
                                            </div>
                                            <div className="text-xs font-[family-name:var(--font-fira-code)] text-gray-500">
                                                screenshot placeholder
                                            </div>
                                            <div className="text-[10px] font-[family-name:var(--font-fira-code)] text-gray-600 mt-1">
                                                {expandedProject.image}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Project details */}
                                <div className="flex-1 overflow-y-auto">
                                    <h3 className="text-lg font-medium text-white mb-2 font-[family-name:var(--font-inter)]">
                                        {expandedProject.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-6 font-[family-name:var(--font-inter)]">
                                        {expandedProject.description}
                                    </p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {expandedProject.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-2 py-0.5 text-xs font-[family-name:var(--font-fira-code)] bg-[#1c1c1c] text-gray-300 rounded border border-gray-800"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs font-[family-name:var(--font-fira-code)] text-gray-500 mb-6">
                                        <span>⭐ {expandedProject.stars}</span>
                                        <span className={statusColors[expandedProject.status]}>
                                            ● {expandedProject.status}
                                        </span>
                                        {expandedProject.featured && (
                                            <span className="text-yellow-400">★ featured</span>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-3">
                                        <a
                                            href={expandedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors font-[family-name:var(--font-fira-code)]"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                            </svg>
                                            source
                                        </a>
                                        {expandedProject.live && (
                                            <a
                                                href={expandedProject.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-700 rounded text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors font-[family-name:var(--font-fira-code)]"
                                            >
                                                ↗ live demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </PageTransition>
        </>
    );
}
