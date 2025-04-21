"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import { Search, UserPlus, Users, FileText, LogOut } from 'lucide-react';

export default function DashboardPage(){
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchSession();
    }, []);
    const router = useRouter();
    const clickHandle=()=>{
        router.push("/login");
    }

    
    const fetchSession = async () => {
      try {
          const res = await fetch("/api/dmt/session", {
              method: "GET",
              credentials: "include",
          });

          if (res.status === 200) {
              const { session } = await res.json();
              setData(session);
              setLoading(false);
          } else {
              router.push("/login");
          }
      } catch (err) {
          console.error(err);
          router.push("/login");
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