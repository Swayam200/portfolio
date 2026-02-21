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

        const handleTouchMove = (e: TouchEvent) => {
            if (spotlightRef.current && e.touches[0]) {
                const x = (e.touches[0].clientX / window.innerWidth) * 100;
                const y = (e.touches[0].clientY / window.innerHeight) * 100;
                spotlightRef.current.style.setProperty("--x", `${x}%`);
                spotlightRef.current.style.setProperty("--y", `${y}%`);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove, { passive: true });
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return <div ref={spotlightRef} id="spotlight" />;
}
