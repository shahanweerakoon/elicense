"use client"
import { useState, useEffect } from 'react';
import { CircleUserRound, QrCode, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

export default function UserPage() {
  const router = useRouter()
  useEffect(() => {
    handleUserProfile();
  }, []);

  const [showQR, setShowQR] = useState(false);

  const [fullName, setFullName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [frontImageUrl, setFrontImageUrl] = useState('');
  const [backImageUrl, setBackImageUrl] = useState('');

  const handleUserProfile = async () => {
    const res = await fetch('/api/user/profile');
    const data = await res.json();
    setFullName(data.full_name);
    setLicenseNumber(data.license_number);
    setIssueDate(data.issue_date);
    setExpireDate(data.expire_date);
    setDateOfBirth(data.date_of_birth);
    setAddress(data.address);
    setQrImageUrl(data.qr_image_url);
    setFrontImageUrl(data.front_image_url);
    setBackImageUrl(data.back_image_url);
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <button className="text-blue-600"></button>
        <div className="flex items-center text-blue-600 font-semibold text-xl">
          <img src="/logo.png" alt="Logo" className="w-28 mr-2" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CircleUserRound className="text-dark-blue" size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>router.push('/user/login')} className="text-red-500 hover:text-red-500 active:text-red-500">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main content */}
      <div className="px-4 py-2 flex-1">
        {/* License Card */}
        <div className="bg-dark-blue rounded-lg p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semi-bold">{fullName}</h1>
              <p className="text-sm">License No : {licenseNumber}</p>
            </div>
            <span className="bg-[#C1F5A9] text-[#3C8F0F] rounded-full text-xs font-medium px-4 py-2">
              Active
            </span>
          </div>

          <div className="flex justify-start gap-5 mt-6">
            <div>
              <p className="text-xs text-white">Issue Date</p>
              <p className="text-sm">{issueDate}</p>
            </div>
            <div>
              <p className="text-xs text-white">Expire Date</p>
              <p className="text-sm">{expireDate}</p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white p-5">
          <div className="bg-light-blue rounded-lg p-4">
            <button
              className="w-full flex justify-center items-center py-3"
              onClick={() => setShowQR(true)}
            >
              <div className="flex flex-col items-center gap-2.5">
                <div className="p-2 w-fit h-fit border-2 rounded-xl border-dark-blue border-dashed">
                  <QrCode className="text-dark-blue" size={40} strokeWidth={1.5} />
                </div>
                <span className="text-gray-800 text-lg font-medium">Show QR Code</span>
              </div>
            </button>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white p-5">
          <h2 className="font-bold text-lg mb-4">User Details</h2>

          <div className="flex items-center mb-4">
            <div className="mr-3 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-base">{dateOfBirth}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-3 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-base">{address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div
          className="fixed inset-0 bg-black opacity-10% flex justify-center items-center z-50"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white p-5 rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowQR(false)}
            >
              <X size={20} />
            </button>
            <div className="w-64 h-64 flex justify-center items-center border-2 border-dashed border-gray-400">
              {qrImageUrl ? (
                <img src={qrImageUrl} alt="QR Code" className="w-full h-full object-contain" />
              ) : (
                <p className="text-gray-500">No QR Code Available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}