import connectMongoDb from "../../../utils/dbConnection";
import { NextResponse } from "next/server";
import Game from "../../../../models/gameModel";

export async function POST(req: Request) {
  try {
    await connectMongoDb();
    const { game } = await req.json();

    const roomExist = await Game.findOne({ roomCode: game.roomCode });
    if (roomExist) {
      return NextResponse.json(
        {
          message: "A room with the same roomCode already exists.",
          status: false,
        },
        { status: 409 }
      );
    }

    await Game.create(game);

    return NextResponse.json(
      {
        message: "Room created successfully.",
        status: true,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error while creating Room:", error.message);
      return NextResponse.json(
        {
          message: `Error while creating Room: ${error.message}`,
          status: false,
        },
        { status: 500 }
      );
    }
  }
}
