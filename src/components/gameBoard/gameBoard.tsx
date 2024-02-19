'use client'
import React, { useContext, useEffect } from "react";
import Squares from "../squares/squares";
import Turn from "../turn/turn";
import { GameContext } from "@/context/gameContext";

const GameBoard = ({ roomData }: { roomData: Game }) => {
  const { setGame } = useContext(GameContext) as GameContextType;

  
  useEffect(()=>{
    setGame({
      ...roomData
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roomData])

  return (
    <div>
      <div className="board">
        <div className=" w-[300px] md:[w-400px] rounded-lg flex items-center justify-center space-x-10">
          <Turn />
        </div>
        <div className="board-row">
          {[0, 1, 2].map((i) => (
            <Squares key={i} i={i} />
          ))}
        </div>

        <div className="board-row">
          {[3, 4, 5].map((i) => (
            <Squares key={i} i={i} />
          ))}
        </div>

        <div className="board-row">
          {[6, 7, 8].map((i) => (
            <Squares key={i} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameBoard);
