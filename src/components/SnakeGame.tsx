"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SnakeGameProps {
    onExit: (score: number) => void;
}

type Direction = "up" | "down" | "left" | "right";
type Point = { x: number; y: number };

const GRID_W_DESKTOP = 28;
const GRID_H_DESKTOP = 14;
const GRID_W_MOBILE = 18;
const GRID_H_MOBILE = 12;
const TICK_MS = 140;

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    return isMobile;
}

export default function SnakeGame({ onExit }: SnakeGameProps) {
    const isMobile = useIsMobile();
    const GRID_W = isMobile ? GRID_W_MOBILE : GRID_W_DESKTOP;
    const GRID_H = isMobile ? GRID_H_MOBILE : GRID_H_DESKTOP;

    const [snake, setSnake] = useState<Point[]>([
        { x: Math.floor(GRID_W_DESKTOP / 2), y: Math.floor(GRID_H_DESKTOP / 2) },
        { x: Math.floor(GRID_W_DESKTOP / 2) - 1, y: Math.floor(GRID_H_DESKTOP / 2) },
        { x: Math.floor(GRID_W_DESKTOP / 2) - 2, y: Math.floor(GRID_H_DESKTOP / 2) },
    ]);
    const [food, setFood] = useState<Point>({ x: Math.floor(GRID_W_DESKTOP * 0.7), y: Math.floor(GRID_H_DESKTOP / 2) });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [started, setStarted] = useState(false);
    const dirRef = useRef<Direction>("right");
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const spawnFood = useCallback((currentSnake: Point[]): Point => {
        let newFood: Point;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_W),
                y: Math.floor(Math.random() * GRID_H),
            };
        } while (currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y));
        return newFood;
    }, [GRID_H, GRID_W]);

    // Reset with correct grid dimensions
    const resetGame = useCallback(() => {
        const initial = [
            { x: Math.floor(GRID_W / 2), y: Math.floor(GRID_H / 2) },
            { x: Math.floor(GRID_W / 2) - 1, y: Math.floor(GRID_H / 2) },
            { x: Math.floor(GRID_W / 2) - 2, y: Math.floor(GRID_H / 2) },
        ];
        setSnake(initial);
        setFood(spawnFood(initial));
        dirRef.current = "right";
        setGameOver(false);
        setScore(0);
        setStarted(false);
    }, [GRID_W, GRID_H, spawnFood]);

    // Auto-focus
    useEffect(() => {
        containerRef.current?.focus();
    }, []);

    // Game loop
    useEffect(() => {
        if (gameOver || !started) return;

        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const head = prevSnake[0];
                const dir = dirRef.current;
                let newHead: Point;
                switch (dir) {
                    case "up":
                        newHead = { x: head.x, y: head.y - 1 };
                        break;
                    case "down":
                        newHead = { x: head.x, y: head.y + 1 };
                        break;
                    case "left":
                        newHead = { x: head.x - 1, y: head.y };
                        break;
                    case "right":
                        newHead = { x: head.x + 1, y: head.y };
                        break;
                }

                // Walls
                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_W ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_H
                ) {
                    setGameOver(true);
                    return prevSnake;
                }

                // Self collision
                if (prevSnake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((s) => s + 10);
                    setFood(spawnFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, TICK_MS);

        return () => clearInterval(interval);
    }, [gameOver, started, food, spawnFood, GRID_W, GRID_H]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            e.preventDefault();
            const key = e.key.toLowerCase();

            if (key === "escape" || key === "q") {
                onExit(score);
                return;
            }

            if (!started) {
                setStarted(true);
                return;
            }

            if (gameOver && key === "r") {
                resetGame();
                setStarted(true);
                return;
            }

            const dir = dirRef.current;
            if ((key === "arrowup" || key === "w") && dir !== "down") {
                dirRef.current = "up";
            } else if ((key === "arrowdown" || key === "s") && dir !== "up") {
                dirRef.current = "down";
            } else if ((key === "arrowleft" || key === "a") && dir !== "right") {
                dirRef.current = "left";
            } else if ((key === "arrowright" || key === "d") && dir !== "left") {
                dirRef.current = "right";
            }
        },
        [gameOver, onExit, resetGame, score, started]
    );

    // Touch/swipe handlers for mobile
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!touchStartRef.current) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStartRef.current.x;
        const dy = touch.clientY - touchStartRef.current.y;
        const minSwipe = 30;

        if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) {
            // Tap — start game if not started
            if (!started) setStarted(true);
            return;
        }

        if (!started) {
            setStarted(true);
            return;
        }

        const dir = dirRef.current;
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0 && dir !== "left") dirRef.current = "right";
            else if (dx < 0 && dir !== "right") dirRef.current = "left";
        } else {
            // Vertical swipe
            if (dy > 0 && dir !== "up") dirRef.current = "down";
            else if (dy < 0 && dir !== "down") dirRef.current = "up";
        }
        touchStartRef.current = null;
    }, [started]);

    const handleMobileDir = useCallback((newDir: Direction) => {
        if (!started) {
            setStarted(true);
            return;
        }
        const dir = dirRef.current;
        if (newDir === "up" && dir !== "down") dirRef.current = "up";
        else if (newDir === "down" && dir !== "up") dirRef.current = "down";
        else if (newDir === "left" && dir !== "right") dirRef.current = "left";
        else if (newDir === "right" && dir !== "left") dirRef.current = "right";
    }, [started]);

    // Build grid as JSX
    const renderGrid = () => {
        const rows: React.ReactNode[] = [];

        // Top border
        rows.push(
            <div key="top" className="text-gray-700">
                {"╔" + "══".repeat(GRID_W) + "╗"}
            </div>
        );

        for (let y = 0; y < GRID_H; y++) {
            const cells: React.ReactNode[] = [];
            cells.push(
                <span key="l" className="text-gray-700">
                    ║
                </span>
            );

            for (let x = 0; x < GRID_W; x++) {
                const isHead = snake[0].x === x && snake[0].y === y;
                const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
                const isFood = food.x === x && food.y === y;

                if (isHead) {
                    cells.push(
                        <span key={x} className="text-green-400">
                            ██
                        </span>
                    );
                } else if (isBody) {
                    cells.push(
                        <span key={x} className="text-green-600">
                            ▓▓
                        </span>
                    );
                } else if (isFood) {
                    cells.push(
                        <span key={x} className="text-red-400">
                            ◆◆
                        </span>
                    );
                } else {
                    cells.push(<span key={x}>{"  "}</span>);
                }
            }

            cells.push(
                <span key="r" className="text-gray-700">
                    ║
                </span>
            );
            rows.push(<div key={y}>{cells}</div>);
        }

        // Bottom border
        rows.push(
            <div key="bot" className="text-gray-700">
                {"╚" + "══".repeat(GRID_W) + "╝"}
            </div>
        );

        return rows;
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-col h-full focus:outline-none font-[family-name:var(--font-fira-code)]"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Header */}
            <div className="text-center text-sm mb-3 flex items-center justify-center gap-3 md:gap-6 flex-wrap">
                <span className="text-green-400 font-bold">SNAKE</span>
                <span className="text-gray-600 hidden md:inline">│</span>
                <span className="text-yellow-400">Score: {score}</span>
                <span className="text-gray-600 hidden md:inline">│</span>
                <span className="text-gray-500 text-xs hidden md:inline">
                    {gameOver
                        ? "GAME OVER — R restart · Q quit"
                        : !started
                            ? "Press any key to start · Q quit"
                            : "← ↑ ↓ → or WASD · Q quit"}
                </span>
                <span className="text-gray-500 text-xs md:hidden">
                    {gameOver
                        ? "GAME OVER"
                        : !started
                            ? "Tap or swipe to start"
                            : "Swipe to move"}
                </span>
            </div>

            {/* Grid */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                <pre className="text-[10px] md:text-xs leading-[1.1] select-none">{renderGrid()}</pre>
            </div>

            {/* Mobile D-pad controls */}
            <div className="md:hidden flex flex-col items-center gap-1 py-2 select-none">
                <button
                    onTouchStart={(e) => { e.preventDefault(); handleMobileDir("up"); }}
                    className="w-12 h-10 bg-gray-800/50 border border-gray-700 rounded text-gray-400 active:bg-gray-700 active:text-white text-lg"
                >
                    ↑
                </button>
                <div className="flex gap-1">
                    <button
                        onTouchStart={(e) => { e.preventDefault(); handleMobileDir("left"); }}
                        className="w-12 h-10 bg-gray-800/50 border border-gray-700 rounded text-gray-400 active:bg-gray-700 active:text-white text-lg"
                    >
                        ←
                    </button>
                    <button
                        onTouchStart={(e) => { e.preventDefault(); handleMobileDir("down"); }}
                        className="w-12 h-10 bg-gray-800/50 border border-gray-700 rounded text-gray-400 active:bg-gray-700 active:text-white text-lg"
                    >
                        ↓
                    </button>
                    <button
                        onTouchStart={(e) => { e.preventDefault(); handleMobileDir("right"); }}
                        className="w-12 h-10 bg-gray-800/50 border border-gray-700 rounded text-gray-400 active:bg-gray-700 active:text-white text-lg"
                    >
                        →
                    </button>
                </div>
                <div className="flex gap-2 mt-1">
                    {gameOver && (
                        <button
                            onTouchStart={(e) => { e.preventDefault(); resetGame(); setStarted(true); }}
                            className="px-3 py-1 bg-green-900/50 border border-green-700 rounded text-green-400 text-xs active:bg-green-800"
                        >
                            Restart
                        </button>
                    )}
                    <button
                        onTouchStart={(e) => { e.preventDefault(); onExit(score); }}
                        className="px-3 py-1 bg-red-900/50 border border-red-700 rounded text-red-400 text-xs active:bg-red-800"
                    >
                        Quit
                    </button>
                </div>
            </div>

            {/* Game over overlay — desktop only */}
            {gameOver && (
                <div className="text-center mt-2 mb-2 hidden md:block">
                    <span className="text-red-400 text-lg font-bold">GAME OVER</span>
                    <span className="text-gray-500 ml-4">
                        Final Score: {score} · R to restart · Q to quit
                    </span>
                </div>
            )}
        </div>
    );
}
