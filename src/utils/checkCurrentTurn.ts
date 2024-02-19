import { Session } from "next-auth";

export const checkTurn = (
  game: Game,
  session: ClientSideSession | undefined,
  i: number
) => {
  if (
    !game.winner &&
    game.status &&
    game.board[i] === "" &&
    game.turn === "X" &&
    (game.playerXId as UserData).email === session?.email
  ) {
    return false;
  } else if (
    !game.winner &&
    game.status &&
    game.board[i] === "" &&
    game.turn === "O" &&
    (game.playerOId as UserData).email === session?.email
  ) {
    return false;
  } else {
    return true;
  }
};
