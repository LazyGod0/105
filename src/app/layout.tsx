import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Geist, Geist_Mono, Noto_Sans_Thai } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";

import "./globals.css";
import { AppProvider } from "@context/app-context";
import { PaletteMode } from "@type/theme";

const notoThai = Noto_Sans_Thai({ subsets: ["thai"], weight: "400" });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harmony AI",
  description: "Mental Health Counselling System",
  icons: {
    icon: "/harmony-ai-logo.png",
    shortcut: "/harmony-ai-logo.png",
    apple: "/harmony-ai-logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialMode = (cookieStore.get("color-mode")?.value as PaletteMode) || "dark";
  return (
    <html lang="en">
      {/* <head /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${notoThai.className} `}
      >
        <AppRouterCacheProvider>
          <AppProvider initialMode={initialMode}>
            <CssBaseline />
            {children} 
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
