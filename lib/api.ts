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
  const { data, error } = await supabase
    .from('minibikes')
    .upsert(bike)
    .select();

  if (error) throw error;
  return data;
}

// Admin: Delete Bike
export async function deleteBike(id: string) {
  const { error } = await supabase
    .from('minibikes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
