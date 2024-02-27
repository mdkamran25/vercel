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
import Link from "next/link";
import { showErrorToast } from "@/utils/toast";
import ToastConainer from "../toastConainer";

const GameDetails = ({ roomCode }: { roomCode: string }) => {
  const { data: session } = useSession();
  const { game, setGame } = useContext(GameContext) as GameContextType;

  const handleLeaveGame = (): void => {
    socket.emit("joinSocketChannel", game.roomCode);
    socket.emit("leaveGame", {
      roomCode: game.roomCode,
      message: "Opponent left game",
    });
  };

  useEffect(() => {
    const receiveGameHandler = async () => {
      const room = await fetch(`${getRoom}/${roomCode}`);
      const data = await room.json();

      setGame({
        ...game,
        ...data.data,
      });
    };

    socket.on("recieveJoinGame", receiveGameHandler);

    return () => {
      socket.off("recieveJoinGame", receiveGameHandler);
    };
  }, []);

  useEffect(() => {
    socket.on("recieveLeaveGame", (data) => {
      showErrorToast(data, "error");
    });
    return () => {
      socket.off("recieveLeaveGame");
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
          <p className="my-2 text-center">
            <Link
              onClick={handleLeaveGame}
              href="/"
              className="bg-purple-700 p-2 rounded-xl text-md font-semibold font-sans hover:cursor-pointer"
            >
              Leave Game
            </Link>
          </p>
        </div>
      </DashboardCard>
      <ToastConainer />
      {(status === "You Won" ||
        status === "You Lose" ||
        status === "Match Draw") && <ReactConfetti status={status} />}
    </>
  );
};

export default GameDetails;
