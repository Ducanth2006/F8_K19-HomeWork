import { createContext } from "react";

interface GameContextType {
    isPlaying: boolean;
    timeLeft: number;
    startGame: () => void;
    stopGame: () => void;
    handleWalkAway: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);