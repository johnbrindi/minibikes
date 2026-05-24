import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

export async function GET() {
    const { data, error } = await supabaseAdmin
        .from('minibikes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bikes:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, error } = await supabaseAdmin
            .from('minibikes')
            .upsert(body)
            .select();

        if (error) {
            console.error('Error upserting bike:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data?.[0]);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
