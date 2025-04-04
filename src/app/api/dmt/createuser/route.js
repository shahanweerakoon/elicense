import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {createClient} from "@supabase/supabase-js";
const qrcode = require("qrcode");

cloudinary.config({
    cloud_name: "dv3ksjgct",
    api_key: "693557848731567",
    api_secret: "8RQuG75h4QTkcLP3vBGmJy3Cq8s",
  });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);


export function GET(){
    return NextResponse.json({
        route:"/api/dmt/createuser/route.tsx",
        message:"Hello from DMT create user route"
    })
}


export async function POST(request) {
    try {
      // Get form data
      const formData = await request.formData();
      
      //Verfify URL to QR code
      const headersList = request.headers;
      const host = headersList.get("host");
      const url = "http://"+ host + "/veryfy/" + formData.get('licenseNumber');
      const qrCodeDataUrl = await qrcode.toDataURL(url, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.92,
        margin: 1,
      });
      const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`, {
        folder: "qrcodes", // Optional: Save under 'qrcodes' folder
      });
      const secureUrl = result.secure_url;
      


      // Extract all fields
      const userData = {
        full_name: formData.get('fullName'),
        date_of_birth: formData.get('dateOfBirth'),
        nic_number: formData.get('nicNumber'),
        phone_number: formData.get('phoneNumber'),
        email_address: formData.get('emailAddress'),
        address: formData.get('address'),
        username: formData.get('licenseNumber'),
        password_hashed: formData.get('nicNumber'),
        license_number: formData.get('licenseNumber'),
        issue_date: formData.get('issueDate'),
        expire_date: formData.get('expireDate'),
      };
      
      // Get image files
      const frontImage = formData.get('frontImage');
      const backImage = formData.get('backImage');
      
      if (!frontImage || !backImage) {
        return NextResponse.json(
          { message: 'License images are required' }, 
          { status: 400 }
        );
      }
      
      // Upload images to Cloudinary
      const frontImageUrl = await uploadToCloudinary(
        frontImage, 
        `license/${userData.license_number}/front`
      );
      
      const backImageUrl = await uploadToCloudinary(
        backImage, 
        `license/${userData.license_number}/back`
      );

      
      
      // Add image URLs to userData
      userData.front_image_url = frontImageUrl;
      userData.back_image_url = backImageUrl;
      userData.qr_image_url = secureUrl;
      
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('license_users')
        .insert(userData)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { message: 'Failed to create user in database', error: error.message }, 
          { status: 500 }
        );
      }
      
      return NextResponse.json({ 
        message: 'User created successfully', 
        userId: data.id 
      });
      
    } catch (error) {
      console.error('Server error:', error);
      return NextResponse.json(
        { message: 'Server error', error: error.message }, 
        { status: 500 }
      );
    }
  }
  
  // Helper function to upload files to Cloudinary
  async function uploadToCloudinary(file, publicId) {
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert buffer to base64
    const base64Image = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64Image}`;
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          public_id: publicId,
          folder: 'license_app',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
    
    return result.secure_url;
  }