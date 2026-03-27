import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Queto-Fit | Suplementos y Bienestar",
  description:
    "Suplementos deportivos y productos de bienestar de alta calidad. Proteínas, creatina, colágeno, pre-entrenos y más. Consultá por WhatsApp.",
  keywords: ["suplementos", "proteina whey", "creatina", "colageno", "pre-entreno", "bienestar", "queto-fit"],
  openGraph: {
    title: "Queto-Fit | Suplementos y Bienestar",
    description: "Suplementos deportivos y productos de bienestar. Consultá por WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0A1628] text-white">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
