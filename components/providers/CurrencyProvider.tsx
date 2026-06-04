"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Currency = "PKR" | "USD";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const PKR_RATE = 278;

export default function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<Currency>("PKR");

  useEffect(() => {
    const saved = localStorage.getItem("luxentir-currency") as Currency | null;

    if (saved === "PKR" || saved === "USD") {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (value: Currency) => {
    setCurrencyState(value);
    localStorage.setItem("luxentir-currency", value);
  };

  const formatPrice = (price: number) => {
    if (currency === "PKR") {
      return `PKR ${(price * PKR_RATE).toLocaleString()}`;
    }

    return `$${price.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
}