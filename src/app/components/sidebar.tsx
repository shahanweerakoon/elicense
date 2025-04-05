"use client"
import { useState} from "react";
import { UserPlus, Users, FileText, LogOut } from 'lucide-react';


export function Sidebar() {
    const [activeTab, setActiveTab] = useState('dashboard');
    return(
        <div className="w-64 h-screen hidden  lg:block bg-blue-800 text-white">
                <div className="p-6">
                  <h1 className="text-xl font-bold">DMT License System</h1>
                  <p className="text-sm text-blue-200 mt-1">Officer Portal</p>
                </div>
                
                <nav className="mt-6 flex flex-col justify-between  ">
                    <div>
                    <div 
                    className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <FileText size={18} className="mr-3" />
                    <span>Dashboard</span>
                  </div>
                  
                  <div 
                    className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'users' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
                    onClick={() => setActiveTab('users')}
                  >
                    <Users size={18} className="mr-3" />
                    <span>Manage Users</span>
                  </div>
                  
                  <div 
                    className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'create' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
                    onClick={() => setActiveTab('create')}
                  >
                    <UserPlus size={18} className="mr-3" />
                    <span>Create New User</span>
                  </div>
                  
                    </div>
                  
                  <div className="flex items-center px-6 py-3 cursor-pointer hover:bg-blue-700 mt-auto">
                    <LogOut size={18} className="mr-3" />
                    <span>Logout</span>
                  </div>
                </nav>
              </div>
    )
}