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
    }, 3000); // 3 giây loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen 
        onLoadingComplete={() => setIsLoading(false)}
        minLoadingTime={2000}
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