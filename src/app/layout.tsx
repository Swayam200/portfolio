import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SpotlightEffect from "@/components/SpotlightEffect";
import GrainOverlay from "@/components/GrainOverlay";
import MusicPlayer from "@/components/MusicPlayer";
import TerminalOverlay from "@/components/TerminalOverlay";
import { TerminalProvider } from "@/context/TerminalContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Swayam Prakash Panda — Portfolio",
  description:
    "AI & ML Engineer | Full Stack Developer | B.Tech CSE (AI & ML)",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased bg-[#050505] text-gray-100 font-[family-name:var(--font-inter)] min-h-screen overflow-hidden`}
      >
        <TerminalProvider>
          <GrainOverlay />
          <SpotlightEffect />

          <div className="relative z-20 flex flex-col md:flex-row h-screen w-full">
            <Sidebar />
            <main className="flex-grow flex flex-col relative h-screen overflow-hidden">
              {children}
              <MusicPlayer />
            </main>
          </div>

          <TerminalOverlay />
        </TerminalProvider>
        <Analytics />
      </body>
    </html>
  );
}
