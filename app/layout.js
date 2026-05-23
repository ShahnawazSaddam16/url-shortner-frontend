import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Linkly - Smart URL Shortener",
    template: "%s | Linkly",
  },
  description:
    "Linkly is a fast, secure and modern URL shortener with analytics, QR codes, password protection, and custom links.",
  keywords: [
    "URL shortener",
    "link shortener",
    "QR code generator",
    "link analytics",
    "custom short links",
    "secure links",
    "linkly",
  ],
  authors: [{ name: "Shahnawaz Saddam Butt" }],
  creator: "Shahnawaz Saddam Butt",
  publisher: "Linkly",

  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "Linkly - Smart URL Shortener",
    description:
      "Create short links with analytics, QR codes, expiry dates and password protection.",
    url: "https://your-domain.com",
    siteName: "Linkly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Linkly Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Linkly - Smart URL Shortener",
    description:
      "Shorten links with analytics, QR codes, and security features.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}