import { NextResponse } from "next/server";
import User from "../../../../../models/userModel";
import connectMongoDb from "../../../../utils/dbConnection";
import { cookies } from "next/headers";

export async function GET(
  _req: Request,
  { params }: { params: { email: string } }
) {
  await connectMongoDb();
  const user = await User.findOne({ email: params?.email });
  const cookieStore = cookies();
  const visited = cookieStore.get("visited");

  if (visited) {
    return NextResponse.json(
      { message: "User found", data: user, status: true, existingUser: true },
      { status: 201 }
    );
  }

  cookieStore.set("visited", "true");

  return NextResponse.json(
    { message: "User found", data: user, status: true, existingUser: false },
    { status: 201 }
  );
}
