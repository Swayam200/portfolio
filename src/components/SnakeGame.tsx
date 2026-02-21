"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SnakeGameProps {
    onExit: (score: number) => void;
}

type Direction = "up" | "down" | "left" | "right";
type Point = { x: number; y: number };

const GRID_W = 28;
const GRID_H = 14;
const TICK_MS = 140;

export default function SnakeGame({ onExit }: SnakeGameProps) {
    const [snake, setSnake] = useState<Point[]>([
        { x: 14, y: 7 },
        { x: 13, y: 7 },
        { x: 12, y: 7 },
    ]);
    const [food, setFood] = useState<Point>({ x: 20, y: 7 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [started, setStarted] = useState(false);
    const dirRef = useRef<Direction>("right");
    const containerRef = useRef<HTMLDivElement>(null);

    const spawnFood = useCallback((currentSnake: Point[]): Point => {
        let newFood: Point;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_W),
                y: Math.floor(Math.random() * GRID_H),
            };
        } while (currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y));
        return newFood;
    }, []);

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
    }, [gameOver, started, food, spawnFood]);

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
                const initial = [
                    { x: 14, y: 7 },
                    { x: 13, y: 7 },
                    { x: 12, y: 7 },
                ];
                setSnake(initial);
                setFood(spawnFood(initial));
                dirRef.current = "right";
                setGameOver(false);
                setScore(0);
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
        [gameOver, onExit, score, started, spawnFood]
    );

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
        >
            {/* Header */}
            <div className="text-center text-sm mb-3 flex items-center justify-center gap-6">
                <span className="text-green-400 font-bold">SNAKE</span>
                <span className="text-gray-600">│</span>
                <span className="text-yellow-400">Score: {score}</span>
                <span className="text-gray-600">│</span>
                <span className="text-gray-500 text-xs">
                    {gameOver
                        ? "GAME OVER — R restart · Q quit"
                        : !started
                            ? "Press any key to start · Q quit"
                            : "← ↑ ↓ → or WASD · Q quit"}
                </span>
            </div>

            {/* Grid */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                <pre className="text-xs leading-[1.1] select-none">{renderGrid()}</pre>
            </div>

            {/* Game over overlay */}
            {gameOver && (
                <div className="text-center mt-2 mb-2">
                    <span className="text-red-400 text-lg font-bold">GAME OVER</span>
                    <span className="text-gray-500 ml-4">
                        Final Score: {score} · R to restart · Q to quit
                    </span>
                </div>
            )}
        </div>
    );
}
