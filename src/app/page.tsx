"use client";

import PageTransition from "@/components/PageTransition";
import { useTerminal } from "@/context/TerminalContext";
import { profile } from "@/lib/profile-data";

export default function Home() {
  const { open } = useTerminal();

  return (
    <PageTransition>
      <div className="flex-1 min-h-0 flex items-center justify-center p-8 relative">
        <div className="max-w-3xl w-full">
          {/* Code Block — clickable to open terminal */}
          <div
            onClick={open}
            className="font-[family-name:var(--font-fira-code)] text-sm md:text-base leading-relaxed bg-transparent p-6 md:p-12 rounded-lg backdrop-blur-sm border border-gray-800/50 cursor-pointer group transition-all duration-300 hover:border-gray-700/70 hover:bg-white/[0.01] relative"
          >
            {/* Line 01 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">01</span>
              <div>
                <span className="text-purple-400">class </span>
                <span className="text-yellow-200">SwayamPanda </span>
                <span className="text-gray-300">extends </span>
                <span className="text-yellow-200">Developer </span>
                <span className="text-gray-300">{"{"}</span>
              </div>
            </div>

            {/* Line 02 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">02</span>
              <div className="pl-4">
                <span className="text-purple-400">constructor</span>
                <span className="text-gray-300">() {"{"}</span>
              </div>
            </div>

            {/* Line 03 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">03</span>
              <div className="pl-8">
                <span className="text-red-400">this</span>
                <span className="text-gray-300">.name = </span>
                <span className="text-green-300">&apos;{profile.name}&apos;</span>
                <span className="text-gray-300">;</span>
              </div>
            </div>

            {/* Line 04 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">04</span>
              <div className="pl-8">
                <span className="text-red-400">this</span>
                <span className="text-gray-300">.role = </span>
                <span className="text-green-300">&apos;ML Systems + Full-Stack Builder&apos;</span>
                <span className="text-gray-300">;</span>
              </div>
            </div>

            {/* Line 05 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">05</span>
              <div className="pl-8">
                <span className="text-red-400">this</span>
                <span className="text-gray-300">.skills = [</span>
                <span className="text-green-300">&apos;Python&apos;</span>
                <span className="text-gray-300">, </span>
                <span className="text-green-300">&apos;RAG&apos;</span>
                <span className="text-gray-300">, </span>
                <span className="text-green-300">&apos;Plotly&apos;</span>
                <span className="text-gray-300">];</span>
              </div>
            </div>

            {/* Line 06 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">06</span>
              <div className="pl-4">
                <span className="text-gray-300">{"}"}</span>
              </div>
            </div>

            {/* Line 07 */}
            <div className="flex mt-2">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">07</span>
              <div className="pl-4">
                <span className="text-blue-400">sayHello</span>
                <span className="text-gray-300">() {"{"}</span>
              </div>
            </div>

            {/* Line 08 - Typewriter */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">08</span>
              <div className="pl-8 w-full">
                <span className="text-purple-400">return </span>
                <span className="typing-container text-green-300">
                  &quot;Building ML systems, RAG apps, and useful web platforms.&quot;
                </span>
              </div>
            </div>

            {/* Line 09 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">09</span>
              <div className="pl-4">
                <span className="text-gray-300">{"}"}</span>
              </div>
            </div>

            {/* Line 10 */}
            <div className="flex">
              <span className="text-gray-600 mr-4 select-none w-6 text-right">10</span>
              <div>
                <span className="text-gray-300">{"}"}</span>
              </div>
            </div>
          </div>

          {/* Terminal CTA — appears below code block */}
          <div
            onClick={open}
            className="mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-md border border-dashed border-gray-800 hover:border-gray-600 cursor-pointer group/cta transition-all duration-300 hover:bg-white/[0.02] relative"
          >
            {/* Floating Onboarding Tooltip */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-blue-600/90 backdrop-blur-sm border border-blue-400 text-white text-xs py-2 px-4 rounded shadow-xl whitespace-nowrap animate-bounce pointer-events-none z-10 hidden md:block">
              Hey! This is a fully interactive terminal. Click here and run <strong className="text-yellow-300 font-mono">demo</strong> to see!
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600/90 border-r border-b border-blue-400 rotate-45"></div>
            </div>

            <span className="text-green-500 font-[family-name:var(--font-fira-code)] text-sm group-hover/cta:text-green-400 transition-colors">
              $
            </span>
            <span className="text-gray-500 font-[family-name:var(--font-fira-code)] text-xs group-hover/cta:text-gray-300 transition-colors">
              click here to launch terminal
            </span>
            <span className="text-gray-700 font-[family-name:var(--font-fira-code)] text-[10px] ml-2 group-hover/cta:text-gray-500 transition-colors hidden md:inline">
              or press Ctrl+`
            </span>
            <span className="ml-auto text-gray-700 group-hover/cta:text-green-500 transition-colors terminal-cursor">
              ▋
            </span>
          </div>

          {/* Status Bar */}
          <div className="flex justify-between items-center mt-6 text-xs font-[family-name:var(--font-fira-code)] text-gray-500 px-4">
            <div className="flex items-center space-x-2 md:space-x-4">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                <span className="hidden sm:inline">Available for hire</span>
                <span className="sm:hidden">Open</span>
              </span>
              <span className="hidden sm:inline">utf-8</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <span className="hidden sm:inline">Ln 8, Col 36</span>
              <span>JavaScript</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
