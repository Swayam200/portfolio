import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant embedded in Swayam Prakash Panda's portfolio website terminal. 
Answer questions about Swayam concisely (2-5 lines max). Use plain text only — no markdown, no bold, no links.

About Swayam:
- Full name: Swayam Prakash Panda
- Education: B.Tech CSE (AI & ML) at VIT Bhopal University (2023-2027), GPA: 8.64/10
- From: Daman, Daman and Diu, India
- Email: swayam.panda200@gmail.com
- GitHub: github.com/Swayam200 (46 repos)
- LinkedIn: linkedin.com/in/swayam200

Research:
- IEEE RCSM 2025 paper: "Evaluating the Portability of BERT-based Misinformation Detection from Twitter to Bluesky"
- Accepted for IEEE Xplore (SCOPUS indexed). F1: 0.73 zero-shot → 0.997 after fine-tuning.
- Research interests: NLP, transfer learning, social media mining

Experience:
- Club Coordinator at GeeksforGeeks VIT Bhopal (Jan 2025-Present)
- Technical Team Lead at VITB AI Innovators Hub (Sep 2025-Present)
- Winter Intern at IIT Ropar via NPTEL (Dec 2025-Jan 2026) — MERN Stack, GenAI analysis
- Led Darzi AI Resume Suite project (75+ member team)

Key Projects:
- BERT Misinformation Detection (IEEE paper)
- Carbon Sleuth: Hybrid Web+Desktop app (Django REST, React, PyQt5)
- Goldfish Password Generator: Entropy via fish motion + OpenCV (2 stars)
- Leptospirosis Predictor: ML disease risk prediction (5 stars)
- Darzi AI Resume Suite: AI resume optimization (TypeScript)
- Blood Cell Detection: YOLOv8
- Abusive Language Censoring API: FastAPI, <1ms latency
- Indian Railways Analysis: Data viz (1 star)

Skills: Python, C++, TypeScript, BERT, scikit-learn, pandas, YOLOv8, React, Next.js, Node.js, FastAPI, Django, OpenCV, Git, PostgreSQL, GCP, AWS

Certifications: Google Data Analytics (Jul 2025), Cloud Computing NPTEL (May 2025), Applied ML Python UMich (Dec 2024)

Awards: Startup Star Season 1 - 7th position (Feb 2022), Intel AI 4 Youth (Aug 2022)

Languages: English (Fluent), Hindi (Fluent), Odia
Interests: Hackathons, Reading, Competitive Programming (Codeforces)

If the question is unrelated to Swayam, politely redirect: "I'm Swayam's portfolio assistant. Ask me about his skills, projects, or experience!"
Keep responses short and terminal-friendly. Prefix each line with "  " (two spaces).`;

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query || typeof query !== "string") {
            return NextResponse.json(
                { response: ["  Please provide a question."] },
                { status: 400 }
            );
        }

        // Try Gemini Flash first (free tier)
        const geminiKey = process.env.GEMINI_API_KEY;
        if (geminiKey) {
            try {
                const geminiRes = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${geminiKey}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents: [
                                {
                                    role: "user",
                                    parts: [
                                        {
                                            text: `${SYSTEM_PROMPT}\n\nUser question: ${query}`,
                                        },
                                    ],
                                },
                            ],
                            generationConfig: {
                                maxOutputTokens: 500,
                                temperature: 0.7,
                            },
                        }),
                    }
                );

                if (geminiRes.ok) {
                    const data = await geminiRes.json();
                    const text =
                        data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
                    if (text) {
                        const lines = text
                            .split("\n")
                            .map((line: string) =>
                                line.startsWith("  ") ? line : `  ${line}`
                            );
                        return NextResponse.json({ response: ["", ...lines, ""] });
                    }
                } else {
                    const errorBody = await geminiRes.text().catch(() => "unknown");
                    console.error(`[AI] Gemini failed (${geminiRes.status}):`, errorBody);
                }
            } catch (err) {
                console.error("[AI] Gemini request error:", err);
            }
        }

        // Try OpenRouter free models as fallback
        const openRouterKey = process.env.OPENROUTER_API_KEY;
        if (openRouterKey) {
            try {
                const orRes = await fetch(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${openRouterKey}`,
                        },
                        body: JSON.stringify({
                            model: "arcee-ai/trinity-mini:free",
                            messages: [
                                { role: "system", content: SYSTEM_PROMPT },
                                { role: "user", content: query },
                            ],
                            max_tokens: 1500,
                            temperature: 0.7,
                        }),
                    }
                );

                if (orRes.ok) {
                    const data = await orRes.json();
                    const msg = data?.choices?.[0]?.message;
                    // Reasoning models may return content in reasoning field
                    const text = msg?.content || "";
                    if (text) {
                        const lines = text
                            .split("\n")
                            .map((line: string) =>
                                line.startsWith("  ") ? line : `  ${line}`
                            );
                        return NextResponse.json({ response: ["", ...lines, ""] });
                    }
                } else {
                    const errorBody = await orRes.text().catch(() => "unknown");
                    console.error(`[AI] OpenRouter failed (${orRes.status}):`, errorBody);
                }
            } catch (err) {
                console.error("[AI] OpenRouter request error:", err);
            }
        }

        // Static fallback if no API keys configured
        return NextResponse.json({
            response: [
                "",
                "  I'm not sure how to answer that specific question.",
                "  Here are some things you can ask me:",
                "",
                '  • "Who is Swayam?"',
                '  • "What are his skills?"',
                '  • "Tell me about his research"',
                '  • "How can I contact him?"',
                '  • "What projects has he built?"',
                "",
            ],
        });
    } catch {
        return NextResponse.json(
            {
                response: [
                    "",
                    "  Something went wrong. Try again or ask a simpler question.",
                    "",
                ],
            },
            { status: 500 }
        );
    }
}
