'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserRoundPlus } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import { toast } from 'react-toastify';
// import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function Page({ params }) {
  useEffect(()=>{
    const fetchData =  async()=>{
      try{
        const {user} = await params;
        console.log(params);
        await fetchUserData(user);
        
      }
      catch(error){
        console.error('Error fetching user data:',error);
      }
    };
    fetchData()
    
  },[params])
  const router = useRouter();
    const [isEditing,setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
    const [userData, setUserData] = useState({
      id:'',
      full_name:'',
      date_of_birth:'',
      nic_number:'',
      phone_number:'',
      email_address:'',
      address:'',
      username:'',
      password_hashed:'',
      license_number:'',
      issue_date:'',
      expire_date:'',
      front_image_url:'',
      back_image_url:'',
      qr_image_url:'',
    })
    
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [frontImagePreview, setFrontImagePreview] = useState(null);
    const [backImagePreview, setBackImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('front');
    const [licenseImg, setLicenseImg] = useState('');

    const fetchUserData = async (user) => {
      try{
        const response = await fetch('/api/dmt/manage-users/single-user', {
          method: 'POST',
          credentials : 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({license_number:user})
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData({
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
        });
        setFormData(
          {
            fullName: data.full_name,
            dateOfBirth: data.date_of_birth,
            nicNumber: data.nic_number,
            phoneNumber: data.phone_number,
            emailAddress: data.email_address,
            address: data.address,
            licenseNumber: data.license_number,
            issueDate: data.issue_date,
            expireDate: data.expire_date,
          }
        );
        setLicenseImg(data.front_image_url);
        console.log(data);
      }
      catch(error) {
        console.error('Error fetching user data:', error);
      }
    }
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    async function deleteUser() {
      try {
        const response = await fetch('/api/dmt/manage-users/single-user/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ license_number: userData.license_number }), // Pass the license number of the user to be deleted
        });
    
        const result = await response.json();
    
        if (response.ok) {
          console.log('User deleted successfully:', result.message);
          router.push('/dashboard/manage-users'); // Redirect to the manage users page after deletion
          // Handle success (e.g., show a success message or refresh the UI)
        } else {
          console.error('Error deleting user:', result.error);
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error calling delete API:', error);
        // Handle network or unexpected errors
      }
    }


    const handleSubmit = async (e) => {
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
        // Send data to backend API
        const response = await fetch('/api/dmt/manage-users/single-user/update', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          toast.error("Failed to update user",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          throw new Error(errorData.message || 'Failed to update user');
          
        }
        
        const result = await response.json();
        setSuccess('User update successfully!');
        toast.success('User update successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        // Optional: Redirect after successful submission
        setTimeout(() => {
          setIsEditing(false);
          const fetchData =  async()=>{
            try{
              const {user} = await params;
              console.log(params);
              await fetchUserData(user);
              
            }
            catch(error){
              console.error('Error fetching user data:',error);
            }
          };
          fetchData()

        }, 2000);
        
      } catch (error) {
        setError(error.message);
        toast.error(error.message,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="max-w-2xl  mx-auto p-4">
        
        <div className='flex w-full  gap-2 justify-between'>
          <div className='flex gap-3'>
            <UserRoundPlus/>
            <h1 className="flex items-center text-xl font-medium mb-6">Manage User</h1>
          </div>
          <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical className="text-dark-blue" size={25} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={()=>{setIsEditing(true)}}>
                        Edit User
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem  className="text-red-500 hover:text-red-500 active:text-red-500" onClick={deleteUser}>
                        Delete User
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
        
        <div>
          <div className="mb-6 flex flex-col gap-3">
            <h2 className="text-lg font-medium mb-4 pb-2 border-b">Personal Details</h2>
            
            <div className="mb-4">
              <label htmlFor="fullName" className="block mb-2 text-sm font-medium">
                Full Name
              </label>
              {isEditing ? (
                <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ): (<p className="text-gray-700 font-semibold">{userData.full_name}</p>)}
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ) : (<p className="text-gray-700 font-semibold">{userData.date_of_birth}</p>)}
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="nicNumber" className="block mb-2 text-sm font-medium">
                NIC Number
              </label>
              { isEditing ? (
                <input
                type="text"
                id="nicNumber"
                name="nicNumber"
                value={formData.nicNumber} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ) : (<p className="text-gray-700 font-semibold">{userData.nic_number}</p>)}
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">
                Phone Number
              </label>
              {isEditing ? (
                <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ) : (<p className="text-gray-700 font-semibold">{userData.phone_number}</p>)}
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="emailAddress" className="block mb-2 text-sm font-medium">
                Email Address
              </label>
              {isEditing ? (
                <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ) : (<p className="text-gray-700 font-semibold">{userData.email_address}</p>)}
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 text-sm font-medium">
                Address
              </label>
              {isEditing ? (
                <input
                type="text"
                id="address"
                name="address"
                value={formData.address} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ) : (<p className="text-gray-700 font-semibold">{userData.address}</p>)}
              
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4 pb-2 border-b">Driving License Details</h2>
            
            <div className="mb-4">
              <label htmlFor="licenseNumber" className="block mb-2 text-sm font-medium">
                License Number
              </label>
              {isEditing ? (
                <input
                readOnly
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber} // Updated to formData
                onChange={handleInputChange}
                title='License number cannot be changed'
                className="w-full px-3 py-2 bg-slate-200 cursor-not-allowed border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ):(<p className="text-gray-700 font-semibold">{userData.license_number}</p>)}
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="issueDate" className="block mb-2 text-sm font-medium">
                Issue Date
              </label>
              {isEditing ? (
                <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ):(<p className="text-gray-700 font-semibold">{userData.issue_date}</p>)}
              
            </div>
            
            <div className="mb-4">
              <label htmlFor="expireDate" className="block mb-2 text-sm font-medium">
                Expire Date
              </label>
              {isEditing ? (
                <input
                type="date"
                id="expireDate"
                name="expireDate"
                value={formData.expireDate} // Updated to formData
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              ):(<p className="text-gray-700 font-semibold">{userData.expire_date}</p>)}
              
            </div>

            {isEditing ? (<></>):(
              <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Driving License Images
              </label>
              <div className="flex mb-4">
                  <button 
                    className={`flex-1 py-2 text-center font-medium rounded-l-md ${activeTab === 'front' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => {setActiveTab('front'); setLicenseImg(userData.front_image_url)}}
                  >
                    Front Side
                  </button>
                  <button 
                    className={`flex-1 py-2 text-center font-medium rounded-r-md ${activeTab === 'back' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => {setActiveTab('back') ; setLicenseImg(userData.back_image_url)}}
                  >
                    Back Side
                  </button>
              </div>
                
              {/* Image Placeholder */}
              <div className="bg-gray-500 w-full aspect-[4/3] rounded-md flex items-center justify-center mb-2" style={{ backgroundImage: `url('${licenseImg}')`, backgroundPosition:'center', backgroundSize:'contain' }}  ></div>
            </div>
            )}
            
            
          </div>
          {isEditing ? (
            <div>
            <button className="w-full mb-3  border border-blue-900 text-blue-900 py-3 rounded-md hover:bg-blue-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400" onClick={()=>{setIsEditing(false);}}>Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-900 text-button-text-color py-3 rounded-md hover:bg-blue-800 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {isLoading ? 'Updating User...' : 'Update User'}
            </button>
          </div>
          ):(<></>)}
          
        </div>
      </div>
    );
}