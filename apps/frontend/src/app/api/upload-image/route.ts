import { UTapi } from "@/lib/utapi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const url = await UTapi.uploadFiles([file as File]);

  console.log(url);

  return NextResponse.json({ url });
}
