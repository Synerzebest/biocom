import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalNest",
  description: "Trouvez des magasins à proximité de chez vous qui vendent des produits locaux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} w-screen overflow-x-hidden`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
