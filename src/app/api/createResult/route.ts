import connectMongoDb from "../../../utils/dbConnection";
import { NextResponse } from "next/server";
import Result from "../../../../models/resultModel";

export async function POST(req: Request) {
  try {
    const { result } = await req.json();
    await connectMongoDb();
    
    await Result.create(result);

    return NextResponse.json(
      {
        message: "Result added successfully.",
        status: true,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: `Error while adding result: ${error.message}`,
          status: false,
        },
        { status: 500 }
      );
    }
  }
}
