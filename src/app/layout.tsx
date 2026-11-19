import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orteam | Collaboration OS",
  description:
    "The smart workspace for your team — open-source kanban, visual canvas, and live roadmaps. Coba workspace demo tanpa daftar.",
  metadataBase: new URL("https://orteam.pages.dev"),
  openGraph: {
    title: "Orteam | Collaboration OS",
    description:
      "The smart workspace for your team — open-source kanban, visual canvas, and live roadmaps.",
    url: "https://orteam.pages.dev",
    type: "website",
    images: [
      {
        url: "https://orteam.pages.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orteam — the smart workspace for your team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orteam | Collaboration OS",
    description:
      "The smart workspace for your team — open-source kanban, visual canvas, and live roadmaps.",
    images: ["https://orteam.pages.dev/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
