"use client";

import TabBar from "@/components/TabBar";
import PageTransition from "@/components/PageTransition";

interface Achievement {
    id: number;
    title: string;
    organization: string;
    date: string;
    description: string;
    type: "award" | "certification" | "hackathon" | "publication";
    link?: string;
}

const achievements: Achievement[] = [
    {
        id: 1,
        title: "IEEE Conference Paper — RCSM 2025",
        organization: "IEEE / MANIT Bhopal",
        date: "Dec 2025",
        description:
            "Evaluating the Portability of BERT-based Misinformation Detection from Twitter to Bluesky. Accepted for IEEE Xplore (SCOPUS indexed). Achieved F1-score of 0.997 after fine-tuning.",
        type: "publication",
    },
    {
        id: 2,
        title: "Winter Internship — IIT Ropar",
        organization: "IIT Ropar / NPTEL",
        date: "Dec 2025",
        description:
            "Conducted architectural analysis of GenAI-powered agri-tech systems and AI-proctored LMS platforms. Assessed LLM integration trade-offs in production-scale educational platforms.",
        type: "award",
    },
    {
        id: 3,
        title: "Google Data Analytics Professional Certificate",
        organization: "Google",
        date: "Jul 2025",
        description:
            "Earned the Google Data Analytics Professional Certificate covering data cleaning, visualization, SQL, R programming, and data-driven decision making.",
        type: "certification",
        link: "https://www.credly.com/",
    },
    {
        id: 4,
        title: "Cloud Computing — NPTEL",
        organization: "NPTEL",
        date: "May 2025",
        description:
            "Completed the NPTEL Cloud Computing certification covering cloud architectures, virtualization, and deployment models.",
        type: "certification",
    },
    {
        id: 5,
        title: "Applied Machine Learning in Python",
        organization: "University of Michigan",
        date: "Dec 2024",
        description:
            "Completed the Applied Machine Learning in Python course covering supervised/unsupervised learning, model evaluation, and scikit-learn workflows.",
        type: "certification",
    },
    {
        id: 6,
        title: "Club Coordinator — GeeksforGeeks VIT Bhopal",
        organization: "GeeksforGeeks VIT Bhopal",
        date: "Dec 2025",
        description:
            "Promoted to Club Coordinator after serving as Technical Team Lead. Led development of competition platforms engaging 200+ participants.",
        type: "award",
    },
    {
        id: 7,
        title: "Project Task Lead — Darzi AI Resume Suite",
        organization: "VITB AI Innovators Hub",
        date: "Sep 2025",
        description:
            "Led the Darzi AI Resume Suite project coordinating a 75+ member team. Built an AI-powered resume optimization platform with ATS analysis.",
        type: "award",
        link: "https://darze.vercel.app/",
    },
    {
        id: 8,
        title: "Intel AI 4 Youth — Gender Age Prediction",
        organization: "CBSE / Intel",
        date: "Aug 2022",
        description:
            "Built a Gender and Age Recognition System as a final project for CBSE and Intel's AI 4 Youth programme.",
        type: "hackathon",
        link: "https://github.com/Swayam200/Intel-AI-4-Youth-Project",
    },
    {
        id: 9,
        title: "Startup Star Season 1 — 7th Position",
        organization: "Startupvapi",
        date: "Feb 2022",
        description:
            "Secured 7th position among hundreds of applicants from Valsad district. Pitched Petmania — an all-in-one pet care solution.",
        type: "hackathon",
    },
];

const typeIcons: Record<string, { icon: string; color: string }> = {
    award: { icon: "★", color: "text-yellow-400" },
    certification: { icon: "✓", color: "text-green-400" },
    hackathon: { icon: "⚡", color: "text-blue-400" },
    publication: { icon: "📄", color: "text-purple-400" },
};

const typeColors: Record<string, string> = {
    award: "border-yellow-500/30",
    certification: "border-green-500/30",
    hackathon: "border-blue-500/30",
    publication: "border-purple-500/30",
};

export default function AchievementsPage() {
    return (
        <>
            <TabBar />
            <PageTransition>
                <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-12 scroll-smooth">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-12 border-b border-gray-800 pb-8">
                            <h1 className="text-3xl font-medium text-white mb-4 flex items-center">
                                <span className="text-gray-600 mr-2 text-2xl font-light">
                                    #
                                </span>{" "}
                                Achievements
                            </h1>
                            <p className="text-gray-400 text-sm font-[family-name:var(--font-fira-code)]">
                                <span className="text-gray-600">{"// "}</span>
                                Milestones, awards, and recognitions
                            </p>
                        </div>

                        {/* Stats bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {[
                                { label: "publications", value: "1", color: "text-purple-400" },
                                {
                                    label: "certifications",
                                    value: "3+",
                                    color: "text-green-400",
                                },
                                {
                                    label: "leadership_roles",
                                    value: "4",
                                    color: "text-blue-400",
                                },
                                {
                                    label: "github_repos",
                                    value: "46",
                                    color: "text-yellow-400",
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
                                >
                                    <div
                                        className={`text-2xl font-bold ${stat.color} font-[family-name:var(--font-fira-code)]`}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-500 font-[family-name:var(--font-fira-code)] mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Achievements as git log style */}
                        <div className="font-[family-name:var(--font-fira-code)] text-sm">
                            <div className="text-gray-500 mb-6 text-xs">
                                $ git log --oneline --achievements
                            </div>

                            <div className="space-y-4">
                                {achievements.map((achievement) => {
                                    const typeInfo = typeIcons[achievement.type];
                                    return (
                                        <div
                                            key={achievement.id}
                                            className={`bg-[#0a0a0a] border ${typeColors[achievement.type]} rounded-lg p-6 hover:border-gray-600 transition-all group cursor-default hover-lift`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`${typeInfo.color} text-lg`}
                                                    >
                                                        {typeInfo.icon}
                                                    </span>
                                                    <div>
                                                        <h3 className="text-white font-medium text-base">
                                                            {achievement.title}
                                                        </h3>
                                                        <p className="text-gray-500 text-xs mt-0.5">
                                                            {achievement.organization}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-600 bg-gray-900 px-2 py-1 rounded border border-gray-800 flex-shrink-0">
                                                    {achievement.date}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-xs leading-relaxed ml-8">
                                                {achievement.description}
                                            </p>
                                            {achievement.link && (
                                                <div className="ml-8 mt-3">
                                                    <a
                                                        href={achievement.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                                    >
                                                        → view profile
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-16 pt-6 border-t border-gray-800 flex justify-between text-xs font-[family-name:var(--font-fira-code)] text-gray-600">
                            <span>{achievements.length} achievements listed</span>
                            <span>ACHIEVEMENTS.md • Last updated: Feb 2026</span>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </>
    );
}
