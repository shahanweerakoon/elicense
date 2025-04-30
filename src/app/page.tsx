"use client";
import {  useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import { getSession, login, logout } from "@/lib";

export default function Page() {
  useEffect(() => {
    redirectToLogin();
  },[])

  const router = useRouter();

  const redirectToLogin = () => {
    
    router.push("/user/login");
  }
  
  return (
    <div>
      <ToastContainer/>
    </div>
  );
}
