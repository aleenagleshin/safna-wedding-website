import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Great_Vibes, Playfair_Display, Lato } from 'next/font/google';

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });
const playfair = Playfair_Display({ weight: ['400', '600', '700'], subsets: ['latin'] });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'] });


export const metadata: Metadata = {
  title: "Safna & Shanib – Wedding Invitation 💍",
  description: "With the blessings of Allah, we invite you to our Nikah on 6 December 2025.",

  openGraph: {
    title: "Safna & Shanib – Wedding Invitation",
    description: "Join us on 6 December 2025 for our special day.",
    url: "https://safna-wedding-website.vercel.app/",          // ← replace with your domain
    siteName: "Safna & Shanib Wedding",
    images: [
      {
        url: "https://safna-wedding-website.vercel.app/preview.jpg",                // ← the image in public folder
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Safna & Shanib – Wedding Invitation 💍",
    description: "Join us on 6 December 2025 for our Nikah ceremony.",
    images: ["/preview.jpg"],
  },


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes} ${playfair} ${lato} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
