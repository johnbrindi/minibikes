import { Star } from 'lucide-react';

export function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center justify-center gap-1 text-brand-black mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}