import connectMongoDb from "../../../utils/dbConnection";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await connectMongoDb();
    const { name, email, password } = await req.json();

    const userExist = await User.findOne({ $or: [{ email }] });

    if (userExist) {
      return NextResponse.json(
        { message: "User already exist", status: false },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      { message: "User Registered...!!", status: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while registering user", status: false },
      { status: 500 }
    );
  }
}
