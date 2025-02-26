// src/contexts/api-key-context.tsx
"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

type ApiKeyContextType = {
  apiKeys: string[];
  addApiKey: (key: string) => void;
  removeApiKey: (key: string) => void;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const [apiKeys, setApiKeys] = useState<string[]>([]);

  const addApiKey = (key: string) => {
    setApiKeys((prev) => [...prev, key]);
  };

  const removeApiKey = (key: string) => {
    setApiKeys((prev) => prev.filter((k) => k !== key));
  };

  return (
    <ApiKeyContext.Provider value={{ apiKeys, addApiKey, removeApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
};
