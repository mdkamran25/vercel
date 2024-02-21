"use client";
import React, { useContext, useEffect, useMemo } from "react";
import DashboardCard from "../dashboardCard/card";
import { checkGameStatus } from "@/utils/checkGameStatus";
import { checkOpponent } from "@/utils/checkOpponent";
import { GameContext } from "@/context/gameContext";
import { useSession } from "next-auth/react";
import ReactConfetti from "@/modals/react-confetti";
import { getRoom } from "@/constants/apiUrl";
import socket from "@/utils/socket";

const GameDetails = ({ roomCode }: { roomCode: string }) => {
  const { data: session } = useSession();
  const { game, setGame } = useContext(GameContext) as GameContextType;

  useEffect(() => {
    const receiveGameHandler = async () => {
      const room = await fetch(`${getRoom}/${roomCode}`);
      const data = await room.json();
    
      console.log("Join Game Socket", data)

      setGame({
        ...game,
        ...data.data
      });
    };

    socket.on("recieveJoinGame", receiveGameHandler);

    return () => {
      socket.off("recieveJoinGame", receiveGameHandler);
    };
  }, []);

  const status: string = useMemo(() => {
    return checkGameStatus(game, session?.user?.email as string);
  }, [game, session?.user?.email]);

  return (
    <>
      <DashboardCard>
        <div className="">
          <p className="text-xl font-semibold font-sans">
            Opponent:{" "}
            <span className="text-xl font-medium font-sans">
              {checkOpponent(game, session?.user?.email as string)}
            </span>
          </p>
          <p className="text-xl font-semibold font-sans">
            Room Code:{" "}
            <span className="text-xl font-medium font-sans">
              {game?.roomCode}
            </span>
          </p>
          <p className="text-xl font-semibold font-sans">
            Your Symbol:{" "}
            <span className="text-purple-600 text-2xl font-bold">
              {(session?.user?.email as string) ===
              (game.playerXId as UserData).email
                ? "X"
                : "O"}
            </span>
          </p>
          <p className="text-xl font-semibold font-sans">
            Game Status:{" "}
            <span className="text-xl font-medium font-sans">{status}</span>
          </p>
        </div>
      </DashboardCard>
      {(status === "You Won" ||
        status === "You Lose" ||
        status === "Match Draw") && <ReactConfetti status={status} />}
    </>
  );
};

export default GameDetails;
