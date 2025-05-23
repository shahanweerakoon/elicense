import { getSession } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(){
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