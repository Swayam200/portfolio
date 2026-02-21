"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface TerminalContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const TerminalContext = createContext<TerminalContextValue>({
    isOpen: false,
    open: () => { },
    close: () => { },
    toggle: () => { },
});

export function useTerminal() {
    return useContext(TerminalContext);
}

export function TerminalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    return (
        <TerminalContext.Provider value={{ isOpen, open, close, toggle }}>
            {children}
        </TerminalContext.Provider>
    );
}
