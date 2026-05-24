import { Bike } from './types';

// Fetch all bikes
export async function getBikes(): Promise<Bike[]> {
  try {
    const res = await fetch('/api/bikes', { next: { revalidate: 0 } }); // Ensure no stale cache
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
    if (!res.ok) throw new Error('Failed to fetch bike');
    const data = await res.json();
    return data as Bike;
  } catch (error) {
    console.error(`Error fetching bike ${id}:`, error);
    return null;
  }
}

// Admin: Upsert Bike (Create / Update)
export async function upsertBike(bike: Partial<Bike>) {
  const method = bike.id ? 'POST' : 'POST'; // We use POST for both right now
  const res = await fetch('/api/bikes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bike),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Failed to upsert bike');
  }

  return await res.json();
}

// Admin: Delete Bike
export async function deleteBike(id: string) {
  const res = await fetch(`/api/bikes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Failed to delete bike');
  }
}
