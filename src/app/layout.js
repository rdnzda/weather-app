import { Inter, My_Soul } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mySoul = My_Soul({
  variable: "--font-my_soul",
  weight: '400',
  subsets: ['latin']
})


export const metadata = {
  title: "Weather App",
  description: "A weather application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mySoul.variable} min-h-[calc(100vh-XXpx)] backdrop-blur-sm`}>
        {children}
      </body>
    </html>
  );
}
