import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user"; // Make sure this points to your User model
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json(); // Assuming you send the user fields directly
  await connectMongoDB();
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }); // { new: true } to return the updated doc
  if (!updatedUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "User updated", user: updatedUser }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await User.findById(id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user }, { status: 200 });
}
