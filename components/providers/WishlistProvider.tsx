"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type WishlistContextType = {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  wishlistCount: number;
};

const WishlistContext =
  createContext<WishlistContextType | null>(null);

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(
      "luxentir-wishlist"
    );

    if (saved) {
    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setWishlist(
          parsed
            .map((item) => Number(item))
            .filter((item) => Number.isFinite(item))
        );
      }
    } catch {
      localStorage.removeItem("luxentir-wishlist");
    }
  }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "luxentir-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = (id: number) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev;

      return [...prev, id];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.filter((item) => item !== id)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}