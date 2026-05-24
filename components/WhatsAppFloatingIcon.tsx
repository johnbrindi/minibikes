'use client';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloatingIcon() {
    return (
        <a
            href="https://wa.me/14424166435"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20b958] transition-all hover:scale-110 flex items-center justify-center animate-bounce"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} />
        </a>
    );
}
