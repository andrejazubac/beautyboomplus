import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beautyboomplus.rs"),
  title: "Beauty Boom Plus | Premium Beauty Studio Novi Sad",
  description:
    "Beauty Boom Plus is a feminine, luxury beauty salon in Novi Sad led by Tijana Marković.",
  openGraph: {
    title: "Beauty Boom Plus",
    description: "Premium feminine beauty studio in Novi Sad, Serbia.",
    images: ["/beauty-boom-campaign.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
