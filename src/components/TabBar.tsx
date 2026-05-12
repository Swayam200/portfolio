"use client";

import { usePathname } from "next/navigation";

interface Tab {
    name: string;
    icon: string;
    iconColor: string;
}

const pageTabs: Record<string, Tab[]> = {
    "/about": [
        { name: "README.md", icon: "📄", iconColor: "text-blue-400" },
        { name: "skills.js", icon: "📜", iconColor: "text-yellow-400" },
    ],
    "/projects": [
        { name: "projects.json", icon: "📦", iconColor: "text-yellow-400" },
    ],
    "/achievements": [
        { name: "ACHIEVEMENTS.md", icon: "🏆", iconColor: "text-yellow-400" },
    ],
    "/contact": [
        { name: "terminal", icon: "⬛", iconColor: "text-green-400" },
    ],
};

export default function TabBar() {
    const pathname = usePathname();
    const tabs = pageTabs[pathname] || [];

    if (tabs.length === 0) return null;

    return (
        <div className="flex items-center w-full bg-[#0a0a0a] border-b border-gray-800 h-10 px-4 select-none flex-shrink-0">
            {tabs.map((tab, index) => (
                <div
                    key={tab.name}
                    className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-t-md transition-colors ${index === 0
                            ? "bg-[#1e1e1e] text-white border-t border-l border-r border-gray-700 relative top-[1px]"
                            : "text-gray-500 cursor-pointer hover:bg-[#151515]"
                        }`}
                >
                    <span className={`text-[14px] mr-1 ${tab.iconColor}`}>{tab.icon}</span>
                    <span className="font-mono">{tab.name}</span>
                    {index === 0 && (
                        <span className="text-[12px] text-gray-400 ml-2 hover:text-white cursor-pointer">
                            ✕
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
