import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const humane = localFont({
  src: './fonts/Humane-VF.ttf',
  variable: '--font-humane',
});

const manuscribe = localFont({
  src: [
    {
      path: './fonts/ManuscribeFree-Regular.otf',
      style: 'normal',
    },
    {
      path: './fonts/ManuscribeFree-Italic.otf',
      style: 'italic',
    },
  ],
  variable: '--font-manuscribe',
});

const glusp = localFont({
  src: './fonts/OTF® Glusp.ttf',
  variable: '--font-glusp',
});

const emberly = localFont({
  src: './fonts/CYR_CT_OP_Emberly Regular [wdth,wght]-VF.ttf',
  variable: '--font-emberly',
});

export const metadata: Metadata = {
  title: "Tytan Codes | Interactive Digital Experiences",
  description: "Explore unique interactive digital experiences crafted by Tytan Codes. Immerse yourself in creative web experiences that blend technology and artistry.",
  keywords: "interactive experiences, digital art, web development, creative coding, portfolio, tytan codes, web design, digital experiences, creative technology",
  authors: [{ name: "Tytan Codes" }],
  creator: "Tytan Codes",
  publisher: "Tytan Codes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tytan.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Tytan Codes | Interactive Digital Experiences",
    description: "Explore unique interactive digital experiences crafted by Tytan Codes. Immerse yourself in creative web experiences that blend technology and artistry.",
    type: "website",
    locale: "en_US",
    siteName: "Tytan Codes",
    url: "https://tytan.dev"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tytan Codes | Interactive Digital Experiences",
    description: "Explore unique interactive digital experiences crafted by Tytan Codes. Immerse yourself in creative web experiences that blend technology and artistry."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#18181B",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  category: "technology",
  classification: "business",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${humane.variable} ${manuscribe.variable} ${glusp.variable} ${emberly.variable} antialiased cursor-none`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
