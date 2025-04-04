"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import { Search, UserPlus, Users, FileText, LogOut } from 'lucide-react';

export default function DashboardPage(){
    const [activeTab, setActiveTab] = useState('dashboard');
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchSession();
    }, []);
    const router = useRouter();
    const clickHandle=()=>{
        router.push("/");
    }

    const fetchSession = async()=>{
        console.log("function run")
        await fetch("/api/session").then((res) => res.json()).then((data) => setData(data)).catch((err) => console.error("Error:", err));
        console.log("function run");
    }
    

    return(
        <>
            {/* <h1>Dashboard</h1>
            <div>{data ? data.message : "Loading..."}</div>
            <button onClick={()=>clickHandle()} >login</button>
             */}
            <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">DMT License System</h1>
          <p className="text-sm text-blue-200 mt-1">Officer Portal</p>
        </div>
        
        <nav className="mt-6">
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
          
          <div className="flex items-center px-6 py-3 cursor-pointer hover:bg-blue-700 mt-auto">
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'users' && 'Manage Users'}
              {activeTab === 'create' && 'Create New User'}
            </h2>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <input 
                  type="text" 
                  placeholder="Search licenses..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="ml-2 text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Total Licenses</h3>
                <p className="text-3xl font-bold text-blue-600">2,568</p>
                <p className="text-sm text-gray-500 mt-2">+156 this month</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Active Users</h3>
                <p className="text-3xl font-bold text-green-600">2,245</p>
                <p className="text-sm text-gray-500 mt-2">92% activation rate</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">QR Scans</h3>
                <p className="text-3xl font-bold text-purple-600">15,782</p>
                <p className="text-sm text-gray-500 mt-2">+2,453 this week</p>
              </div>
              
              <div className="col-span-full bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(item => (
                    <div key={item} className="flex items-center pb-3 border-b border-gray-200">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                        {item}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">DMT25{item.toString().padStart(4, '0')}</p>
                        <p className="text-sm text-gray-500">License created • 2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'create' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Create New User</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Images</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-500 mb-2">Front Side</p>
                      <button type="button" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                        Upload Image
                      </button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-500 mb-2">Back Side</p>
                      <button type="button" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
                        Upload Image
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-full mt-4">
                  <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Create User & Generate QR Code
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
        
        </>
    )
}