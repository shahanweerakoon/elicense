import { supabase } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const userLicenseNumber = requestBody.license_number;
        console.log("Received license number:", userLicenseNumber);

        const { data, error, count } = await supabase
            .from("license_users")
            .delete()
            .eq("license_number", userLicenseNumber);

        if (error) {
            console.error("Error deleting user:", error);
            return NextResponse.json(
                { error: "Error deleting user" },
                { status: 500 }
            );
        }

        if (count === 0) {
            console.error("User not found:", userLicenseNumber);
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { status: 200, message: "User deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error in POST handler:", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}