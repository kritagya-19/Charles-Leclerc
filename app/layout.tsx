import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalTopography from "@/components/GlobalTopography";

export const metadata: Metadata = {
  title: "Charles Leclerc • Portfolio",
};

// Browser zoom is intentionally left enabled (no maximumScale / userScalable).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0408",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Warm both assets so the first reveal never waits on CL2. */}
        <link rel="preload" as="image" href="/images/CL1.png" />
        <link rel="preload" as="image" href="/images/CL2.png" />
      </head>
      <body className="font-sans antialiased">
        <GlobalTopography />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

