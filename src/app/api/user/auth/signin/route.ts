import { userLogin } from "@/lib";
import { NextRequest } from "next/server";
import { use } from "react";

export async function POST(request: NextRequest) {
  // Get the form data
  console.log("Request body:", request.body);
  const body = await request.json();
  const username = body.username as string;
  const password = body.password as string;

  // Call the login function
  const res = await userLogin(username, password);
  

  // Return the response
  return res;
}