import {
    achievements,
    education,
    experiences,
    profile,
    projects,
    publications,
    searchableFacts,
    skillCategories,
} from "@/lib/profile-data";

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
        "      ╚════██║██╔═══╝      Host: swayam200.me",
        "      ███████║██║          Kernel: Next.js 16",
        `      ╚══════╝╚═╝          Uptime: ${uptimeStr}`,
        "                            Shell: zsh 5.9",
        "                            Terminal: SwayamTerm v2.0",
        "                            Theme: tokyo-night",
        `                            Projects: ${projects.length} featured`,
        "                            CPU: BERT-base @ ∞GHz",
        `                            CGPA: ${profile.cgpa}`,
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

export interface LocalAIResponse {
    lines: string[];
    matched: boolean;
    source: "curated" | "search" | "suggestions";
}

const skillsLines = skillCategories.map((category) => {
    const label = category.label.replace("// ", "");
    return `  ${label.padEnd(16)} -> ${category.skills.join(", ")}`;
});

const projectLines = projects.flatMap((project) => [
    `  -> ${project.name} (${project.date})`,
    `     ${project.description}`,
]);

const experienceLines = experiences.flatMap((experience) => [
    `  -> ${experience.role} @ ${experience.company}`,
    `     ${experience.period} | ${experience.location}`,
]);

const publicationLines = publications.flatMap((publication) => [
    `  -> ${publication.title}`,
    `     ${publication.status} | ${publication.venue} | ${publication.date}`,
]);

const certificationLines = achievements
    .filter((achievement) => achievement.type === "certification")
    .map((achievement) => `  -> ${achievement.title} (${achievement.date})`);

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
            `  ${profile.name}`,
            "  ━━━━━━━━━━━━━━━━━━━━",
            `  ${profile.title}`,
            `  CGPA: ${profile.cgpa} | Expected graduation: ${profile.graduation}`,
            "",
            "  IEEE-published researcher with experience in NLP,",
            "  computer vision, RAG applications, and full-stack systems.",
            "  Currently interning with FOSSEE at IIT Bombay.",
        ],
    },
    {
        patterns: [
            /skill|tech|stack|language|framework|tools?|what.*know|what.*use/i,
        ],
        response: [
            "  Technical Skills",
            "  ━━━━━━━━━━━━━━━",
            ...skillsLines,
        ],
    },
    {
        patterns: [
            /educat|college|university|school|degree|study|student|where.*study/i,
        ],
        response: [
            "  Education",
            "  ━━━━━━━━━",
            ...education.map((item) => `  -> ${item.degree} | ${item.institution} | ${item.period}`),
            `  Current CGPA: ${profile.cgpa}`,
        ],
    },
    {
        patterns: [/contact|reach|email|mail|connect|hire|avail|recruit|job/i],
        response: [
            "  Contact Information",
            "  ━━━━━━━━━━━━━━━━━━",
            `  Email:    ${profile.email}`,
            "  GitHub:   github.com/Swayam200",
            "  LinkedIn: linkedin.com/in/swayam200",
            "  Website:  swayam200.me",
            "",
            `  Based in ${profile.location} | Open to opportunities and collaborations.`,
        ],
    },
    {
        patterns: [/project|work|portfolio|built|made|create|pdfchat|rag|khel|leptospirosis|goldfish/i],
        response: [
            "  Featured Projects",
            "  ━━━━━━━━━━━━━━━━━",
            ...projectLines,
            "",
            '  Visit /projects or type "projects" for links and details.',
        ],
    },
    {
        patterns: [/experience|intern|company|work.*at|job.*history|employ|fossee|techmaster|gfg/i],
        response: [
            "  Professional Experience",
            "  ━━━━━━━━━━━━━━━━━━━━━━",
            ...experienceLines,
            "",
            "  Visit the About page for the full timeline.",
        ],
    },
    {
        patterns: [/research|paper|publication|ieee|bert|misinformation|assic|trng|entropy/i],
        response: [
            "  Research & Publications",
            "  ━━━━━━━━━━━━━━━━━━━━━━",
            ...publicationLines,
            "",
            "  Research spans cross-platform misinformation detection and",
            "  true random number generation using biological entropy.",
        ],
    },
    {
        patterns: [/interest|hobby|passion|like|enjoy|free.*time/i],
        response: [
            "  Interests",
            "  ━━━━━━━━━",
            "  -> Hackathons",
            "  -> Reading",
            "  -> Product design",
            "  -> Open source contributions",
            "  -> Machine learning systems",
        ],
    },
    {
        patterns: [/locat|where.*live|where.*from|city|country|place/i],
        response: [
            `  From ${profile.location}`,
            "  Currently studying at VIT Bhopal University.",
            "  Open to remote opportunities and collaborations.",
        ],
    },
    {
        patterns: [/github|git|repo|open.?source/i],
        response: [
            "  GitHub: github.com/Swayam200",
            "  Current featured repositories:",
            ...projects.map((project) => `  -> ${project.name}: ${project.github}`),
        ],
    },
    {
        patterns: [/linkedin|professional/i],
        response: [
            "  LinkedIn: linkedin.com/in/swayam200",
            "  Connect with Swayam for internships, research,",
            "  full-stack work, and ML systems collaboration.",
        ],
    },
    {
        patterns: [/certif|certificate/i],
        response: [
            "  Certifications",
            "  ━━━━━━━━━━━━━━",
            ...certificationLines,
        ],
    },
    {
        patterns: [/hello|hi|hey|sup|what.*up|howdy|greet/i],
        response: [
            "  Hey there!",
            "  I'm Swayam's portfolio assistant. Ask me anything about him.",
            '  Try: "What skills does Swayam have?"',
            '  Or: "Tell me about PDFChat"',
        ],
    },
    {
        patterns: [/thank|thanks|thx|nice|cool|awesome|great|good/i],
        response: [
            "  Glad I could help.",
            "  Feel free to ask more questions or explore the terminal.",
            '  Type "help" to see all available commands.',
        ],
    },
    {
        patterns: [/age|old|born|birthday|year/i],
        response: [
            "  Swayam is an undergraduate B.Tech student in the class of 2027.",
            "  His expected graduation is May 2027.",
        ],
    },
    {
        patterns: [/resume|cv/i],
        response: [
            '  Type "resume" to download Swayam\'s resume.',
            "  It includes his updated experience, projects, skills,",
            "  publications, and education.",
        ],
    },
    {
        patterns: [/gpa|grade|cgpa|score/i],
        response: [
            "  Academic Performance",
            "  ━━━━━━━━━━━━━━━━━━━",
            `  CGPA: ${profile.cgpa}`,
            "  VIT Bhopal University - B.Tech CSE (AI & ML)",
        ],
    },
];

const stopWords = new Set([
    "about",
    "after",
    "again",
    "also",
    "anything",
    "does",
    "have",
    "tell",
    "that",
    "the",
    "their",
    "there",
    "this",
    "what",
    "when",
    "where",
    "which",
    "with",
    "you",
    "your",
    "swayam",
]);

function getSearchTerms(query: string) {
    return query
        .toLowerCase()
        .replace(/[^a-z0-9+\s.-]/g, " ")
        .split(/\s+/)
        .filter((term) => term.length > 2 && !stopWords.has(term));
}

function wrapLine(text: string, width = 78) {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
        if (`${current} ${word}`.trim().length > width && current) {
            lines.push(current);
            current = word;
        } else {
            current = `${current} ${word}`.trim();
        }
    }

    if (current) lines.push(current);
    return lines;
}

function buildRelatedFactResponse(query: string): string[] | null {
    const terms = getSearchTerms(query);
    if (terms.length === 0) return null;

    const ranked = searchableFacts
        .map((fact) => {
            const lower = fact.toLowerCase();
            const score = terms.reduce((total, term) => total + (lower.includes(term) ? 1 : 0), 0);
            return { fact, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    if (ranked.length === 0) return null;

    return [
        "",
        "  Related Profile Facts",
        "  ━━━━━━━━━━━━━━━━━━━━━",
        ...ranked.flatMap((item) => wrapLine(item.fact).map((line) => `  -> ${line}`)),
        "",
    ];
}

export function getLocalAIResponse(query: string): LocalAIResponse {
    const trimmed = query.trim();
    if (!trimmed) {
        return {
            lines: ['  Please ask a question. Try: "ask who is swayam?"'],
            matched: true,
            source: "suggestions",
        };
    }

    for (const entry of aiEntries) {
        for (const pattern of entry.patterns) {
            if (pattern.test(trimmed)) {
                return {
                    lines: ["", ...entry.response, ""],
                    matched: true,
                    source: "curated",
                };
            }
        }
    }

    const relatedFacts = buildRelatedFactResponse(trimmed);
    if (relatedFacts) {
        return {
            lines: relatedFacts,
            matched: false,
            source: "search",
        };
    }

    return {
        lines: [
            "",
            "  I do not have a confident local answer for that yet.",
            "  Here are some things you can ask me:",
            "",
            '  -> "Who is Swayam?"',
            '  -> "What are his skills?"',
            '  -> "Tell me about PDFChat"',
            '  -> "What research has he published?"',
            '  -> "How can I contact him?"',
            "",
        ],
        matched: false,
        source: "suggestions",
    };
}

export function getAIResponse(query: string): string[] {
    return getLocalAIResponse(query).lines;
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
];
