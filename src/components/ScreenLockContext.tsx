"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ScreenLockContextType {
  isScreenLocked: boolean;
  setIsScreenLocked: (locked: boolean) => void;
}

const ScreenLockContext = createContext<ScreenLockContextType | undefined>(undefined);

export function ScreenLockProvider({ children }: { children: ReactNode }) {
  const [isScreenLocked, setIsScreenLocked] = useState(false);

  return (
    <ScreenLockContext.Provider value={{ isScreenLocked, setIsScreenLocked }}>
      {children}
    </ScreenLockContext.Provider>
  );
}

export function useScreenLock() {
  const context = useContext(ScreenLockContext);
  if (context === undefined) {
    throw new Error('useScreenLock must be used within a ScreenLockProvider');
  }
  return context;
} 