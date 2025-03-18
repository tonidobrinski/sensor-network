"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import AuthProvider from "./context/AuthContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>
        <html lang="en">
          <body>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </html>
      </ThemeProviderWrapper>
    </QueryClientProvider>
  );
}
