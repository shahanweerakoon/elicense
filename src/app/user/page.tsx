"use client"
import { useState } from 'react';
import { CircleUserRound,QrCode } from 'lucide-react';
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
} from "@/components/ui/dropdown-menu"


export default function UserPage() {
    const [showQR, setShowQR] = useState(false);

    return(
        <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <button className="text-blue-600">
        

        </button>
        <div className="flex items-center text-blue-600 font-semibold text-xl">
          <img src="/logo.png" alt="Logo" className="w-28  mr-2" />
        </div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound className='text-dark-blue' size={25} />
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
        <DropdownMenuItem className='text-red-500 hover:text-red-500 active:text-red-500'>
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
              <h1 className="text-2xl font-semi-bold">Isuru Perera</h1>
              <p className="text-sm">License No : B1234567</p>
            </div>
            <span className="bg-[#C1F5A9] text-[#3C8F0F] rounded-full  text-xs font-medium px-4 py-2 rounded">Active</span>
          </div>
          
          <div className="flex justify-start gap-5 mt-6">
            <div>
              <p className="text-xs text-white">Issue Date</p>
              <p className="text-sm">2020-03-10</p>
            </div>
            <div>
              <p className="text-xs text-white">Expire Date</p>
              <p className="text-sm">2030-03-09</p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className='bg-white p-5'>
        <div className="bg-light-blue rounded-lg  p-4">
          <button 
            className="w-full flex justify-center items-center py-3"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? (
              <div className="w-32 h-32 border-2 border-dashed border-gray-400 flex items-center justify-center p-4">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-6 h-6 bg-gray-800"></div>
                  <div className="w-6 h-6 bg-gray-800"></div>
                  <div className="w-6 h-6 bg-gray-800"></div>
                  <div className="w-6 h-6 bg-gray-800"></div>
                </div>
              </div>
            ) : (
              <>
              <div className='flex flex-col items-center gap-2.5'>
              <div className='p-2 w-fit h-fit border-2 rounded-xl border-dark-blue border-dashed'>
                <QrCode className='text-dark-blue' size={40} strokeWidth={1.5}/>
              </div>
                <span className="text-gray-800 text-lg font-medium">Show QR Code</span>
              </div>
              
              </>
            )}
          </button>
        </div>
        </div>

        {/* User Details */}
        <div className="bg-white   p-5">
          <h2 className="font-bold text-lg mb-4">User Details</h2>
          
          <div className="flex items-center mb-4">
            <div className="mr-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-base">1990-02-08</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-3 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-base">123 Main Street, Colombo 5, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}