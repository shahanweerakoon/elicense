import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase URL or Service Key is not defined in environment variables.");
}
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + 15 * 60)
    .sign(key);

    
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user

  const user = { id: 231 ,email: formData.get("email"), name: "John"};

  // Create the session
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const session = await encrypt({ user, expires });

  // Save the session in a cookie

  (await cookies()).set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

// User Login Functions

export async function userLogin(username:string, password:string) {
  // Verify credentials && get the user
  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('license_users')
    .select('*')
    .eq('username', username)
    .single()
  console.log(data);
  if (error || !data) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }
  if (password !== data.password_hashed) {
    console.log("current:",password,"  need pass:",data.password_hashed)
    // Password is incorrect
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  
  const user = { id: data.id ,username: username, type:"user", name: data.full_name};

  // Create the session
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const session = await encrypt({ user, expires });

  // Save the session in a cookie

  (await cookies()).set("session-user", session, { expires, httpOnly: true });
  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}

export async function userLogout() {
  // Destroy the session
  (await cookies()).set("session-user", "", { expires: new Date(0) });
}

export async function userGetSession() {
  const session = (await cookies()).get("session-user")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function userUpdateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

// Officer Login Functions

export async function officerLogin(username:string, password:string) {
  // Verify credentials && get the user
  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('officer')
    .select('*')
    .eq('username', username)
    .single()
  console.log(data);
  if (error || !data) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }
  if (password !== data.password) {
    console.log("current:",password,"  need pass:",data.password_hashed)
    // Password is incorrect
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  
  const user = { id: data.id ,username: username, type:"officer"};

  // Create the session
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
  const session = await encrypt({ user, expires });

  // Save the session in a cookie

  (await cookies()).set("session-officer", session, { expires, httpOnly: true });
  return NextResponse.json({ message: 'Login successful' }, { status: 200 })
}

export async function officerLogout() {
  // Destroy the session
  (await cookies()).set("session-officer", "", { expires: new Date(0) });
}

export async function officerGetSession() {
  const session = (await cookies()).get("session-officer")?.value;
  if (!session) return null;
  return await decrypt(session);
}



export async function officerrUpdateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
