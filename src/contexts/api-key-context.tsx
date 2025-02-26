"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

interface ApiKeyContextType {
    apiKey: string;
    setApiKey: (key: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: ReactNode }) {
    const [apiKey, setApiKey] = useState("");

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
}

export function useApiKey() {
    const context = useContext(ApiKeyContext);
    if (context === undefined) {
        throw new Error('useApiKey must be used within a ApiKeyProvider');
    }
    return context;
} 