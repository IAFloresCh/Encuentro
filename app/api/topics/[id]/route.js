import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newDate: date, newTitle: title, newDescription: description, newExtraFields: extraFields} = await request.json();

  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { date, title, description, extraFields});
  return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
