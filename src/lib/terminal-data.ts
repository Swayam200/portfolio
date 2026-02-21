// Fortune quotes
export const fortunes: string[] = [
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"Java is to JavaScript what car is to carpet." — Chris Heilmann',
    '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
    '"Fix the cause, not the symptom." — Steve Maguire',
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"Make it work, make it right, make it fast." — Kent Beck',
    '"The best error message is the one that never shows up." — Thomas Fuchs',
    '"If debugging is the process of removing software bugs, then programming must be the process of putting them in." — Edsger Dijkstra',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton',
    '"It works on my machine." — Every Developer Ever',
    '"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry',
    '"The only way to learn a new programming language is by writing programs in it." — Dennis Ritchie',
    '"Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson',
    '"In theory, there is no difference between theory and practice. But, in practice, there is." — Jan L. A. van de Snepscheut',
    '"Measuring programming progress by lines of code is like measuring aircraft building progress by weight." — Bill Gates',
    '"Walking on water and developing software from a specification are easy if both are frozen." — Edward V. Berard',
];

// Cowsay
export function cowsay(text: string): string[] {
    const maxWidth = 40;
    const words = text.split(" ");
    const wrappedLines: string[] = [];
    let currentLine = "";

    for (const word of words) {
        if (currentLine.length + word.length + 1 > maxWidth && currentLine) {
            wrappedLines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = currentLine ? `${currentLine} ${word}` : word;
        }
    }
    if (currentLine) wrappedLines.push(currentLine);
    if (wrappedLines.length === 0) wrappedLines.push("...");

    const width = Math.max(...wrappedLines.map((l) => l.length));
    const top = " " + "_".repeat(width + 2);
    const bottom = " " + "-".repeat(width + 2);

    const lines: string[] = [top];

    if (wrappedLines.length === 1) {
        lines.push(`< ${wrappedLines[0].padEnd(width)} >`);
    } else {
        wrappedLines.forEach((line, i) => {
            const padded = line.padEnd(width);
            if (i === 0) lines.push(`/ ${padded} \\`);
            else if (i === wrappedLines.length - 1) lines.push(`\\ ${padded} /`);
            else lines.push(`| ${padded} |`);
        });
    }

    lines.push(bottom);
    lines.push("        \\   ^__^");
    lines.push("         \\  (oo)\\_______");
    lines.push("            (__)\\       )\\/\\");
    lines.push("                ||----w |");
    lines.push("                ||     ||");

    return lines;
}

// Neofetch
export function getNeofetch(uptimeStr: string): string[] {
    return [
        "",
        "      ███████╗██████╗      swayam@portfolio",
        "      ██╔════╝██╔══██╗     ─────────────────",
        "      ███████╗██████╔╝     OS: SwayamOS v2.0.0",
        "      ╚════██║██╔═══╝      Host: swayampanda.dev",
        "      ███████║██║          Kernel: Next.js 16",
        `      ╚══════╝╚═╝          Uptime: ${uptimeStr}`,
        "                            Shell: zsh 5.9",
        "                            Terminal: SwayamTerm v2.0",
        "                            Theme: tokyo-night",
        "                            Repos: 46 (github)",
        "                            CPU: BERT-base @ ∞GHz",
        "                            GPA: 8.64 / 10.00",
        "",
        "      ● ● ● ● ● ● ● ●",
        "",
    ];
}

// Welcome banner
export function getWelcomeBanner(): Array<{ text: string; className: string }> {
    const asciiArt = [
        "   ███████╗██╗    ██╗ █████╗ ██╗   ██╗ █████╗ ███╗   ███╗",
        "   ██╔════╝██║    ██║██╔══██╗╚██╗ ██╔╝██╔══██╗████╗ ████║",
        "   ███████╗██║ █╗ ██║███████║ ╚████╔╝ ███████║██╔████╔██║",
        "   ╚════██║██║███╗██║██╔══██║  ╚██╔╝  ██╔══██║██║╚██╔╝██║",
        "   ███████║╚███╔███╔╝██║  ██║   ██║   ██║  ██║██║ ╚═╝ ██║",
        "   ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝",
    ];

    return [
        { text: "", className: "text-gray-400" },
        ...asciiArt.map((line) => ({ text: line, className: "text-green-500" })),
        { text: "", className: "text-gray-400" },
        {
            text: "   Welcome to SwayamPanda.terminal v2.0.0",
            className: "text-gray-300",
        },
        {
            text: '   Type "help" for all commands, or "ask <question>" to chat with my AI.',
            className: "text-gray-500",
        },
        { text: "", className: "text-gray-400" },
    ];
}

// Weather code mapping
export function getWeatherDescription(code: number): string {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Partly cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 55) return "Drizzle";
    if (code <= 65) return "Rainy";
    if (code <= 75) return "Snowy";
    if (code <= 82) return "Showers";
    if (code === 95) return "Thunderstorm";
    return "Unknown";
}

export function getWeatherIcon(code: number): string {
    if (code === 0) return "☀";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫";
    if (code <= 55) return "🌧";
    if (code <= 65) return "🌧";
    if (code <= 75) return "❄";
    if (code <= 82) return "🌦";
    if (code === 95) return "⛈";
    return "🌤";
}

// AI Responses about Swayam
interface AIEntry {
    patterns: RegExp[];
    response: string[];
}

const aiEntries: AIEntry[] = [
    {
        patterns: [
            /who\s*(are|is)\s*(you|swayam|he)/i,
            /about\s*(swayam|you|him|yourself)/i,
            /tell\s*me\s*about/i,
            /introduce/i,
            /^who$/i,
        ],
        response: [
            "  Swayam Prakash Panda",
            "  ━━━━━━━━━━━━━━━━━━━━",
            "  B.Tech CSE (AI & ML) student at VIT Bhopal (2023-2027).",
            "  GPA: 8.64/10.00",
            "",
            "  IEEE-published researcher in cross-platform misinformation",
            "  detection. Experienced in NLP, transfer learning, and",
            "  full-stack development. Club Coordinator at GfG VIT Bhopal",
            "  and Technical Team Lead at VITB AI Innovators Hub.",
        ],
    },
    {
        patterns: [
            /skill|tech|stack|language|framework|tools?|what.*know|what.*use/i,
        ],
        response: [
            "  Technical Skills",
            "  ━━━━━━━━━━━━━━━",
            "  Languages   → Python, C++, TypeScript, JavaScript",
            "  ML & NLP    → BERT, scikit-learn, pandas, YOLOv8",
            "  Frontend    → React, Next.js, Tailwind CSS",
            "  Backend     → Node.js, Express, FastAPI, Django",
            "  Vision      → OpenCV, PyQt5, Feature Extraction",
            "  Tools       → Git, PostgreSQL, GCP, AWS, MongoDB",
        ],
    },
    {
        patterns: [
            /educat|college|university|school|degree|study|student|where.*study/i,
        ],
        response: [
            "  Education",
            "  ━━━━━━━━━",
            "  VIT Bhopal University",
            "  B.Tech Computer Science & Engineering",
            "  Specialization: AI & Machine Learning",
            "  May 2023 — May 2027 • GPA: 8.64/10.00",
            "  Bhopal, India",
        ],
    },
    {
        patterns: [/contact|reach|email|mail|connect|hire|avail|recruit|job/i],
        response: [
            "  Contact Information",
            "  ━━━━━━━━━━━━━━━━━━",
            "  Email:     swayam.panda200@gmail.com",
            "  GitHub:    github.com/Swayam200",
            "  LinkedIn:  linkedin.com/in/swayam200",
            "  Twitter:   twitter.com/swayam200",
            "",
            "  Based in Daman, India • Studying at VIT Bhopal",
            "  Open to opportunities and collaborations!",
        ],
    },
    {
        patterns: [/project|work|portfolio|built|made|create/i],
        response: [
            "  Projects & Work",
            "  ━━━━━━━━━━━━━━━",
            "  → BERT Misinformation Detection (IEEE paper)",
            "  → Carbon Sleuth (Django + React + PyQt5)",
            "  → Goldfish Password Generator (OpenCV + Crypto)",
            "  → Leptospirosis Risk Predictor (ML)",
            "  → Darzi AI Resume Suite (TypeScript, 75+ team)",
            "  → Blood Cell Detection (YOLOv8)",
            "  → Abusive Language Censoring API (FastAPI)",
            "",
            '  Check out the Projects page or type "projects" for details!',
        ],
    },
    {
        patterns: [/experience|intern|company|work.*at|job.*history|employ/i],
        response: [
            "  Professional Experience",
            "  ━━━━━━━━━━━━━━━━━━━━━━",
            "  • GfG VIT Bhopal — Club Coordinator (Dec 2025-Present)",
            "  • VITB AI Innovators Hub — Tech Lead (Sep 2025-Present)",
            "  • IIT Ropar — Winter Intern (Dec 2025-Jan 2026)",
            "  • IEEE RCSM 2025 — Published researcher",
            "",
            "  Visit the About page for the full timeline!",
        ],
    },
    {
        patterns: [/research|paper|publication|ieee|bert|misinformation/i],
        response: [
            "  Research & Publications",
            "  ━━━━━━━━━━━━━━━━━━━━━━",
            "  IEEE RCSM 2025 (SCOPUS indexed, IEEE Xplore)",
            "  'Evaluating the Portability of BERT-based",
            "  Misinformation Detection from Twitter to Bluesky'",
            "",
            "  • Baseline F1: 0.64 (LIAR dataset)",
            "  • Zero-shot transfer to Bluesky: F1 0.73",
            "  • After fine-tuning: F1 0.997",
            "",
            "  Presented at MANIT Bhopal conference.",
        ],
    },
    {
        patterns: [/interest|hobby|passion|like|enjoy|fun|free.*time/i],
        response: [
            "  Interests & Hobbies",
            "  ━━━━━━━━━━━━━━━━━━",
            "  • NLP research & experimentation",
            "  • Full-stack development",
            "  • Computer vision projects",
            "  • Competitive programming (Codeforces)",
            "  • Hackathons & building prototypes",
            "  • Reading",
        ],
    },
    {
        patterns: [/locat|where.*live|where.*from|city|country|place/i],
        response: [
            "  From Daman, Daman and Diu, India",
            "  Currently studying at VIT Bhopal University",
            "  Open to remote & relocation opportunities",
        ],
    },
    {
        patterns: [/github|git|repo|open.?source/i],
        response: [
            "  GitHub: github.com/Swayam200",
            "  46 repositories • 8 followers",
            "  Notable: goldfish_password_generator (2★),",
            "  Leptospirosis-Predictor (5★), carbon-sleuth (1★)",
        ],
    },
    {
        patterns: [/linkedin|professional/i],
        response: [
            "  LinkedIn: linkedin.com/in/swayam200",
            "  500+ connections",
            "  Connect with Swayam for professional networking.",
        ],
    },
    {
        patterns: [/certif/i],
        response: [
            "  Certifications",
            "  ━━━━━━━━━━━━━━",
            "  • Google Data Analytics Professional Certificate (Jul 2025)",
            "  • Cloud Computing — NPTEL (May 2025)",
            "  • Applied Machine Learning in Python — UMich (Dec 2024)",
        ],
    },
    {
        patterns: [/hello|hi|hey|sup|what.*up|howdy|greet/i],
        response: [
            "  Hey there! 👋",
            "  I'm Swayam's portfolio AI. Ask me anything about him!",
            '  Try: "What skills does Swayam have?"',
            '  Or: "Tell me about his research"',
        ],
    },
    {
        patterns: [/thank|thanks|thx|nice|cool|awesome|great|good/i],
        response: [
            "  Glad I could help!",
            "  Feel free to ask more questions or explore the terminal.",
            '  Type "help" to see all available commands!',
        ],
    },
    {
        patterns: [/age|old|born|birthday|year/i],
        response: [
            "  Swayam is a pre-final year student (Class of 2027).",
            "  Young, ambitious, and already an IEEE-published researcher!",
        ],
    },
    {
        patterns: [/resume|cv/i],
        response: [
            '  Type "resume" to download Swayam\'s resume.',
            "  It includes his full experience, skills, and education.",
        ],
    },
    {
        patterns: [/gpa|grade|cgpa|score/i],
        response: [
            "  Academic Performance",
            "  ━━━━━━━━━━━━━━━━━━━",
            "  GPA: 8.64 / 10.00",
            "  VIT Bhopal University — B.Tech CSE (AI & ML)",
        ],
    },
];

export function getAIResponse(query: string): string[] {
    const trimmed = query.trim();
    if (!trimmed) {
        return ['  Please ask a question! Try: "ask who is swayam?"'];
    }

    for (const entry of aiEntries) {
        for (const pattern of entry.patterns) {
            if (pattern.test(trimmed)) {
                return ["", ...entry.response, ""];
            }
        }
    }

    return [
        "",
        "  I'm not sure how to answer that specific question.",
        "  Here are some things you can ask me:",
        "",
        '  • "Who is Swayam?"',
        '  • "What are his skills?"',
        '  • "Where does he study?"',
        '  • "How can I contact him?"',
        '  • "What projects has he built?"',
        '  • "What are his interests?"',
        "",
    ];
}

// Available commands for tab completion
export const availableCommands = [
    "help",
    "whoami",
    "social",
    "email",
    "message",
    "resume",
    "clear",
    "history",
    "date",
    "uptime",
    "neofetch",
    "skills",
    "projects",
    "weather",
    "fortune",
    "cowsay",
    "matrix",
    "snake",
    "ask",
    "echo",
    "banner",
    "ping",
    "sudo",
    "cat",
    "ls",
    "cd",
    "pwd",
    "man",
    "vim",
    "nano",
    "exit",
    "theme",
    "rm",
    "grep",
    "whoami",
];
