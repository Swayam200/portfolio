"use client";

import { useEffect, useRef } from "react";

export default function SpotlightEffect() {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (spotlightRef.current) {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                spotlightRef.current.style.setProperty("--x", `${x}%`);
                spotlightRef.current.style.setProperty("--y", `${y}%`);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return <div ref={spotlightRef} id="spotlight" />;
}
