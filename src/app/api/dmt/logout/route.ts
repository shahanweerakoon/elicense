import { officerLogout } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const logout = await officerLogout();
        return NextResponse.json({
            message: "Logged out successfully",
        }, { status: 200 });
    }
    catch (err){
        return NextResponse.json({
            message: "Error logging out",
        }, { status: 500 });
    }
}