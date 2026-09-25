import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface GameContextType {
    isPlaying: boolean;
    timeLeft: number;
    startGame: () => void;
    stopGame: () => void;
    handleWalkAway: () => void;
}
// React Props luôn luôn là một Object { }.
// Khi định nghĩa type cho Props, bắt buộc phải dùng cú pháp Object: { tên_prop: kiểu_dữ_liệu }.
const GameContext = createContext<GameContextType | undefined>(undefined);

// export const GameProvider=()