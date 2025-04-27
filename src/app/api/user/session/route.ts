import { userGetSession } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await userGetSession();
    console.log("session", session);
    if (!session) {
        return NextResponse.json({ error: "No session" }, { status: 401 });
    }
    return NextResponse.json({ session, status: 200 });
}   