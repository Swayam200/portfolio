"use client";

import TabBar from "@/components/TabBar";
import PageTransition from "@/components/PageTransition";
import TerminalCore from "@/components/TerminalCore";

export default function ContactPage() {
    return (
        <>
            <TabBar />
            <PageTransition>
                <div className="flex-1 min-h-0 flex flex-col p-4 md:p-6 overflow-hidden">
                    <div className="w-full flex flex-col flex-grow min-h-0">
                        <TerminalCore initialCommand="social" />

                        {/* Footer */}
                        <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between text-xs font-[family-name:var(--font-fira-code)] text-gray-600 flex-shrink-0">
                            <span className="flex items-center">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                Online — Open to opportunities
                            </span>
                            <span>terminal v2.0.0</span>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </>
    );
}
