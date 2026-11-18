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
    type: "website",
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
