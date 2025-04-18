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
        <main className="p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#EDFCFF] rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2 text-[0B1956]">Total Licenses</h3>
                <p className="text-3xl font-bold text-[0B1956]">2,568</p>
                <p className="text-sm text-gray-500 mt-2">+156 this month</p>
              </div>
              
              <div className="bg-[#EEFFE5] rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2 text-[#3E9212]">Active Users</h3>
                <p className="text-3xl font-bold text-[#3E9212]">2,245</p>
                <p className="text-sm text-gray-500 mt-2">92% activation rate</p>
              </div>
              
              <div className="bg-[#FCE5FF] rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2 text-[#7111BA]">QR Scans</h3>
                <p className="text-3xl font-bold text-[#7111BA]">15,782</p>
                <p className="text-sm text-gray-500 mt-2">+2,453 this week</p>
              </div>
              
              {/* <div className="col-span-full bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  
                </div>
              </div> */}
            </div>
        </main>
      </>
    )
}