import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
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
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('minibikes')
            .update(body)
            .eq('id', params.id)
            .select();

        if (error) {
            console.error(`Error updating bike ${params.id}:`, error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { error } = await supabaseAdmin
            .from('minibikes')
            .delete()
            .eq('id', params.id);

        if (error) {
            console.error(`Error deleting bike ${params.id}:`, error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
