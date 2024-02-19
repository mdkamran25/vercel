'use client'
import React, { createContext, useState } from "react";

export const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<Game>({
    roomCode: "",
    playerXId: "",
    turn: "X",
    board: Array(9).fill(null),
    winner: "",
    status: false,
    leftGame: { playerX: false, playerO: false },
  });
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
