import { NextResponse } from "next/server";
import connectMongoDb from "../../../../utils/dbConnection";
import Game from "../../../../../models/gameModel";

export async function GET(
  _req: Request,
  { params }: { params: { roomCode: string } }
) {
  const { roomCode } = params;

  try {
    await connectMongoDb();
    const room = await Game.findOne({ roomCode })
      .populate("playerXId")
      .populate("playerOId");
    
      if(!room){
        return NextResponse.json(
          { message: "Room Not found", data: null, status: false },
          { status: 500 }
        );
      }
      
    return NextResponse.json(
      { message: "Room found", data: room, status: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error, status: false },
      { status: 500 }
    );
  }
}
