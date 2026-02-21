"use client";

import TabBar from "@/components/TabBar";
import PageTransition from "@/components/PageTransition";

const experiences = [
    {
        company: "GeeksforGeeks VIT Bhopal",
        role: "Club Coordinator → Technical Team Lead",
        period: "Jan 2025 - Present",
        color: "bg-green-500",
        roleColor: "text-green-400",
        bullets: [
            "Led development of interactive algorithmic competition platforms engaging 200+ participants.",
            "Mentored students in structured problem-solving, version control, and deployment workflows.",
            "Progressed from Technical Team Member → Team Lead → Club Coordinator within a year.",
        ],
    },
    {
        company: "VIT Bhopal AI Innovators Hub",
        role: "Technical Team Lead / Project Task Lead",
        period: "Feb 2025 - Present",
        color: "bg-blue-500",
        roleColor: "text-blue-400",
        bullets: [
            "Led the Darzi: AI Resume Suite initiative, coordinating a 75+ member team across research and engineering roles.",
            "Structured project workflows and task allocation to support scalable development and experimentation.",
            "Promoted from Technical Team Member to Technical Team Lead.",
        ],
    },
    {
        company: "IIT Ropar (NPTEL Winter Internship)",
        role: "Winter Intern",
        period: "Dec 2025 - Jan 2026",
        color: "bg-purple-500",
        roleColor: "text-purple-400",
        bullets: [
            "Analysed Ajrasakha, a GenAI-powered agri-tech system, focusing on multi-stage query resolution pipelines.",
            "Examined AI-proctored video delivery mechanisms and RBAC in the ViBe LMS.",
            "Assessed design trade-offs in integrating LLM-based components within production-scale educational platforms.",
        ],
    },
    {
        company: "IEEE RCSM 2025 — Research Publication",
        role: "Author",
        period: "Dec 2025",
        color: "bg-yellow-500",
        roleColor: "text-yellow-400",
        bullets: [
            "Published 'Evaluating the Portability of BERT-based Misinformation Detection from Twitter to Bluesky'.",
            "Achieved F1-score of 0.73 in zero-shot transfer, improving to 0.997 after platform-specific fine-tuning.",
            "Accepted for IEEE Xplore (SCOPUS indexed). Presented at MANIT Bhopal.",
        ],
    },
];

const skillCategories = [
    {
        label: "// Languages",
        color: "text-yellow-300",
        skills: ["Python", "C++", "TypeScript", "JavaScript"],
    },
    {
        label: "// ML & NLP",
        color: "text-purple-300",
        skills: ["BERT", "scikit-learn", "pandas", "YOLOv8", "Vosk"],
    },
    {
        label: "// Frameworks & Libraries",
        color: "text-blue-300",
        skills: ["React", "Next.js", "Node.js", "Django", "FastAPI", "Tailwind CSS"],
    },
    {
        label: "// Computer Vision",
        color: "text-green-300",
        skills: ["OpenCV", "PyQt5", "Feature Extraction"],
    },
    {
        label: "// Tools & Cloud",
        color: "text-gray-300",
        skills: ["Git", "PostgreSQL", "GCP", "AWS", "MongoDB"],
    },
];

export default function AboutPage() {
    return (
        <>
            <TabBar />
            <PageTransition>
                <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-12 scroll-smooth">
                    <div className="max-w-4xl mx-auto">
                        <article className="max-w-none">
                            {/* About Me */}
                            <div className="mb-12 border-b border-gray-800 pb-8">
                                <h1 className="text-3xl font-medium text-white mb-2 flex items-center font-[family-name:var(--font-inter)]">
                                    <span className="text-gray-600 mr-3 text-2xl font-light font-[family-name:var(--font-fira-code)]">#</span>
                                    About Me
                                </h1>
                                <div className="text-xs font-[family-name:var(--font-fira-code)] text-gray-600 mb-6 ml-8">
                                    // README.md — last edited 2 days ago
                                </div>
                                <p className="text-gray-300 leading-relaxed text-base font-light font-[family-name:var(--font-inter)] ml-8">
                                    Undergraduate B.Tech student in Computer Science (AI &amp; ML) at VIT Bhopal
                                    with research experience in Natural Language Processing and social media analysis.
                                    Author of an IEEE-accepted paper on cross-platform misinformation detection.
                                    Interested in neural NLP, transfer learning, computer vision, and building
                                    full-stack applications that solve real-world problems.
                                </p>
                            </div>

                            {/* Professional Experience */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-medium text-white mb-2 flex items-center font-[family-name:var(--font-inter)]">
                                    <span className="text-gray-600 mr-3 text-xl font-light font-[family-name:var(--font-fira-code)]">##</span>
                                    Professional Experience
                                </h2>
                                <div className="text-xs font-[family-name:var(--font-fira-code)] text-gray-600 mb-8 ml-9">
                                    // 4 positions • research + leadership + internship
                                </div>

                                <div className="relative border-l border-gray-800 ml-3 space-y-6">
                                    {experiences.map((exp) => (
                                        <div
                                            key={exp.company}
                                            className="relative pl-8 group cursor-default"
                                        >
                                            {/* Timeline dot */}
                                            <div
                                                className={`absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full ${exp.color} ring-4 ring-[#050505] transition-all duration-300 group-hover:ring-[6px] group-hover:scale-125`}
                                            />

                                            {/* Card */}
                                            <div className="bg-[#0a0a0a] border border-gray-800/50 rounded-lg p-5 transition-all duration-300 group-hover:border-gray-700 group-hover:bg-[#0c0c0c] group-hover:translate-x-1 group-hover:shadow-lg group-hover:shadow-black/20">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                                    <h3 className="text-lg font-medium text-white font-[family-name:var(--font-inter)] group-hover:text-white transition-colors">
                                                        {exp.company}
                                                    </h3>
                                                    <span className="font-[family-name:var(--font-fira-code)] text-[11px] text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800 group-hover:border-gray-700 transition-colors">
                                                        {exp.period}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`text-sm ${exp.roleColor} font-[family-name:var(--font-fira-code)] mb-3`}
                                                >
                                                    {exp.role}
                                                </div>
                                                <ul className="text-gray-400 space-y-1.5 text-sm font-light font-[family-name:var(--font-inter)]">
                                                    {exp.bullets.map((bullet, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-gray-600 mt-1.5 text-[8px]">▸</span>
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Education */}
                            <div className="mb-12 border-b border-gray-800 pb-8">
                                <h2 className="text-2xl font-medium text-white mb-2 flex items-center font-[family-name:var(--font-inter)]">
                                    <span className="text-gray-600 mr-3 text-xl font-light font-[family-name:var(--font-fira-code)]">##</span>
                                    Education
                                </h2>
                                <div className="text-xs font-[family-name:var(--font-fira-code)] text-gray-600 mb-6 ml-9">
                                    // academic background
                                </div>
                                <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 group cursor-default hover:bg-[#0c0c0c]">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-white font-[family-name:var(--font-inter)]">
                                                VIT Bhopal University
                                            </h3>
                                            <p className="text-gray-400 text-sm mt-1 font-[family-name:var(--font-inter)]">
                                                Bachelor of Technology - CSE (AI &amp; ML) • GPA: 8.64/10.00
                                            </p>
                                        </div>
                                        <span className="font-[family-name:var(--font-fira-code)] text-[11px] text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800">
                                            2023 - 2027
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center space-x-2 text-xs font-[family-name:var(--font-fira-code)] text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Bhopal, India</span>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Skills */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-medium text-white mb-2 flex items-center font-[family-name:var(--font-inter)]">
                                    <span className="text-gray-600 mr-3 text-xl font-light font-[family-name:var(--font-fira-code)]">##</span>
                                    Technical Skills
                                </h2>
                                <div className="text-xs font-[family-name:var(--font-fira-code)] text-gray-600 mb-6 ml-9">
                                    // skills.js — export default
                                </div>
                                <div className="font-[family-name:var(--font-fira-code)] text-sm bg-[#0a0a0a] border border-gray-800 rounded-lg p-6">
                                    {skillCategories.map((category) => (
                                        <div key={category.label} className="mb-5 last:mb-0">
                                            <span className="text-gray-500 block mb-2 text-xs">
                                                {category.label}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {category.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className={`px-3 py-1.5 bg-[#141414] ${category.color} rounded border border-gray-800 hover:border-gray-600 hover:bg-[#1a1a1a] transition-all duration-200 cursor-default hover:scale-105`}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* Footer */}
                        <div className="mt-16 pt-6 border-t border-gray-800 flex justify-between text-xs font-[family-name:var(--font-fira-code)] text-gray-600">
                            <span>Last commit: 2 days ago</span>
                            <span>482 lines • 12kb</span>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </>
    );
}
