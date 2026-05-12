"use client";

import TabBar from "@/components/TabBar";
import PageTransition from "@/components/PageTransition";
import { achievements, experiences, projects, publications } from "@/lib/profile-data";

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
    const statItems = [
        { label: "publications", value: String(publications.length), color: "text-purple-400" },
        {
            label: "certifications",
            value: String(achievements.filter((item) => item.type === "certification").length),
            color: "text-green-400",
        },
        {
            label: "leadership_roles",
            value: String(experiences.filter((item) => item.role.includes("Coordinator") || item.role.includes("Lead")).length),
            color: "text-blue-400",
        },
        {
            label: "featured_projects",
            value: String(projects.filter((item) => item.featured).length),
            color: "text-yellow-400",
        },
    ];

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
                            {statItems.map((stat) => (
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
                                                        -&gt; view reference
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
                            <span>ACHIEVEMENTS.md | Last updated: May 2026</span>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </>
    );
}
