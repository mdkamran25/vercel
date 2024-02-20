import { NextResponse } from "next/server";
import connectMongoDb from "../../../../utils/dbConnection";
import Game from "../../../../../models/gameModel";

export async function PATCH(
  req: Request,
  { params }: { params: JoinRoomApiParams }
) {
  const { roomCode } = params;
  const game = await req.json();
  await connectMongoDb();
  try {
    const room = await Game.findOneAndUpdate(
      { roomCode },
      { $set: { ...game } },
      { new: true }
    );

    return NextResponse.json({ message: "Game Updated", data: room, status: true }, { status: 200 });
    
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
  return null;
}
