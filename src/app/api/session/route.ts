import { getSession } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const value = await getSession();
    const str = JSON.stringify(value);
    if(value == null){
        return NextResponse.json({
            message:"no JWT Token"
        })
    }
    return NextResponse.json({
        message:str
    })
}