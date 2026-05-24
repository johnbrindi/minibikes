import { supabase } from './supabase';
import { Bike } from './types';

// Fetch all bikes
export async function getBikes(): Promise<Bike[]> {
  try {
    const res = await fetch('/api/bikes');
    if (!res.ok) throw new Error('Failed to fetch bikes');
    const data = await res.json();
    return data as Bike[];
  } catch (error) {
    console.error('Error fetching bikes:', error);
    return [];
  }
}

// Fetch single bike
export async function getBikeById(id: string): Promise<Bike | null> {
  try {
    const res = await fetch(`/api/bikes/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch bike ${id}`);
    const data = await res.json();
    return data as Bike;
  } catch (error) {
    console.error(`Error fetching bike ${id}:`, error);
    return null;
  }
}

// Admin: Upsert Bike (Create / Update)
export async function upsertBike(bike: Partial<Bike>) {
  try {
    // If the bike has an id and we are updating, we should theoretically use PUT /api/bikes/[id] 
    // but the POST /api/bikes uses upsert so it handles both create and update.
    const res = await fetch('/api/bikes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bike)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to check bike');
    }
    return await res.json();
  } catch (error) {
    console.error('Error upserting bike:', error);
    throw error;
  }
}

// Admin: Delete Bike
export async function deleteBike(id: string) {
  try {
    const res = await fetch(`/api/bikes/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete bike');
    }
  } catch (error) {
    console.error('Error deleting bike:', error);
    throw error;
  }
}
