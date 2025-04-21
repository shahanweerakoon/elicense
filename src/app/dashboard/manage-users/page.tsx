"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ManageUserPage() {
  interface User {
    username: string;
    license_number: string;
    full_name: string;
    nic_number: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState(true);
  const [searchValue,setSearchValue] = useState('');

  const router = useRouter();

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

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/dmt/manage-users',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchValue }),
        });
        const data = await response.json();

        if (response.ok) {
          setUsers(data.users);
        } else {
          setError(data.error || 'Failed to fetch users');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      }
    };

    fetchUsers();
  }, [searchValue]);

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className='flex justify-start py-4 '>
        <input placeholder='Search User' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} type="text" className='w-full max-w-sm  px-3 py-2 border-b-2 border-border-blue  focus:outline-none  focus:ring-blue-200"' />
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-slate-200 text-left">
                <th className="px-4 py-2 border-b">License Number</th>
                <th className="px-4 py-2 border-b">Full Name</th>
                <th className="px-4 py-2 border-b">NIC Number</th>
                <th className="px-4 py-2 border-b">Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100 cursor-pointer" onClick={() => {
                  router.push(`/dashboard/manage-users/${user.license_number}`);
                }}>
                  <td className="px-4 py-2 border-b">{user.license_number}</td>
                  <td className="px-4 py-2 border-b">{user.full_name}</td>
                  <td className="px-4 py-2 border-b">{user.nic_number}</td>
                  <td className="px-4 py-2 border-b">{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}