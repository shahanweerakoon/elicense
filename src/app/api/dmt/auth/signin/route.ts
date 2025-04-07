import { officerLogin } from "@/lib";
import { NextResponse, NextRequest } from "next/server";
import { off } from "process";

export async function POST(request: NextRequest) {
  // Get the form data
  console.log("Request body:", request.body);
  const body = await request.json();
  const username = body.username as string;
  const password = body.password as string;

  // Call the login function
  const res = await officerLogin(username, password);
  
  return res;
}