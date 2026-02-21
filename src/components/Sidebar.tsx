"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "~/home", href: "/" },
    { label: "./projects", href: "/projects" },
    { label: "./about_me", href: "/about" },
    { label: "./achievements", href: "/achievements" },
    { label: "./contact", href: "/contact" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full md:w-64 flex-shrink-0 p-8 md:border-r border-gray-800 flex flex-col justify-between bg-[#050505] z-30">
            <div>
                <h1 className="text-2xl font-light tracking-tight mb-2 text-white">
                    Swayam Prakash Panda
                </h1>
                <p className="text-xs text-gray-400 font-mono mb-12">
                    B.Tech CSE (AI &amp; ML)
                </p>

                <nav className="font-mono text-sm space-y-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <div key={item.href} className="group cursor-pointer">
                                <span
                                    className={`text-gray-600 mr-2 ${isActive
                                        ? "opacity-100"
                                        : "opacity-0 group-hover:opacity-100"
                                        }`}
                                >
                                    &gt;
                                </span>
                                <Link
                                    href={item.href}
                                    prefetch={true}
                                    className={`${isActive
                                        ? "text-white font-medium"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        );
                    })}
                </nav>
            </div>

            <div className="flex space-x-4 text-gray-600 mt-8 md:mt-0">
                <a
                    href="https://github.com/Swayam200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                >
                    <span className="sr-only">GitHub</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                    </svg>
                </a>
                <a
                    href="https://www.linkedin.com/in/swayam200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>
                <a
                    href="https://twitter.com/swayam200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                >
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>
            </div>
        </aside>
    );
}
