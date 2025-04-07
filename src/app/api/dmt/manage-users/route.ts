import { supabase } from '@/lib';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      // Fetch data from the 'license_user' table
      const { data, error } = await supabase
        .from('license_users')
        .select('username, license_number, full_name, nic_number');
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      return NextResponse.json({ users: data }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }