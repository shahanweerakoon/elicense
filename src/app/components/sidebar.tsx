"use client"
import { AlignJustify,ShieldUser,UserPlus, Users, FileText, LogOut } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export function Sidebar() {
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
    
        const logout = async () => {
            try{
                const res = fetch('/api/dmt/logout',{
                    method: 'GET',
                    credentials: 'include'
                });
                if((await res).status === 200){
                    
                    toast.success('Logout successful!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      console.log("Logout successful!")
                      router.push('/login')
                      
                }
                else{
                    toast.error('Logout failed!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                }
            }
            catch(err: any){
                console.error(err.message);
                toast.error('Logout failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
            }

    return(
      <div>
        <div className="w-64 h-screen  md:flex hidden  bg-dark-blue text-white"></div>
        <div className={`md:flex fixed  z-10  hidden flex-col  h-screen  w-64  bg-dark-blue left-0 top-0`}>
            <div>
                <AlignJustify  className="text-dark-blue  ml-6 " />
                <img src="/logo-light.png" className='ml-6 mt-4 w-32' alt="" />
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

            <div onClick={()=>logout()} className="flex items-center  text-white px-6 py-3 cursor-pointer hover:bg-blue-700 mt-auto">
            <LogOut size={18} className="mr-3" />
            <span >Logout</span>
            </div>
        </nav>
        </div>
      </div>
        
    )
}