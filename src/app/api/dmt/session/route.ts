import { getSession, officerGetSession } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await officerGetSession();
    console.log("session", session);
    if (!session) {
        return NextResponse.json({ error: "No session" }, { status: 401 });
    }
    return NextResponse.json({ session, status: 200 });


    
}