'use client';

import { useState,useEffect } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { UserRoundPlus } from 'lucide-react';

export default function LicenseRegistrationForm() {

  useEffect(() => {
          fetchSession();
      }, []);
  
      
      const fetchSession = async () => {
        try {
            const res = await fetch("/api/dmt/session", {
                method: "GET",
                credentials: "include",
            });
  
            if (res.status === 200) {
                const { session } = await res.json();
                setLoading(false);
            } else {
                router.push("/login");
            }
        } catch (err) {
            console.error(err);
            router.push("/login");
        }
    };

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nicNumber: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    licenseNumber: '',
    issueDate: '',
    expireDate: '',
  });
  
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e, side) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // File validation
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload only JPEG or PNG images');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size should be less than 5MB');
      return;
    }
    
    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      if (side === 'front') {
        setFrontImagePreview(reader.result);
        setFrontImage(file);
      } else {
        setBackImagePreview(reader.result);
        setBackImage(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Validate form data
      const requiredFields = [
        'fullName', 'dateOfBirth', 'nicNumber', 
        'phoneNumber', 'emailAddress', 'address',
        'licenseNumber', 'issueDate', 'expireDate'
      ];
      
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
        }
      }
      
      if (!frontImage || !backImage) {
        throw new Error('Both front and back license images are required');
      }
      
      // Create FormData for file uploads
      const uploadData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        uploadData.append(key, formData[key]);
      });
      
      // Add images
      uploadData.append('frontImage', frontImage);
      uploadData.append('backImage', backImage);
      
      // Send data to backend API
      const response = await fetch('/api/dmt/createuser', {
        method: 'POST',
        body: uploadData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
      
      const result = await response.json();
      setSuccess('User created successfully!');
      
      // Optional: Redirect after successful submission
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if(loading){
    return(
      <>
        <div className="fixed inset-0  bg-opacity-20 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700"></div>
        </div>
      </>
    )
  }


  return (
    <div className="max-w-2xl  mx-auto p-4">
      
      <div className='flex w-full gap-2 justify-center'>
        <UserRoundPlus/>
        <h1 className="flex items-center text-xl font-medium mb-6">Create New User</h1>
      </div>
      
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
          <p className="text-green-700">{success}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex flex-col gap-3">
          <h2 className="text-lg font-medium mb-4 pb-2 border-b">Personal Details</h2>
          
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="nicNumber" className="block mb-2 text-sm font-medium">
              NIC Number
            </label>
            <input
              type="text"
              id="nicNumber"
              name="nicNumber"
              value={formData.nicNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="emailAddress" className="block mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="address" className="block mb-2 text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4 pb-2 border-b">Driving License Details</h2>
          
          <div className="mb-4">
            <label htmlFor="licenseNumber" className="block mb-2 text-sm font-medium">
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="issueDate" className="block mb-2 text-sm font-medium">
              Issue Date
            </label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="expireDate" className="block mb-2 text-sm font-medium">
              Expire Date
            </label>
            <input
              type="date"
              id="expireDate"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Driving License Images
            </label>
            <div className="flex gap-4">
              <div className="flex-1 border-2 border-medium-blue border-dashed rounded-md p-4 text-center">
                <p className="mb-2">Front Side</p>
                {frontImagePreview ? (
                  <div className="relative h-40 mb-2">
                    <Image 
                      src={frontImagePreview} 
                      alt="Front side preview" 
                      fill 

                      
                      className="object-contain"
                    />
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => document.getElementById('frontImage').click()}
                  className="bg-blue-900 text-button-text-color py-2 px-4 rounded-md hover:bg-blue-800"
                >
                  Upload
                </button>
                <input
                  type="file"
                  id="frontImage"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'front')}
                />
              </div>
              
              <div className="flex-1 border border-2 border-medium-blue border-dashed rounded-md p-4 text-center">
                <p className="mb-2">Back Side</p>
                {backImagePreview ? (
                  <div className="relative h-40 mb-2">
                    <Image 
                      src={backImagePreview} 
                      alt="Back side preview" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => document.getElementById('backImage').click()}
                  className="bg-blue-900 text-button-text-color py-2 px-4 rounded-md hover:bg-blue-800"
                >
                  Upload
                </button>
                <input
                  type="file"
                  id="backImage"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, 'back')}
                />
              </div>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-900 text-button-text-color py-3 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? 'Creating User...' : 'Create User'}
        </button>
      </form>
    </div>
  );
}