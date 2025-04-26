"use client";
import {  useRouter } from "next/navigation";
import { useEffect } from "react";
// import { getSession, login, logout } from "@/lib";

export default function Page() {
  useEffect(() => {
    redirectToLogin();
  },[])

  const router = useRouter();

  const redirectToLogin = () => {
    
    router.push("/user/login");
  }
  // const session = await getSession();
  // const route = session ? "/dashboard" : "/login";

  
  return (
    <div></div>
  );
}
