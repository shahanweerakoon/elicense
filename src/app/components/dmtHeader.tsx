"use client"
import { AlignJustify,ShieldUser,UserPlus, Users, FileText, LogOut } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export function DmtHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const [manuActive, setMenuActive] = useState("hidden");
    
    const toggleMenu = () => {
        if (manuActive === "hidden") {
            setMenuActive("");
        }else{
            setMenuActive("hidden");
        }
    };
    const navItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: <FileText size={18} className="mr-3" />,
        key: 'dashboard',
      },
      {
        name: 'Manage Users',
        href: '/dashboard/manage-users',
        icon: <Users size={18} className="mr-3" />,
        key: 'users',
      },
      {
        name: 'Create New User',
        href: '/dashboard/create-user',
        icon: <UserPlus size={18} className="mr-3" />,
        key: 'create',
      },
    ];
  
    return(
        <div>
            <div className="flex items-center justify-between py-3.5 px-6 h-fit w-full">
            <AlignJustify onClick={()=>toggleMenu()}/>
            <img src="/logo.png" alt="Logo" className="w-28  mr-2" />
            <ShieldUser/>   
        </div>
        <div></div>
        <div className={`absolute flex flex-col ${manuActive} h-screen fixed w-64 bg-dark-blue left-0 top-0`}>
            <div>
                <AlignJustify onClick={()=>toggleMenu()} className="text-white  ml-6 mt-4" />
            </div>
            <nav className="mt-6 flex flex-col justify-between h-[calc(100%-6rem)]">
            <div>
            {navItems.map((item) => {
                const isActive =
                pathname === item.href;
                return (
                <Link
                    key={item.key}
                    href={item.href}
                    onClick={()=>toggleMenu()}
                    className={`flex items-center px-6 py-3 cursor-pointer text-white ${
                    isActive ? 'bg-blue-900' : 'hover:bg-blue-700'
                    }`}
                >
                    {item.icon}
                    <span>{item.name}</span>
                </Link>
                );
            })}
            </div>

            <div className="flex items-center  text-white px-6 py-3 cursor-pointer hover:bg-blue-700 mt-auto">
            <LogOut size={18} className="mr-3" />
            <span onClick={()=>router.push('/login')}>Logout</span>
            </div>
        </nav>
        </div>
        </div>
        
    )
}