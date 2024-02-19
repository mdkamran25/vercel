import DashboardHeader from "@/components/dashboardHeader/dashboardHeader";
import GameBoard from "@/components/gameBoard/gameBoard";
import GameDetails from "@/components/gameDetails/gameDetails";
import { getRoom } from "@/constants/apiUrl";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";


const Room = async ({ params }: { params: { roomCode: string } }) => {
  const session: Session | null = await getServerSession();
  const { roomCode } = params;
  if (!session) {
    redirect("/");
  }

  const room = await fetch(`${getRoom}/${roomCode}`);
  const data = await room.json();
  const roomData = data?.data as Game;

  if (!room.ok) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="header pt-2 ps-2 md:p-5">
        <DashboardHeader headerMessage={session?.user?.name as string} />
      </div>
      <div className="flex flex-col-reverse md:flex-row md:gap-[3rem] xl:gap-[10rem] w-screen items-center justify-center">
        <div className="w-full flex justify-center md:justify-end items-center">
          <GameBoard roomData={roomData} />
        </div>
        <div className="w-full h-full flex justify-center md:justify-start md:pt-[9rem] xl:pt-[5rem] items-center">
          <GameDetails roomCode={roomCode} />
        </div>
      </div>
    </div>
  );
};

export default Room;
