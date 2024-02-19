export const checkGameStatus = (
  roomData: Game,
  userEmail: string | undefined
): string => {
  if (!roomData) return "Not Started";

  return roomData.winner
    ? roomData.winner === "Match Draw"
      ? "Match Draw"
      : roomData.winner === "X"
      ? (roomData.playerXId as UserData).email === userEmail
        ? "You Won"
        : "You Lose"
      : (roomData.playerOId as UserData).email === userEmail
      ? "You Won"
      : "You Lose"
    : roomData.status
    ? "In Progress..."
    : "Not Started";
};
