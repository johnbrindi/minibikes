import { Check } from 'lucide-react';

export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-lg shadow-xl font-montserrat flex items-center gap-3 animate-in slide-in-from-bottom-5">
      <Check size={20} className="text-brand-gold" />
      <span className="font-semibold">{message}</span>
    </div>
  );
}