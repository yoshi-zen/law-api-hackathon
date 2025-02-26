// src/contexts/api-key-context.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ApiKeyEntry = {
  key: string;
  model: string;
};

type ApiKeyContextType = {
  apiKeys: ApiKeyEntry[];
  addApiKey: (entry: ApiKeyEntry) => void;
  removeApiKey: (key: string) => void;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKeys, setApiKeys] = useState<ApiKeyEntry[]>([]);

  const addApiKey = (entry: ApiKeyEntry) => {
    setApiKeys((prev) => [...prev, entry]);
  };

  const removeApiKey = (key: string) => {
    setApiKeys((prev) => prev.filter((entry) => entry.key !== key));
  };

  return (
    <ApiKeyContext.Provider value={{ apiKeys, addApiKey, removeApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};
