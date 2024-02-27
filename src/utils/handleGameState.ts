import { updateRoom } from "@/constants/apiUrl";
import socket from "./socket";

export async function handleGameState(
  game: Game,
  setGame: (game: Game) => void,
  updatedBoard: string[],
  updatedTurn: string
) {
  setGame({
    ...game,
    board: updatedBoard,
    turn: updatedTurn,
    status: true,
    winner: null,
  });
  try {
    socket.emit("joinSocketChannel", game.roomCode);

    socket.emit("updateGame", {
      board: updatedBoard,
      turn: updatedTurn,
      roomCode: game.roomCode,
      status: true,
      winner: null,
    });

    const res = await fetch(`${updateRoom}/${game?.roomCode}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board: updatedBoard,
        turn: updatedTurn,
        winner: null,
        status: true,
      }),
    });

    if (!res.ok) {
      console.error("Failed to update game state in API:", res.status);
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error handling game state:", error?.message);
    }
  }
}
