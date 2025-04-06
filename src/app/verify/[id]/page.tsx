"use client"
import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Verify() { 
  const router = useRouter();
  const searchParams = useSearchParams(); // Use this to get dynamic route params
  const id = searchParams.get("id");
  useEffect(()=>{
    
    handleVerifyLicense(id as string);
  },[])
    const [activeTab, setActiveTab] = useState('front');

    const [fullName, setFullName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState(''); 
    const [issueDate, setIssueDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [qrImageUrl, setQrImageUrl] = useState('');
    const [frontImageUrl, setFrontImageUrl] = useState('');
    const [backImageUrl, setBackImageUrl] = useState('');


    const handleVerifyLicense = async(id:string)=>{
        const res = await fetch('/api/verify',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:id})
        })
        if (!res.ok) {
            console.error('Error fetching data:', res.statusText);
            return;
        }
    
        const data = await res.json()
        setFullName(data.full_name);
        setLicenseNumber(data.license_number);
        setIssueDate(data.issue_date);
        setExpireDate(data.expire_date);
        setDateOfBirth(data.date_of_birth);
        setAddress(data.address);
        setQrImageUrl(data.qr_image_url);
        setFrontImageUrl(data.front_image_url);
        setBackImageUrl(data.back_image_url);
        console.log(data)
    }
    return (
        <div className="bg-light-blue min-h-screen">
          {/* Header */}
          <div className="flex justify-center items-center py-3 bg-white">
            <img src="/logo.png" alt="Logo" className="w-32  mr-2" />
            </div>
          <div className="max-w-md mx-auto p-4">
            {/* Verification Badge */}
            <div className="bg-green-50 gap-3 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
              <ShieldCheck size={60} className='text-medium-green' />
              <div>
                <h2 className="text-medium-green font-normal text-lg">Verified Driving License</h2>
                <p className="text-light-gray text-sm">This is an official verification from the Department of Motor Traffic, Sri Lanka</p>
              </div>
            </div>
    
            {/* License Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Driving License Images</h2>
                
                {/* Tabs */}
                <div className="flex mb-4">
                  <button 
                    className={`flex-1 py-2 text-center font-medium rounded-l-md ${activeTab === 'front' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('front')}
                  >
                    Front Side
                  </button>
                  <button 
                    className={`flex-1 py-2 text-center font-medium rounded-r-md ${activeTab === 'back' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setActiveTab('back')}
                  >
                    Back Side
                  </button>
                </div>
                
                {/* Image Placeholder */}
                <div className="bg-gray-200 h-48 rounded-md flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
              </div>
              
              {/* License Details */}
              <div className="px-4 pb-4">
                <h2 className="text-lg font-semibold mb-4">License Details</h2>
                
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Full Name</p>
                      <p className="font-medium text-gray-800">{fullName}</p>
                    </div>
                  </div>
                  
                  {/* License Number */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">License Number</p>
                      <p className="font-medium text-gray-800">B1234567</p>
                    </div>
                  </div>
                  
                  {/* Issued Date */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Issued Date</p>
                      <p className="font-medium text-gray-800">2022-03-10</p>
                    </div>
                  </div>
                  
                  {/* Date of Birth */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Date of Birth</p>
                      <p className="font-medium text-gray-800">1990-02-08</p>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Address</p>
                      <p className="font-medium text-gray-800">123 Main Street, Colombo 5, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            {/* <div className="flex space-x-3">
              <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-200">
                Verify Again
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition duration-200">
                Download PDF
              </button>
            </div> */}
          </div>
        </div>
      );
 }