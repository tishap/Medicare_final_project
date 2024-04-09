import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    await connectMongoDB();
    const user = await User.create(data);
    return NextResponse.json({ message: "User Created", user }, { status: 201 });
  }
  
  export async function GET() {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
  }
  
  export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  }