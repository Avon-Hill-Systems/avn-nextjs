import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tostendout",
  description: "Work at a startup this summer",
  icons: {
    icon: [
      { url: '/tempo-icon.svg', type: 'image/svg+xml' },
      { url: '/tempo-icon-192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/tempo-icon.svg',
    apple: '/tempo-icon-192.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
