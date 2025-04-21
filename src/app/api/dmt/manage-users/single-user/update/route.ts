import { supabase } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const userLicenseNumber = requestBody.licenseNumber;
        const {
            fullName,
            dateOfBirth,
            nicNumber,
            phoneNumber,
            emailAddress,
            address,
            licenseNumber,
            issueDate,
            expireDate,
        } = requestBody;
        console.log("Received request body:", requestBody);

        console.log("Processing request for license number");

        // Fetch user by license number
        const { data: userData, error: fetchError } = await supabase
            .from("license_users")
            .select("*")
            .eq("license_number", userLicenseNumber)
            .single();

        if (fetchError || !userData) {
            console.error("Error fetching user:", fetchError);
            return NextResponse.json({
                status: 404,
                message: "User not found",
            });
        }

        // Update user details
        const { data: updatedData, error: updateError } = await supabase
            .from("license_users")
            .update({
                full_name: fullName,
                date_of_birth: dateOfBirth,
                nic_number: nicNumber,
                phone_number: phoneNumber,
                email_address: emailAddress,
                address: address,
                license_number: licenseNumber,
                issue_date: issueDate,
                expire_date: expireDate,
            })
            .eq("license_number", userLicenseNumber)
            .single();

        if (updateError || !updatedData) {
            console.error("Error updating user:", updateError);
            return NextResponse.json({
                status: 500,
                message: "Failed to update user details",
            });
        }

        return NextResponse.json({
            status: 200,
            message: "User details updated successfully",
        });
    } catch (err) {
        console.error("Error in POST handler:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}