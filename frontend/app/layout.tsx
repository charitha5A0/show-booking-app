import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Showtime | Book your seats",
  description: "Browse upcoming shows and reserve your seats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
