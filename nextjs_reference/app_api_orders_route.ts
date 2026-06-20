/**
 * NEXT.JS API ROUTE HANDLER REFERENCE FILE
 * Path in your Next.js project: `app/api/orders/route.ts`
 * 
 * Demonstrates standard Next.js App Router Route Handler to fetch all orders
 * from the Supabase database using the @supabase/supabase-js library.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Lazily initialize Supabase Client with environment variables.
// Crucial: This ensures secure loading and avoids module initialisation failure when variables are not configured.
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Using Service Role Key to bypass RLS in administrative queries (or use anon key)

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credential environment variables (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are missing.');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false // For server route handlers, do not persist session state
    }
  });
};

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    // Query orders from Supabase DB, ordered by descending creation time
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // Standard error handling for Supabase API response failures
    if (error) {
      console.error('Supabase DB error occurred:', error.message);
      return NextResponse.json(
        { error: 'Failed to retrieve orders from database.', details: error.message },
        { status: 500 }
      );
    }

    // Success response returning JSON payload
    return NextResponse.json(
      { 
        success: true, 
        count: orders?.length || 0,
        orders: orders || [] 
      },
      { status: 200 }
    );

  } catch (error: any) {
    // Internal server error fallback capture
    console.error('Internal API Route Exception:', error);
    return NextResponse.json(
      { 
        error: 'An internal server error occurred while retrieving orders.', 
        message: error?.message || 'Unknown Error'
      },
      { status: 500 }
    );
  }
}
