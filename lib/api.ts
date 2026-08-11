import { supabase } from './supabase';
import { Bike } from './types';

// Fetch all bikes
export async function getBikes(): Promise<Bike[]> {
  const { data, error } = await supabase
    .from('minibikes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bikes:', error);
    return [];
  }
  return data as Bike[];
}

// Fetch single bike
export async function getBikeById(id: string): Promise<Bike | null> {
  const { data, error } = await supabase
    .from('minibikes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching bike ${id}:`, error);
    return null;
  }
  return data as Bike;
}

// Admin: Upsert Bike (Create / Update)
export async function upsertBike(bike: Partial<Bike>) {
  const response = await fetch('/api/bikes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bike),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to save bike');
  }

  return response.json();
}

// Admin: Delete Bike
export async function deleteBike(id: string) {
  const response = await fetch(`/api/bikes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to delete bike');
  }
}
