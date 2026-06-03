import { NextResponse } from "next/server";
import { getLocalAIResponse } from "@/lib/terminal-data";
import { getPortfolioContext } from "@/lib/profile-data";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const FALLBACK_MODEL = "gemini-3.1-flash-lite";

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

    const modelName = process.env.GEMINI_MODEL || FALLBACK_MODEL;
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
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContentStream({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 220,
            },
        });

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            controller.enqueue(new TextEncoder().encode(text));
                        }
                    }
                    controller.close();
                } catch (e) {
                    controller.error(e);
                }
            }
        });

        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/plain",
                "Transfer-Encoding": "chunked",
            },
        });
    } catch {
        return NextResponse.json({
            source: localResponse.source,
            lines: localResponse.lines,
        });
    }
}
