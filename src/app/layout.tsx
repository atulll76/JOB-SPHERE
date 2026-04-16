import type { Metadata } from "next";
import { Fraunces, DM_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap" 
});

const dmMono = DM_Mono({ 
  weight: ["400", "500"], 
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap"
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "JobSphere — Find Work That Moves You",
  description: "JobSphere job portal full stack application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${dmMono.variable} ${plusJakartaSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
