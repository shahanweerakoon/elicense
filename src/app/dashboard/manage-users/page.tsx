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

  const router = useRouter();

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/dmt/manage-users');
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
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border-b">Username</th>
                <th className="px-4 py-2 border-b">License Number</th>
                <th className="px-4 py-2 border-b">Full Name</th>
                <th className="px-4 py-2 border-b">NIC Number</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-300 cursor-pointer" onClick={() => {
                  router.push(`/dashboard/manage-users/${user.license_number}`);
                }}>
                  <td className="px-4 py-2 border-b">{user.username}</td>
                  <td className="px-4 py-2 border-b">{user.license_number}</td>
                  <td className="px-4 py-2 border-b">{user.full_name}</td>
                  <td className="px-4 py-2 border-b">{user.nic_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}