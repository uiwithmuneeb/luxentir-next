"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (
    id: number,
    size: string,
    color: string,
    image: string
  ) => void;
  removeFromCart: (
    id: number,
    size: string,
    color: string,
    image: string
  ) => void;
  clearCart: () => void;
  cartCount: number;
};



const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("luxentir-cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("luxentir-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    id: number,
    size: string,
    color: string,
    image: string
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === id &&
          item.size === size &&
          item.color === color &&
          item.image === image
      );

      if (existing) {
        return prev.map((item) =>
          item.id === id &&
          item.size === size &&
          item.color === color &&
          item.image === image
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id,
          quantity: 1,
          size,
          color,
          image,
        },
      ];
    });
  };

  const removeFromCart = (
      id: number,
      size: string,
      color: string,
      image: string
    ) => {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(
              item.id === id &&
              item.size === size &&
              item.color === color &&
              item.image === image
            )
        )
      );
    };

    const clearCart = () => {
      setCart([]);
    };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartCount,
    }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be inside CartProvider");
  }

  return context;
}