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

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { data, error } = await supabaseAdmin
        .from('minibikes')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error) {
        console.error(`Error fetching bike ${params.id}:`, error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const { data, error } = await supabaseAdmin
            .from('minibikes')
            .update(body)
            .eq('id', params.id)
            .select();

        if (error) {
            console.error(`Error updating bike ${params.id}:`, error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data?.[0]);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { error } = await supabaseAdmin
        .from('minibikes')
        .delete()
        .eq('id', params.id);

    if (error) {
        console.error(`Error deleting bike ${params.id}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
