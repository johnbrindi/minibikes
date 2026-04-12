'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  items: string[];
  addItem: (id: string) => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (id: string) => {
    setItems((prev) => [...prev, id]);
  };

  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, addItem, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}