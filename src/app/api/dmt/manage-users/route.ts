import { supabase } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

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

  export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const searchValue = body.searchValue || '';
      // Fetch data from the 'license_user' table

      if(!searchValue || '') {
        const { data, error } = await supabase
        .from('license_users')
        .select('username, license_number, full_name, nic_number');
  
        if (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
  
        return NextResponse.json({ users: data }, { status: 200 });
      }
      
      const { data, error } = await supabase
        .from('license_users')
        .select('username, license_number, full_name, nic_number')
        .or(`license_number.ilike.%${searchValue}%,nic_number.ilike.%${searchValue}%`);
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      return NextResponse.json({ users: data }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }