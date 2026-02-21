# Portfolio Setup Guide

A comprehensive guide to configuring and customizing your portfolio website.

---

## Quick Start

```bash
cd portfolio
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Music Player

The music player appears as a floating button in the bottom-left corner on desktop.

### Adding Your Music

1. Place your audio file at:  
   ```
   public/music/ambient.mp3
   ```
2. Supported formats: `.mp3`, `.ogg`, `.wav`
3. The file should ideally be a chill lofi/ambient track (keep it under 5MB for fast loading)

### Customization

Edit `src/components/MusicPlayer.tsx`:
- **Volume**: Change `audio.volume = 0.3` (range: 0.0 – 1.0)
- **Loop**: Set `audio.loop = true/false`
- **File path**: Update `new Audio("/music/ambient.mp3")` to your file

---

## Resume Download

1. Place your resume PDF at:  
   ```
   public/resume.pdf
   ```
2. The terminal `resume` command references this file
3. To add an actual download link, edit the `resume` case in `src/components/TerminalCore.tsx`:

```tsx
case "resume": {
    lines.push(out(""), out("  Downloading resume...", "text-blue-400"), out(""));
    window.open("/resume.pdf", "_blank");  // <-- add this line
    break;
}
```

---

## Weather API

The terminal's `weather` command uses the **Open-Meteo API** — a free, open-source weather API that requires **no API key**.

### How It Works
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Coordinates are set to Bhopal, India (lat: 23.26, lon: 77.41)
- No signup, no API key, no rate limits for reasonable usage

### Changing Location

Edit the weather fetch URL in `src/components/TerminalCore.tsx`:

```tsx
const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=YOUR_LAT&longitude=YOUR_LON&current_weather=true"
);
```

Find coordinates at [open-meteo.com](https://open-meteo.com/).

---

## Terminal (Centerpiece)

The terminal is available in two ways:
1. **Full-page**: Navigate to `/contact` (the `./contact` nav link)
2. **Global overlay**: Click the code block or "launch terminal" bar on the home page, or press **Ctrl+`** from any page

### Adding Commands

Edit `src/components/TerminalCore.tsx` → `processCommand` function. Add a new `case` in the switch:

```tsx
case "your-command": {
    lines.push(
        out(""),
        out("  Your output here", "text-green-400"),
        out("")
    );
    break;
}
```

Then add the command name to `availableCommands` in `src/lib/terminal-data.ts` for tab-completion.

### AI Responses

The `ask` command uses pattern-matching in `src/lib/terminal-data.ts`. To add new knowledge:

```tsx
{
    patterns: [/your.*regex.*pattern/i],
    response: [
        "  Line 1",
        "  Line 2",
    ],
},
```

Add entries to the `aiEntries` array in the same file.

---

## Projects Data

Edit the `projects` array in `src/app/projects/page.tsx`:

```tsx
{
    name: "your-project",
    description: "Short description",
    tech: ["React", "TypeScript"],
    stars: 42,
    forks: 10,
    status: "active",       // "active" | "archived" | "wip"
    image: "/projects/your-project.png",
    color: "blue",          // "blue" | "green" | "purple" | "orange" | "red" | "cyan"
}
```

### Project Images

Place project screenshots/images at:
```
public/projects/your-project.png
```

Recommended size: 800×450px (16:9 ratio).

---

## Experience / About Page

Edit `src/app/about/page.tsx`:
- **Experiences**: Modify the `experiences` array
- **Skills**: Modify the `skillCategories` array
- **Education**: Edit the education section JSX directly

---

## Achievements

Edit `src/app/achievements/page.tsx`:
- Modify the `achievements` array with your own entries

---

## Fonts

The site uses two fonts:
- **Inter** — Display text (headings, body)
- **Fira Code** — Monospace (code blocks, terminal, navigation)

To change fonts, edit `src/app/layout.tsx` and update the `next/font/google` imports.

---

## Colors & Theme

The color scheme is defined in `src/app/globals.css`:

| Color | Value | Usage |
|-------|-------|-------|
| Background | `#050505` | Main background |
| Surface | `#0a0a0a` | Cards, terminal bg |
| Border | `gray-800` | Borders, dividers |
| Text | `gray-100` | Primary text |

Customize by editing Tailwind classes throughout the components.

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Static Export

```bash
npx next build
# Output is in .next/ — deploy to any static host
```

### Environment Variables

No environment variables are required. The weather API is free and keyless.

---

## File Structure

```
portfolio/
├── public/
│   ├── music/
│   │   └── ambient.mp3        ← Your music file
│   ├── projects/
│   │   └── *.png              ← Project screenshots
│   ├── resume.pdf             ← Your resume
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← Root layout (fonts, providers)
│   │   ├── globals.css        ← Global styles & animations
│   │   ├── page.tsx           ← Home page
│   │   ├── about/page.tsx     ← About / README page
│   │   ├── projects/page.tsx  ← Projects showcase
│   │   ├── achievements/page.tsx
│   │   └── contact/page.tsx   ← Full terminal page
│   ├── components/
│   │   ├── TerminalCore.tsx   ← Reusable terminal (all commands)
│   │   ├── TerminalOverlay.tsx ← Global slide-up overlay
│   │   ├── SnakeGame.tsx      ← Snake game
│   │   ├── MatrixRain.tsx     ← Matrix rain canvas effect
│   │   ├── MusicPlayer.tsx    ← Music player widget
│   │   ├── Sidebar.tsx        ← Left navigation
│   │   ├── TabBar.tsx         ← VS Code-style tab bar
│   │   ├── PageTransition.tsx ← Page wrapper
│   │   ├── SpotlightEffect.tsx ← Mouse spotlight
│   │   └── GrainOverlay.tsx   ← Film grain texture
│   ├── context/
│   │   └── TerminalContext.tsx ← Global terminal open/close state
│   └── lib/
│       └── terminal-data.ts   ← Fortunes, cowsay, AI, neofetch data
└── package.json
```

---

## Terminal Commands Reference

| Command | Description |
|---------|-------------|
| `help` | Show all commands |
| `whoami` | Profile card |
| `social` | Social links |
| `email` | Email address |
| `message` | Open email client |
| `resume` | Download resume |
| `skills` | Technical skills (code format) |
| `projects` | Project list |
| `neofetch` | ASCII system info |
| `ask <query>` | AI-powered Q&A about Swayam |
| `weather` | Live weather in Bhopal |
| `fortune` | Random dev quote |
| `cowsay <msg>` | ASCII cow says your message |
| `snake` | Play Snake game |
| `matrix` | Toggle matrix rain |
| `theme <name>` | Switch theme (default/amber/matrix) |
| `ping <host>` | Fake ping |
| `history` | Command history |
| `date` | Current date/time |
| `uptime` | Session uptime |
| `clear` | Clear terminal |
| `banner` | Re-show welcome |
| `man` | Manual page |
| `ls`, `cd`, `pwd` | Fake filesystem |
| `cat <file>` | Read files |
| `sudo`, `rm -rf /` | Easter eggs |
