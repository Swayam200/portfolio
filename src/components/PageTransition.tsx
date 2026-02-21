"use client";

import { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    return (
        <div className="flex-1 min-h-0 flex flex-col page-transition">
            {children}
        </div>
    );
}

