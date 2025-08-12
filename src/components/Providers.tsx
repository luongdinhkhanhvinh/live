"use client";

import { ThemeProvider } from "./ThemeProvider";
import { ScreenLockProvider } from "./ScreenLockContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ScreenLockProvider>
        {children}
      </ScreenLockProvider>
    </ThemeProvider>
  );
} 