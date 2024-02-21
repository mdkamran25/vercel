import PortalProvider from "@/components/portalProvider/portalProvider";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import closeIcon from "../../assets/cross.svg";
import Image from "next/image";
import Rematch from "@/components/rematch/rematch";
import socket from "@/utils/socket";
import { GameContext } from "@/context/gameContext";
import { showErrorToast } from "@/utils/toast";
import ToastConainer from "@/components/toastConainer";
const ResultModal = ({ status }: { status: string }) => {
  const [show, setShow] = useState<boolean>(true);
  const {game} = useContext(GameContext) as GameContextType;
  const router = useRouter();
  const closeModal = () => {
    socket.emit("leaveGame", {
      roomCode: game.roomCode,
      message: "Opponent left game",
    });
    router.push("/");
    setShow(false)
  };

  useEffect(()=>{
    socket.on("recieveLeaveGame", (data)=>{
      showErrorToast(data, "error")
    })
    return () => {
      socket.off("recieveLeaveGame");
    };
  },[])


  return (
    <PortalProvider selector="resultModal" show={show}>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "15rem",
          height: "15rem",
          zIndex: 10,
        }}
        className="bg-white rounded shadow-md z-10 flex flex-col items-center justify-center"
      >
        <div className="absolute top-2 right-2">
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={closeModal}
          >
            <Image src={closeIcon} alt="Cross Icon" width={20} height={20} />{" "}
          </button>
        </div>
        <p className="text-center font-semibold text-black text-2xl pt-1">
          {status}
        </p>
        <div className="rematch">
          <Rematch />
        </div>
      </div>
      <ToastConainer />
    </PortalProvider>
  );
};

export default ResultModal;
