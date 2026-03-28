import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock, Target, TrendingUp, ChevronRight, MessageCircle, Star } from "lucide-react";
import { getRutinaBySlug } from "@/lib/rutinas";
import { getProductBySlug } from "@/lib/products";
import { OBJETIVO_LABELS, NIVEL_LABELS } from "@/types";
import RutinaDias from "@/components/rutina/RutinaDias";
import RutinaDisclaimer from "@/components/rutina/RutinaDisclaimer";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Tu rutina personalizada | Queto-Fit",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ para?: string; r?: string }>;
}

const NIVEL_COLORS: Record<string, string> = {
  principiante: "bg-emerald-900/40 text-emerald-400 border-emerald-800",
  intermedio: "bg-blue-900/40 text-blue-400 border-blue-800",
  avanzado: "bg-orange-900/40 text-orange-400 border-orange-800",
};

const OBJETIVO_ICONS: Record<string, string> = {
  hipertrofia: "💪",
  definicion: "🔥",
  fuerza: "⚡",
  resistencia: "🏃",
  principiante: "🌱",
};

export default async function RutinaPersonalizadaPage({ searchParams }: PageProps) {
  const { para, r } = await searchParams;

  if (!para || !r) notFound();

  const rutina = getRutinaBySlug(r);
  if (!rutina) notFound();

  const nombre = para;

  const suplementos = rutina.suplementosRecomendados
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappMsg = encodeURIComponent(
    `Hola! Soy ${nombre}, ya tengo mi rutina "${rutina.name}" y quiero consultar sobre suplementos para acompañarla.`
  );
  const whatsappURL = `https://wa.me/${whatsappNum}?text=${whatsappMsg}`;

  return (
    <main className="min-h-screen bg-[#0A1628]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-300 transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/rutinas" className="hover:text-slate-300 transition-colors">Rutinas</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-300">Rutina personalizada</span>
        </nav>

        {/* Banner personalizado */}
        <div className="bg-gradient-to-r from-[#16A34A]/20 to-[#15803D]/10 border border-[#16A34A]/30 rounded-2xl px-5 py-4 flex items-center gap-3 mb-8">
          <Star className="w-5 h-5 text-[#4ADE80] shrink-0" />
          <div>
            <p className="text-[#4ADE80] font-bold text-sm">Rutina personalizada para</p>
            <p className="text-white font-bold text-lg leading-tight">{nombre}</p>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{OBJETIVO_ICONS[rutina.objetivo]}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                {rutina.name}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                {rutina.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-[#0F172A] rounded-xl px-4 py-3 border border-slate-800 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#16A34A] shrink-0" />
              <div>
                <p className="text-xs text-slate-500">Días/semana</p>
                <p className="text-white font-bold">{rutina.diasPorSemana}</p>
              </div>
            </div>
            <div className="bg-[#0F172A] rounded-xl px-4 py-3 border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#16A34A] shrink-0" />
              <div>
                <p className="text-xs text-slate-500">Por sesión</p>
                <p className="text-white font-bold">{rutina.duracionMinutos} min</p>
              </div>
            </div>
            <div className="bg-[#0F172A] rounded-xl px-4 py-3 border border-slate-800 flex items-center gap-3">
              <Target className="w-5 h-5 text-[#16A34A] shrink-0" />
              <div>
                <p className="text-xs text-slate-500">Objetivo</p>
                <p className="text-white font-bold">{OBJETIVO_LABELS[rutina.objetivo]}</p>
              </div>
            </div>
            <div className={`rounded-xl px-4 py-3 border flex items-center gap-3 ${NIVEL_COLORS[rutina.nivel]}`}>
              <TrendingUp className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-xs opacity-70">Nivel</p>
                <p className="font-bold">{NIVEL_LABELS[rutina.nivel]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Todos los días — sin blur */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">
            Días de entrenamiento
          </h2>
          <RutinaDias dias={rutina.dias} />
        </section>

        {/* Suplementos recomendados */}
        {suplementos.length > 0 && (
          <section className="mb-12">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">
                Suplementos recomendados para esta rutina
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Selección basada en el objetivo y la demanda energética de esta rutina.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {suplementos.map((product) =>
                product ? <ProductCard key={product.id} product={product} /> : null
              )}
            </div>
          </section>
        )}

        {/* WhatsApp CTA */}
        <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-2xl p-6 sm:p-8 text-center mb-8">
          <h3 className="text-white font-bold text-xl mb-2">
            ¿Querés sumarle suplementos a tu rutina?
          </h3>
          <p className="text-green-100 text-sm mb-5">
            Consultá y te armamos un plan de suplementación personalizado para tu objetivo.
          </p>
          <a
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#16A34A] font-bold px-6 py-3 rounded-full hover:bg-green-50 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar por WhatsApp
          </a>
        </div>

        {/* Disclaimer */}
        <RutinaDisclaimer />

      </div>
    </main>
  );
}
