"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SnakeGame from "@/components/SnakeGame";
import MatrixRain from "@/components/MatrixRain";
import {
    fortunes,
    cowsay,
    getNeofetch,
    getWelcomeBanner,
    getWeatherDescription,
    getWeatherIcon,
    getLocalAIResponse,
    availableCommands,
} from "@/lib/terminal-data";
import { profile, projects, skillCategories } from "@/lib/profile-data";

export type TLine = {
    text: string;
    className?: string;
};

type TerminalMode = "terminal" | "snake";

const out = (text: string, className = "text-gray-400"): TLine => ({
    text,
    className,
});

const aiLineClass = (line: string) =>
    line.includes("━")
        ? "text-blue-400"
        : line.startsWith("  ->") || line.startsWith("  •")
            ? "text-gray-300"
            : "text-cyan-400";

interface TerminalCoreProps {
    /** If true, renders just the terminal body (no chrome/titlebar). Used inside overlay. */
    embedded?: boolean;
    /** Called when user types "exit" in embedded mode */
    onExit?: () => void;
    /** Command to auto-run on mount (e.g. "social" for contact page) */
    initialCommand?: string;
}

export default function TerminalCore({ embedded = false, onExit, initialCommand }: TerminalCoreProps) {
    const [history, setHistory] = useState<TLine[]>(getWelcomeBanner());
    const [input, setInput] = useState("");
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const [mode, setMode] = useState<TerminalMode>("terminal");
    const [matrixActive, setMatrixActive] = useState(false);
    const [startTime] = useState(() => Date.now());
    const [theme, setTheme] = useState<"default" | "amber" | "matrix">("default");
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    // Auto-focus when rendered
    useEffect(() => {
        const t = setTimeout(() => inputRef.current?.focus(), 50);
        return () => clearTimeout(t);
    }, []);

    // Track whether initial command has been run
    const initialCommandRan = useRef(false);

    const getUptime = useCallback(() => {
        const ms = Date.now() - startTime;
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }, [startTime]);

    const addLines = useCallback((lines: TLine[]) => {
        setHistory((prev) => [...prev, ...lines]);
    }, []);

    const processCommand = useCallback(
        async (cmd: string) => {
            const trimmed = cmd.trim();
            const parts = trimmed.split(/\s+/);
            const command = parts[0].toLowerCase();
            const args = parts.slice(1).join(" ");
            const lines: TLine[] = [out(`$ ${cmd}`, "text-white")];

            switch (command) {
                case "help": {
                    lines.push(
                        out(""),
                        out("  Available Commands", "text-yellow-400"),
                        out("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"),
                        out(""),
                        out("  General", "text-blue-400"),
                        out("    help          Show this help message"),
                        out("    clear         Clear terminal"),
                        out("    history       Show command history"),
                        out("    banner        Show welcome banner"),
                        out("    date          Show current date/time"),
                        out("    uptime        Show session uptime"),
                        out("    theme <name>  Switch theme (default/amber/matrix)"),
                        out(""),
                        out("  About Me", "text-green-400"),
                        out("    whoami        Display profile information"),
                        out("    social        Show social media links"),
                        out("    email         Get email address"),
                        out("    skills        List technical skills"),
                        out("    projects      List notable projects"),
                        out("    neofetch      System info, but make it cool"),
                        out(""),
                        out("  Interactive", "text-purple-400"),
                        out("    ask <query>   Ask anything about Swayam (AI)"),
                        out("    message       Compose an email"),
                        out("    resume        Download resume"),
                        out("    weather       Current weather in Daman"),
                        out("    fortune       Random programming quote"),
                        out("    cowsay <msg>  Make a cow say something"),
                        out(""),
                        out("  Fun & Games", "text-red-400"),
                        out("    snake         Play Snake game"),
                        out("    matrix        Toggle matrix rain effect"),
                        out("    ping <host>   Ping a host"),
                        out("    man           Read the manual"),
                        out(""),
                        out('  Tip: Use Tab for auto-complete, Ctrl+L to clear', "text-gray-600"),
                        out("")
                    );
                    break;
                }

                case "whoami": {
                    lines.push(
                        out(""),
                        out("  ┌───────────────────────────────────────────┐", "text-gray-700"),
                        out("  │                                           │", "text-gray-700"),
                        out("  │   Swayam Prakash Panda                   │", "text-green-400"),
                        out("  │   B.Tech CSE (AI & ML) - VIT Bhopal      │", "text-gray-300"),
                        out(`  │   CGPA: ${profile.cgpa.padEnd(13)} IEEE Researcher │`, "text-gray-300"),
                        out("  │   FOSSEE Intern @ IIT Bombay             │", "text-gray-500"),
                        out("  │   Student Coordinator @ GfG VIT Bhopal   │", "text-gray-500"),
                        out("  │   Daman, India                           │", "text-gray-600"),
                        out("  │                                           │", "text-gray-700"),
                        out("  └───────────────────────────────────────────┘", "text-gray-700"),
                        out("")
                    );
                    break;
                }

                case "social": {
                    lines.push(
                        out(""),
                        out("  Social Links", "text-blue-400"),
                        out("  ━━━━━━━━━━━━"),
                        out("  github      -> github.com/Swayam200"),
                        out("  linkedin    -> linkedin.com/in/swayam200"),
                        out("  website     -> swayam200.me"),
                        out(`  email       -> ${profile.email}`),
                        out("")
                    );
                    break;
                }

                case "email": {
                    lines.push(out(""), out(`  ${profile.email}`, "text-green-400"), out('  Type "message" to compose an email.'), out(""));
                    break;
                }

                case "message": {
                    lines.push(out(""), out("  Opening email client...", "text-blue-400"), out(""));
                    window.open(`mailto:${profile.email}?subject=Hello from Portfolio`, "_blank");
                    break;
                }

                case "resume": {
                    lines.push(out(""), out("  Downloading resume...", "text-blue-400"), out(""));
                    const link = document.createElement("a");
                    link.href = "/resume.pdf";
                    link.download = "Swayam_Prakash_Panda_Resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    break;
                }

                case "clear": {
                    setHistory([]);
                    setCmdHistory((prev) => [cmd, ...prev]);
                    setHistoryIdx(-1);
                    return;
                }

                case "history": {
                    lines.push(out(""));
                    if (cmdHistory.length === 0) {
                        lines.push(out("  No command history yet."));
                    } else {
                        cmdHistory.slice().reverse().forEach((c, i) => {
                            lines.push(out(`  ${(i + 1).toString().padStart(4)}  ${c}`));
                        });
                    }
                    lines.push(out(""));
                    break;
                }

                case "date": {
                    const now = new Date();
                    lines.push(
                        out(""),
                        out(`  ${now.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}`, "text-yellow-400"),
                        out("")
                    );
                    break;
                }

                case "uptime": {
                    lines.push(out(""), out(`  Session uptime: ${getUptime()}`, "text-green-400"), out("  Portfolio running since the dawn of ambition.", "text-gray-600"), out(""));
                    break;
                }

                case "neofetch": {
                    const nf = getNeofetch(getUptime());
                    nf.forEach((line) => {
                        const isArt = line.includes("█") || line.includes("╗") || line.includes("╚") || line.includes("═") || line.includes("║");
                        const isLabel = line.includes(":") && !isArt;
                        const isDot = line.includes("●");
                        lines.push(out(line, isDot ? "text-purple-400" : isArt ? "text-green-400" : isLabel ? "text-cyan-400" : "text-white"));
                    });
                    break;
                }

                case "skills": {
                    lines.push(
                        out(""),
                        out("  const skills = {", "text-white"),
                        ...skillCategories.map((category) =>
                            out(`    ${category.label.replace("// ", "").toLowerCase().replace(/[^a-z0-9]+/g, "_")}: ["${category.skills.join('", "')}"],`, category.color)
                        ),
                        out("  };", "text-white"),
                        out("")
                    );
                    break;
                }

                case "projects": {
                    lines.push(
                        out(""),
                        out("  Notable Projects", "text-yellow-400"),
                        out("  ━━━━━━━━━━━━━━━━"),
                        ...projects.flatMap((project) => [
                            out(`  -> ${project.name} (${project.date})`, "text-green-400"),
                            out(`     ${project.tech.slice(0, 4).join(" + ")}`, "text-gray-500"),
                        ]),
                        out(""),
                        out('  Visit /projects for full details.', "text-gray-500"),
                        out("")
                    );
                    break;
                }

                case "weather": {
                    lines.push(out(""), out("  Fetching weather for Daman...", "text-blue-400"));
                    addLines(lines);
                    setCmdHistory((prev) => [cmd, ...prev]);
                    setHistoryIdx(-1);
                    try {
                        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=20.42&longitude=72.85&current_weather=true");
                        const data = await res.json();
                        const w = data.current_weather;
                        const desc = getWeatherDescription(w.weathercode);
                        const icon = getWeatherIcon(w.weathercode);
                        addLines([
                            out(""),
                            out("  Weather in Daman, India", "text-white"),
                            out("  ━━━━━━━━━━━━━━━━━━━━━━━━"),
                            out(`  Condition:   ${icon} ${desc}`, "text-green-400"),
                            out(`  Temperature: ${w.temperature}°C`, "text-yellow-400"),
                            out(`  Wind Speed:  ${w.windspeed} km/h`, "text-blue-400"),
                            out(""),
                        ]);
                    } catch {
                        addLines([out("  Failed to fetch weather data.", "text-red-400"), out("  Check your internet connection."), out("")]);
                    }
                    return;
                }

                case "fortune": {
                    const quote = fortunes[Math.floor(Math.random() * fortunes.length)];
                    lines.push(out(""), out(`  ${quote}`, "text-yellow-400"), out(""));
                    break;
                }

                case "cowsay": {
                    const msg = args || "Moo! Type cowsay <your message>";
                    const cowLines = cowsay(msg);
                    lines.push(out(""));
                    cowLines.forEach((l) => lines.push(out(`  ${l}`, "text-white")));
                    lines.push(out(""));
                    break;
                }

                case "matrix": {
                    const nextState = !matrixActive;
                    setMatrixActive(nextState);
                    lines.push(out(""), out(nextState ? '  Matrix rain activated. Type "matrix" again to stop.' : "  Matrix rain deactivated.", "text-green-400"), out(""));
                    break;
                }

                case "snake": {
                    addLines([...lines, out(""), out("  Starting Snake...", "text-green-400"), out("  Use arrow keys or WASD. Q to quit.", "text-gray-500"), out("")]);
                    setCmdHistory((prev) => [cmd, ...prev]);
                    setHistoryIdx(-1);
                    setTimeout(() => setMode("snake"), 500);
                    return;
                }

                case "ask": {
                    const localResponse = getLocalAIResponse(args);
                    if (localResponse.matched) {
                        localResponse.lines.forEach((line) => {
                            lines.push(out(line, aiLineClass(line)));
                        });
                        break;
                    }

                    addLines([...lines, out(""), out("  No exact terminal match. Trying AI fallback...", "text-gray-500")]);
                    setCmdHistory((prev) => [cmd, ...prev]);
                    setHistoryIdx(-1);
                    try {
                        const res = await fetch("/api/chat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ query: args }),
                        });
                        const data = (await res.json()) as { lines?: string[]; source?: string };
                        const responseLines = data.lines?.length ? data.lines : localResponse.lines;
                        addLines(responseLines.map((line) => out(line, aiLineClass(line))));
                    } catch {
                        addLines(localResponse.lines.map((line) => out(line, aiLineClass(line))));
                    }
                    return;
                }

                case "echo": {
                    lines.push(out(args || ""));
                    break;
                }

                case "banner": {
                    const bannerLines = getWelcomeBanner();
                    bannerLines.forEach((l) => lines.push(l));
                    break;
                }

                case "ping": {
                    const host = args || "portfolio.dev";
                    lines.push(out(`  PING ${host} (127.0.0.1): 56 data bytes`));
                    for (let i = 0; i < 4; i++) {
                        const ms = (Math.random() * 20 + 5).toFixed(1);
                        lines.push(out(`  64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${ms} ms`));
                    }
                    lines.push(out(""), out(`  --- ${host} ping statistics ---`), out("  4 packets transmitted, 4 received, 0% packet loss"), out(""));
                    break;
                }

                case "sudo": {
                    lines.push(out(""), out("  Nice try! You don't have root access on this portfolio.", "text-red-400"), out("  Swayam is the only superuser here."), out(""));
                    break;
                }

                case "cat": {
                    if (args.toLowerCase().includes("readme") || args.toLowerCase().includes("about")) {
                        lines.push(out(""), out("  # Swayam Prakash Panda", "text-green-400"), out(`  B.Tech CSE (AI & ML) - VIT Bhopal | CGPA: ${profile.cgpa}`), out("  IEEE Researcher | ML Systems | Full-Stack Builder"), out(""), out("  FOSSEE Intern @ IIT Bombay"), out("  Student Coordinator @ GfG VIT Bhopal"), out('  Type "ask" followed by a question to learn more.'), out(""));
                    } else if (args.toLowerCase().includes("passwd") || args.toLowerCase().includes("etc")) {
                        lines.push(out(""), out("  Nice try, hacker!", "text-red-400"), out(""));
                    } else {
                        lines.push(out(`  cat: ${args || "(no file)"}: No such file or directory`, "text-red-400"));
                    }
                    break;
                }

                case "ls": {
                    lines.push(out(""), out("  drwxr-xr-x  about/     projects/     achievements/", "text-blue-400"), out("  -rw-r--r--  README.md  package.json  .gitignore"), out("  -rw-r--r--  resume.pdf skills.json"), out(""));
                    break;
                }

                case "cd": {
                    if (args === ".." || args === "/") {
                        lines.push(out("  Already at the root of awesomeness!"));
                    } else if (args === "projects" || args === "/projects") {
                        lines.push(out("  Redirecting to projects...", "text-blue-400"));
                    } else {
                        lines.push(out(`  cd: ${args || "~"}: Always at home here`));
                    }
                    break;
                }

                case "pwd": {
                    lines.push(out("  /home/swayam/portfolio", "text-blue-400"));
                    break;
                }

                case "man": {
                    lines.push(
                        out(""),
                        out("  SWAYAM(1)       Portfolio Manual       SWAYAM(1)", "text-yellow-400"),
                        out(""),
                        out("  NAME", "text-white"),
                        out("    swayam - IEEE researcher, developer & problem solver"),
                        out(""),
                        out("  SYNOPSIS", "text-white"),
                        out("    swayam [--skill SKILL] [--project PROJECT]"),
                        out(""),
                        out("  DESCRIPTION", "text-white"),
                        out("    B.Tech CSE student (AI & ML) at VIT Bhopal."),
                        out("    IEEE-published researcher building ML systems,"),
                        out(`    RAG apps, and web platforms. CGPA: ${profile.cgpa}.`),
                        out(""),
                        out("  SEE ALSO", "text-white"),
                        out("    whoami(1), skills(1), ask(1), projects(1)"),
                        out("")
                    );
                    break;
                }

                case "vim":
                case "nano": {
                    lines.push(out(""), out(`  You've opened ${command}. Good luck getting out!`, "text-yellow-400"), out("  (Just kidding, this is a web terminal)"), out(""));
                    break;
                }

                case "exit": {
                    if (embedded && onExit) {
                        onExit();
                        return;
                    }
                    lines.push(out(""), out("  There's no escape from this portfolio!", "text-yellow-400"), out("  (But feel free to explore other pages)"), out(""));
                    break;
                }

                case "rm": {
                    if (args.includes("-rf") || args.includes("/")) {
                        lines.push(out(""), out("  I appreciate the chaos energy, but no.", "text-red-400"), out("  This portfolio shall persist."), out(""));
                    } else {
                        lines.push(out(`  rm: ${args}: Permission denied`, "text-red-400"));
                    }
                    break;
                }

                case "grep": {
                    lines.push(out(""), out("  grep: searching portfolio for talent...", "text-green-400"), out("  Found: 1 result"), out("  → Swayam Prakash Panda (match: 100%)", "text-yellow-400"), out(""));
                    break;
                }

                case "theme": {
                    const themeName = args.toLowerCase();
                    if (themeName === "default" || themeName === "amber" || themeName === "matrix") {
                        setTheme(themeName);
                        lines.push(out(""), out(`  Theme switched to "${themeName}".`, "text-green-400"), out(""));
                    } else {
                        lines.push(out(""), out("  Available themes: default, amber, matrix", "text-yellow-400"), out("  Usage: theme <name>"), out(""));
                    }
                    break;
                }

                case "": {
                    break;
                }

                default: {
                    const fullQuery = trimmed;
                    const localResponse = getLocalAIResponse(fullQuery);
                    if (localResponse.matched) {
                        localResponse.lines.forEach((line) => {
                            lines.push(out(line, aiLineClass(line)));
                        });
                        break;
                    }

                    addLines([...lines, out(""), out("  Command not found. Trying AI fallback...", "text-gray-500")]);
                    setCmdHistory((prev) => [cmd, ...prev]);
                    setHistoryIdx(-1);
                    try {
                        const res = await fetch("/api/chat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ query: fullQuery }),
                        });
                        const data = (await res.json()) as { lines?: string[]; source?: string };
                        const responseLines = data.lines?.length ? data.lines : localResponse.lines;
                        addLines(responseLines.map((line) => out(line, aiLineClass(line))));
                    } catch {
                        addLines(localResponse.lines.map((line) => out(line, aiLineClass(line))));
                    }
                    return;
                }
            }

            addLines(lines);
            setCmdHistory((prev) => [cmd, ...prev]);
            setHistoryIdx(-1);
        },
        [addLines, cmdHistory, getUptime, matrixActive, embedded, onExit]
    );

    // Run initial command on mount (e.g. show contact info on contact page)
    useEffect(() => {
        if (initialCommand && !initialCommandRan.current) {
            initialCommandRan.current = true;
            // Small delay so the welcome banner renders first
            const t = setTimeout(() => processCommand(initialCommand), 100);
            return () => clearTimeout(t);
        }
    }, [initialCommand, processCommand]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            processCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIdx < cmdHistory.length - 1) {
                const newIdx = historyIdx + 1;
                setHistoryIdx(newIdx);
                setInput(cmdHistory[newIdx]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIdx > 0) {
                const newIdx = historyIdx - 1;
                setHistoryIdx(newIdx);
                setInput(cmdHistory[newIdx]);
            } else {
                setHistoryIdx(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const partial = input.toLowerCase().trim();
            if (!partial) return;
            const matches = availableCommands.filter((c) => c.startsWith(partial));
            if (matches.length === 1) {
                setInput(matches[0] + " ");
            } else if (matches.length > 1) {
                addLines([out(`$ ${input}`, "text-white"), out(`  ${matches.join("  ")}`, "text-gray-500")]);
            }
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        } else if (e.key === "c" && e.ctrlKey) {
            e.preventDefault();
            addLines([out(`$ ${input}^C`, "text-white")]);
            setInput("");
        }
    };

    const handleSnakeExit = (score: number) => {
        setMode("terminal");
        addLines([out(""), out(`  Snake game ended! Final score: ${score}`, "text-green-400"), out("")]);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const focusInput = () => inputRef.current?.focus();

    const themeColors = {
        default: { prompt: "text-green-400", text: "text-white" },
        amber: { prompt: "text-amber-400", text: "text-amber-200" },
        matrix: { prompt: "text-green-500", text: "text-green-300" },
    };
    const ct = themeColors[theme];

    const terminalBody = (
        <>
            {/* Matrix Rain Overlay */}
            <MatrixRain active={matrixActive} />

            {mode === "snake" ? (
                <div className="flex-grow min-h-0 p-4">
                    <SnakeGame onExit={handleSnakeExit} />
                </div>
            ) : (
                <div
                    ref={terminalRef}
                    className="flex-grow overflow-y-auto overflow-x-auto p-4 font-[family-name:var(--font-fira-code)] text-xs md:text-sm cursor-text min-h-0 relative z-20"
                    onClick={focusInput}
                >
                    {history.map((line, index) => (
                        <div key={index} className={`${line.className || "text-gray-400"} leading-6 whitespace-pre`}>
                            {line.text || "\u00A0"}
                        </div>
                    ))}
                    <div className="flex items-center leading-6">
                        <span className={`${ct.prompt} mr-2`}>$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`bg-transparent border-none outline-none ${ct.text} flex-grow font-[family-name:var(--font-fira-code)] text-sm caret-green-400`}
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                </div>
            )}
        </>
    );

    if (embedded) {
        // No chrome — just the terminal body in a container
        return (
            <div className="flex flex-col h-full bg-[#080808] relative overflow-hidden">
                {terminalBody}
            </div>
        );
    }

    // Full terminal with title bar chrome
    return (
        <div className="flex-grow flex flex-col bg-[#080808] border border-gray-800 rounded-lg overflow-hidden min-h-0 relative">
            {/* Title Bar */}
            <div className="flex items-center justify-between bg-[#111111] border-b border-gray-800 px-4 py-2.5 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <span className="text-xs text-gray-500 font-[family-name:var(--font-fira-code)]">
                    swayam@portfolio ~ {mode === "snake" ? "(snake)" : matrixActive ? "(matrix)" : "zsh"}
                </span>
                <span className="text-[10px] text-gray-600 font-[family-name:var(--font-fira-code)]">v2.0.0</span>
            </div>
            {terminalBody}
        </div>
    );
}
