import connectMongoDB from "@/libs/mongodb";
import Doctor from "@/models/doctor"; // Adjust this path to your Doctor model location
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json(); // Assume you send the doctor fields directly
  await connectMongoDB();
  const updatedDoctor = await Doctor.findByIdAndUpdate(id, data, { new: true }); // { new: true } returns the updated document
  if (!updatedDoctor) {
    return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Doctor updated", doctor: updatedDoctor }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    return NextResponse.json({ message: "Doctor not found" }, { status: 404 });
  }
  return NextResponse.json({ doctor }, { status: 200 });
}
