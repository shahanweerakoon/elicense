import { supabase, userGetSession } from "@/lib";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await userGetSession();
    if (!session) return new Response("Unauthorized", { status: 401 });
    const { data, error } = await supabase.from("license_users").select("*").eq("id", session.user.id).single();
    if (error || !data) return new Response("User not found", { status: 404 });
    
    const userProfile = {
        full_name: data.full_name,
        license_number: data.license_number,
        issue_date: data.issue_date,
        expire_date: data.expire_date,
        date_of_birth: data.date_of_birth,
        address: data.address,
        qr_image_url: data.qr_image_url,
        front_image_url: data.front_image_url,
        back_image_url: data.back_image_url
    }
    return NextResponse.json(userProfile, { status: 200 });
}