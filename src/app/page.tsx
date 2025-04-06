"use client";
import {  useRouter } from "next/navigation";
// import { getSession, login, logout } from "@/lib";

export default async function Page() {
  // const session = await getSession();
  // const route = session ? "/dashboard" : "/login";
  const router = useRouter();
  router.push("/user/login");
  
  return (
    <div></div>
    // <section>
    //   <form
    //     action={async (formData) => {
    //       "use server";
    //       await login(formData);
    //       redirect("/dashboard");
    //     }}
    //   >
    //     <input name="email" type="email" placeholder="Email" />
    //     <br />
    //     <button type="submit">Login</button>
    //   </form>
    //   <form
    //     action={async () => {
    //       "use server";
    //       await logout();
    //       redirect("/");
    //     }}
    //   >
    //     <button type="submit">Logout</button>
    //   </form>
    //   <pre>{JSON.stringify(session, null, 2)}</pre>
    // </section>
  );
}
