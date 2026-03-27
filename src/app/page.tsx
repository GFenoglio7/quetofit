import { getFeaturedProducts } from "@/lib/products";
import HeroSection from "@/components/home/HeroSection";
import BenefitsBar from "@/components/home/BenefitsBar";
import CategorySection from "@/components/home/CategorySection";
import ProductGrid from "@/components/product/ProductGrid";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <BenefitsBar />
      <CategorySection />

      {/* Featured Products */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Productos destacados
              </h2>
              <p className="text-slate-400">Los favoritos de nuestros clientes</p>
            </div>
            <Link
              href="/productos"
              className="hidden sm:flex items-center gap-1.5 text-[#16A34A] hover:text-green-400 text-sm font-semibold transition-colors"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={featured} />

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Ver todos los productos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Banner */}
      <section className="py-16 bg-gradient-to-br from-[#16A34A] to-[#15803D]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Escribinos por WhatsApp y te asesoramos para encontrar el suplemento ideal para tus objetivos.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5491112345678"}?text=${encodeURIComponent("Hola! Quisiera asesoramiento para elegir mis suplementos.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#16A34A] font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            Hablar con un asesor
          </a>
        </div>
      </section>
    </>
  );
}
