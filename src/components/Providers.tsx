"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ScreenLockProvider } from "./ScreenLockContext";
import LoadingScreen from "./LoadingScreen";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 giây loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen 
        onLoadingComplete={() => setIsLoading(false)}
        minLoadingTime={1000}
      />
    );
  }

  return (
    <ThemeProvider>
      <ScreenLockProvider>
        {children}
      </ScreenLockProvider>
    </ThemeProvider>
  );
} 