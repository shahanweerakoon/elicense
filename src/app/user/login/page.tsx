"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';


export default function UserLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigning, setIsSigning] = useState(false)

  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    setIsSigning(true);
    e.preventDefault();
    console.log('Login attempt with:', { username, password });
    const res = await fetch('/api/user/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
  
    const data = await res.json()
    console.log(data)

    if (res.status === 200) {
      // Handle successful login, e.g., redirect to dashboard
      console.log('Login successful:', data);

      // toast('Login successful!', {
      //   description: 'Redirecting to your dashboard...',
      // });
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to dashboard or home page
      router.push('/user');
    } else {
      // Handle login error, e.g., show error message
      console.error('Login failed:', data.error);
      toast.error(data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      
      });
    }
    setIsSigning(false);

    // Add authentication logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-6 mx-4 bg-medium-blue rounded-lg shadow-sm md:p-8 bg-opacity-90">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" className='w-32' alt="" />
        </div>
        
        <h1 className="mb-1 text-2xl font-bold text-center text-gray-900">Login</h1>
        <p className="mb-6 text-sm text-center text-gray-600">Access official government services</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              className="w-full px-3 py-3 border border-border-blue rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e) => {setUsername(e.target.value)  }}
              required
            />
          </div>
          
          <div className="mb-6">
            <input
              type="password"
              id="password"
              className="w-full px-3 py-3 border border-border-blue rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSigning ? (
            <button
            type="submit"
            className="w-full py-3 text-white cursor-pointer rounded-md hover:bg-navy-400 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-800  focus:ring-blue-600"
            style={{ backgroundColor: '#0a1744' }}
          >
            Signing...
          </button>
          ) :(
            <button
            type="submit"
            className="w-full py-3 text-white cursor-pointer bg-navy-900 rounded-md hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            style={{ backgroundColor: '#0a1744' }}
          >
            Sign in
          </button>
          )}
          
        </form>
      </div>
    </div>
  );
};

