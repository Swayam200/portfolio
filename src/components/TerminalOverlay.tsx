"use client";

import { useEffect, useCallback } from "react";
import { useTerminal } from "@/context/TerminalContext";
import TerminalCore from "@/components/TerminalCore";

export default function TerminalOverlay() {
    const { isOpen, close, toggle } = useTerminal();

    // Global keyboard shortcut: Ctrl+` to toggle terminal
    const handleGlobalKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "`") {
                e.preventDefault();
                toggle();
            }
            if (e.key === "Escape" && isOpen) {
                e.preventDefault();
                close();
            }
        },
        [toggle, close, isOpen]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [handleGlobalKeyDown]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={close}
            />

            {/* Terminal Panel — slides up from bottom */}
            <div
                style={{ height: "85vh" }}
                className={`fixed bottom-0 left-0 right-0 z-[100] transition-transform duration-300 ease-out md:!h-[65vh] ${isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                {/* Handle bar */}
                <div className="flex justify-center py-1.5 bg-[#111111] border-t border-x border-gray-800 rounded-t-xl cursor-grab">
                    <div className="w-10 h-1 rounded-full bg-gray-700" />
                </div>

                {/* Title bar */}
                <div className="flex items-center justify-between bg-[#111111] border-x border-gray-800 px-4 py-2 select-none">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" onClick={close} />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs text-gray-400 font-[family-name:var(--font-fira-code)]">
                            TERMINAL
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 font-[family-name:var(--font-fira-code)] hidden md:inline truncate max-w-[200px]">
                        swayam@portfolio ~ zsh
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600 font-[family-name:var(--font-fira-code)] hidden md:inline">
                            Ctrl+` to toggle
                        </span>
                        <button
                            onClick={close}
                            className="text-gray-500 hover:text-white transition-colors p-1 cursor-pointer"
                            aria-label="Close terminal"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Terminal body */}
                <div className="h-[calc(100%-68px)] bg-[#080808] border-x border-b border-gray-800">
                    {isOpen && <TerminalCore embedded onExit={close} />}
                </div>
            </div>
        </>
    );
}
