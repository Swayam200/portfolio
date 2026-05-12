import { NextResponse } from "next/server";
import { getLocalAIResponse } from "@/lib/terminal-data";
import { getPortfolioContext } from "@/lib/profile-data";

const FALLBACK_MODEL = "gemini-1.5-flash";

function wrapText(text: string, width = 76) {
    return text
        .replace(/\s+/g, " ")
        .split(" ")
        .reduce<string[]>((lines, word) => {
            const last = lines[lines.length - 1] || "";
            if (!last) return [word];
            if (`${last} ${word}`.length > width) return [...lines, word];
            return [...lines.slice(0, -1), `${last} ${word}`];
        }, []);
}

function terminalLines(title: string, text: string) {
    return [
        "",
        `  ${title}`,
        "  ━━━━━━━━━━━",
        ...wrapText(text).map((line) => `  ${line}`),
        "",
    ];
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => ({}));
    const query = typeof body.query === "string" ? body.query.trim() : "";
    const localResponse = getLocalAIResponse(query);

    if (!query || localResponse.matched) {
        return NextResponse.json({
            source: localResponse.source,
            lines: localResponse.lines,
        });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({
            source: localResponse.source,
            lines: localResponse.lines,
        });
    }

    const model = process.env.GEMINI_MODEL || FALLBACK_MODEL;
    const prompt = [
        "You are the portfolio assistant for Swayam Prakash Panda.",
        "Answer only from the facts below. If the answer is not present, say that it is not listed in the portfolio and suggest contacting Swayam.",
        "Keep the answer concise, factual, and suitable for a terminal UI. Do not invent achievements, dates, links, or metrics.",
        "",
        "Portfolio facts:",
        getPortfolioContext(),
        "",
        `Question: ${query}`,
    ].join("\n");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: prompt }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 220,
                    },
                }),
            }
        );

        if (!response.ok) {
            return NextResponse.json({
                source: localResponse.source,
                lines: localResponse.lines,
            });
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts
            ?.map((part: { text?: string }) => part.text)
            .filter(Boolean)
            .join(" ")
            .trim();

        if (!text) {
            return NextResponse.json({
                source: localResponse.source,
                lines: localResponse.lines,
            });
        }

        return NextResponse.json({
            source: "gemini",
            lines: terminalLines("AI Fallback", text),
        });
    } catch {
        return NextResponse.json({
            source: localResponse.source,
            lines: localResponse.lines,
        });
    }
}
