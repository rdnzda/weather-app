import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display-cond",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App",
  description: "A weather application built with Next.js",
};

export const viewport = {
  themeColor: "#0d151d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} min-h-[100dvh] bg-ink text-fg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
