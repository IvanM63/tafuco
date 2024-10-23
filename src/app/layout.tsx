import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  //👇 Add variable to our object
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tafuco",
  description: "Get your dream furniture here",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.variable} font-inter antialiased `}>
          {children}
          {modal}
        </body>
      </html>
    </Providers>
  );
}
