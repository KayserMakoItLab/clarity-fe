"use client";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { DashboardLayout } from "@/layout";
import { usePathname } from "next/navigation";
import { AuthProvider, ProtectedLayout } from "@/lib";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetching on window focus globally
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <ChakraProvider>
              {!pathname.includes("login") ? (
                <ProtectedLayout>
                  <DashboardLayout>{children}</DashboardLayout>
                </ProtectedLayout>
              ) : (
                <>{children}</>
              )}
            </ChakraProvider>
          </QueryClientProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
