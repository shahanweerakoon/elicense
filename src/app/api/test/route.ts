import { NextResponse } from "next/server";
import { headers } from "next/headers";


export async function GET(){
    const headersList = await headers();
    const host = headersList.get("host");
    const url = "http://"+ host ;
    return NextResponse.json({
        message:`${url}`
    })
}