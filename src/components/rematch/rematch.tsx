"use client";

import Image from "next/image";
import React, { useContext } from "react";
import rematch from "../../../assets/rematch.svg";
import { GameContext } from "@/context/gameContext";
import { handleGameState } from "@/utils/handleGameState";

const Rematch = () => {
  const { game, setGame } = useContext(GameContext) as GameContextType;
  const handleRematch = () => {
    handleGameState(
      game,
      setGame,
      Array(9).fill(""),
      game.winner === "X" || game.winner == null ? "O" : "X"
    );
  };
  return (
    <div>
      <button
        className="relative  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-6"
        onClick={handleRematch}
      >
        <Image
          className="cursor-pointer m-1 hover:animate-spin"
          src={rematch}
          alt="Rematch"
          width="13"
          height="13"
        />
        Rematch
      </button>
    </div>
  );
};

export default Rematch;
