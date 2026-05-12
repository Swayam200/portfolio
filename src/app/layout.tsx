import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SpotlightEffect from "@/components/SpotlightEffect";
import GrainOverlay from "@/components/GrainOverlay";
import MusicPlayer from "@/components/MusicPlayer";
import MobileNav from "@/components/MobileNav";
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
    "B.Tech CSE (AI & ML) student, IEEE-published researcher, and full-stack ML systems builder.",
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
            <main className="flex-grow flex flex-col relative flex-1 min-h-0 overflow-hidden pb-14 md:pb-0">
              {children}
              <MusicPlayer />
            </main>
          </div>

          <MobileNav />
          <TerminalOverlay />
        </TerminalProvider>
        <Analytics />
      </body>
    </html>
  );
}
