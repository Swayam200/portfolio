"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element once, persists across page navigations
        const audio = new Audio("/music/ambient.mp3");
        audio.loop = true;
        audio.volume = 0.3;
        audio.preload = "auto";
        audioRef.current = audio;

        audio.addEventListener("canplaythrough", () => setIsLoaded(true));
        audio.addEventListener("error", () => {
            // If file doesn't exist yet, still show the player
            setIsLoaded(true);
        });

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => {
                // Autoplay blocked — user interaction will retry
            });
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    return (
        <>
            {/* Desktop music player */}
            <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-3 z-50">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="group relative border border-gray-600 rounded-full p-2.5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    {isPlaying ? (
                        /* Equalizer bars animation */
                        <div className="flex items-end gap-[2px] w-5 h-5 p-0.5">
                            <span className="w-[3px] bg-green-400 rounded-full animate-eq-1" />
                            <span className="w-[3px] bg-green-400 rounded-full animate-eq-2" />
                            <span className="w-[3px] bg-green-400 rounded-full animate-eq-3" />
                            <span className="w-[3px] bg-green-400 rounded-full animate-eq-4" />
                        </div>
                    ) : (
                        /* Play icon */
                        <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}

                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-gray-700 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap font-[family-name:var(--font-fira-code)]">
                            {isPlaying ? "pause" : "play"} music
                        </div>
                    )}
                </button>

                {/* Now playing label */}
                {isPlaying && (
                    <div className="text-xs font-[family-name:var(--font-fira-code)] text-gray-500 animate-fade-in-fast">
                        <span className="text-gray-600">♪</span> now playing
                    </div>
                )}
            </div>

            {/* Mobile music player — compact fixed button */}
            <button
                onClick={togglePlay}
                className="fixed bottom-16 right-3 z-40 md:hidden border border-gray-700 rounded-full p-2 bg-[#0a0a0a]/90 backdrop-blur-sm active:bg-white/10 transition-all"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {isPlaying ? (
                    <div className="flex items-end gap-[1.5px] w-4 h-4 p-0.5">
                        <span className="w-[2px] bg-green-400 rounded-full animate-eq-1" />
                        <span className="w-[2px] bg-green-400 rounded-full animate-eq-2" />
                        <span className="w-[2px] bg-green-400 rounded-full animate-eq-3" />
                    </div>
                ) : (
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>
        </>
    );
}
