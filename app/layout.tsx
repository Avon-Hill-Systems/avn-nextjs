import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avon Hill Systems",
  description: "AI simulations for your product decisions",
  icons: {
    icon: [
      { url: '/tempo-icon.svg', type: 'image/svg+xml' },
      { url: '/tempo-icon-192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/tempo-icon.svg',
    apple: '/tempo-icon-192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
