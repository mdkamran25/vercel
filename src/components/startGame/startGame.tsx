"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import LoadingButton from "../loadingButton/loadingButton";
import Input from "../input/input";
import { joinRoom, room } from "@/constants/apiUrl";
import { GameContext } from "@/context/gameContext";
import ToastConainer from "../toastConainer";
import { showErrorToast } from "../../utils/toast";
import socket from "../../utils/socket"

const StartGame = ({ userData }: { userData: UserResponseData }) => {
  const { game, setGame } = useContext(GameContext) as GameContextType;

  const [loading, setLoading] = useState({
    createRoom: false,
    joinRoom: false,
  });
  const [joinRoomCode, setJoinRoomCode] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJoinRoomCode(e.target.value);
  };
  const router = useRouter();

  const createRoom = async () => {
    setLoading({ ...loading, createRoom: true });
  
    try {
      const customRoomCode = Math.random().toString().substring(2, 8);
  
      const newGame = {
        roomCode: customRoomCode,
        playerXId: userData.data._id,
      };
  
      const res = await fetch(room, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game: newGame }),
      });
  
      const data = await res.json();
      if (res.ok) {
        socket.emit("joinSocketChannel", customRoomCode)
        router.push(`/room/${customRoomCode}`);
      } else {
        showErrorToast(data.message);
        setLoading({ ...loading, createRoom: false });
        throw new Error("Failed to create room");
      }
    } catch (error) {
      setLoading({ ...loading, createRoom: false });
      if (error instanceof Error) {
        console.error("Error creating room:", error.message);
      }
    }
  };  

  const handleJoinRoom = async () => {
    if (joinRoomCode && joinRoomCode.length === 6) {
      setLoading({ ...loading, joinRoom: true });
      setGame({
        ...game,
        status: true,
        playerOId: userData.data._id,
      });
      try {
        const res = await fetch(`${joinRoom}/${joinRoomCode}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "true",
            playerOId: userData.data._id,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          showErrorToast(data.message);
          setLoading({ ...loading, joinRoom: false });
          return;
        }
        socket.emit("joinSocketChannel", joinRoomCode)

        socket.emit("joinGame", {
          status: true,
          playerOId: userData.data,
          roomCode: joinRoomCode,
        });
        router.push(`/room/${joinRoomCode}`);
      } catch (error) {
        setLoading({ ...loading, joinRoom: false });
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2 items-center">
        <p>Start a new game</p>{" "}
        <button
          className="group flex justify-center cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          onClick={createRoom}
        >
          {loading.createRoom ? <LoadingButton /> : "Create Room"}
        </button>
      </div>
      <div className="flex flex-col px-2 w-full md:w-[20rem] justify-center items-center">
        <div className="w-[15rem] md:w-full relative">
          <Input
            key={"joinRoom"}
            handleChange={handleChange}
            value={joinRoomCode}
            labelText={"Enter Room Code"}
            labelFor={"joinRoom"}
            id={"joinRoom"}
            name={"joinRoomCode"}
            type={"text"}
            isRequired={true}
            placeholder={"Enter Room Code"}
          />
        </div>

        <div className="w-full">
          <button
            className="group mx-auto md:w-[10rem]  break-keep flex justify-center cursor-pointer py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={handleJoinRoom}
          >
            {loading.joinRoom ? <LoadingButton /> : "Join Room"}
          </button>
        </div>
      </div>
      <ToastConainer />
    </>
  );
};

export default StartGame;
