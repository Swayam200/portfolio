# Swayam Prakash Panda Portfolio

Terminal-inspired Next.js portfolio for Swayam Prakash Panda, a B.Tech CSE (AI & ML) student at VIT Bhopal, IEEE-published researcher, and full-stack ML systems builder.

## Highlights

- Updated profile, education, internships, leadership roles, publications, skills, and projects from the latest CV.
- Project showcase now focuses on PDFChat, the biological-entropy TRNG work, Khel Saarthi, and the Leptospirosis Risk Predictor.
- Terminal assistant includes curated profile answers plus an optional Gemini-backed fallback route.
- Resume download is served from `public/resume.pdf`.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel Analytics

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Optional AI Fallback

The terminal command `ask <question>` first checks curated local profile facts. If there is no exact local match, `/api/chat` can call Gemini when one of these environment variables is configured:

```bash
GEMINI_API_KEY=your_key
# or
GOOGLE_GENERATIVE_AI_API_KEY=your_key
```

You can also override the model:

```bash
GEMINI_MODEL=gemini-1.5-flash
```

Without an API key, the route falls back to local profile-fact search.

## Useful Scripts

```bash
npm run lint
npm run build
```
