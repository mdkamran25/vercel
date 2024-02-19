"use client"
import { GameContext } from '@/context/gameContext'
import React, { useContext } from 'react'

const Turn = () => {
    const{game} = useContext(GameContext) as GameContextType;
  return (
    <div>
            {game.turn === "X" ? (
              <div className="text-white bg-gray-700 text-xl px-4 py-1 w-28 rounded-lg font-medium uppercase">
                <span className="text-purple-600 text-2xl font-bold">X</span>{" "}
                Turn
              </div>
            ) : (
              <div className="text-white bg-gray-700 text-xl px-4 py-1 w-28 rounded-lg font-medium uppercase">
                <span className=" text-[#f3b236] text-2xl font-bold">O</span>{" "}
                Turn
              </div>
            )}
          </div>
  )
}

export default React.memo(Turn)
