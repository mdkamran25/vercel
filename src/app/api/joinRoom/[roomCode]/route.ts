import { NextResponse } from "next/server";
import connectMongoDb from "../../../../utils/dbConnection";
import Game from "../../../../../models/gameModel";

export async function PATCH(
  req: Request,
  { params }: { params: JoinRoomApiParams }
): Promise<void | Response> {
  const { roomCode } = params;
  const game = await req.json();
  const { playerOId, status } = game;

  await connectMongoDb();
  try {
    const roomExist = await Game.findOne({ roomCode });

    if (!roomExist) {
      return NextResponse.json(
        { message: "No such room found...", status: false },
        { status: 500 }
      );
    }

    if (roomExist.playerOId && roomExist?.playerOId !== playerOId) {
      return NextResponse.json(
        { message: "Room is full...", status: false },
        { status: 500 }
      );
    }

    const room = await Game.findOneAndUpdate(
      { roomCode },
      { $set: { playerOId, status } },
      { new: true }
    );

    return NextResponse.json({ message: "", status: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          message: `Error while Joining Room: ${error.message} `,
          status: false,
        },
        { status: 500 }
      );
  }
}
