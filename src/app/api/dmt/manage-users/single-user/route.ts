import { officerGetSession, supabase, userGetSession } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "GET request" }, { status: 200 });
}
export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const userLicenseNumber = requestBody.license_number;
        console.log("Received license number:", userLicenseNumber);

        const { data, error } = await supabase
            .from("license_users")
            .select("*")
            .eq("license_number", userLicenseNumber)
            .single();

        if (error || !data) {
            console.error("Supabase Error:", error);
            return new Response("User not found", { status: 404 });
        }

        const userProfile = {
            id: data.id,
            full_name: data.full_name,
            date_of_birth: data.date_of_birth,
            nic_number: data.nic_number,
            phone_number: data.phone_number,
            email_address: data.email_address,
            address: data.address,
            username: data.username,
            password_hashed: data.password_hashed,
            license_number: data.license_number,
            issue_date: data.issue_date,
            expire_date: data.expire_date,
            front_image_url: data.front_image_url,
            back_image_url: data.back_image_url,
            qr_image_url: data.qr_image_url,
            
        };
        return NextResponse.json(userProfile, { status: 200 });
    } catch (err) {
        console.error("Error in POST handler:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}