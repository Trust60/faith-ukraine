import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Header } from "@/layout/header/Header";
import { Footer } from "@/layout/footer/Footer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const bebasNeue = localFont({
  src: "./fonts/BebasNeueCyrillic.woff2",
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FAITH — японська професійна косметика",
  description:
    "Преміальний інтернет-магазин професійної японської косметики FAITH.",
};

export default function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uk"
      className={cn(lora.variable, bebasNeue.variable, "h-full antialiased")}
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
