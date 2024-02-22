import { io } from "socket.io-client";

const url:string = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string;

const socket = io(url);

socket.on("connect", () => {
    console.log("Socket connected");
  });

export default socket;
