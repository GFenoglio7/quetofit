import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock, Target, TrendingUp, ChevronRight, MessageCircle, Lock } from "lucide-react";
import { getRutinaBySlug, getAllSlugsRutinas } from "@/lib/rutinas";
import { getProductBySlug } from "@/lib/products";
import { OBJETIVO_LABELS, NIVEL_LABELS } from "@/types";
import RutinaDias from "@/components/rutina/RutinaDias";
import RutinaDisclaimer from "@/components/rutina/RutinaDisclaimer";
import ProductCard from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugsRutinas().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const rutina = getRutinaBySlug(slug);
  if (!rutina) return {};
  return {
    title: `${rutina.name} | Queto-Fit`,
    description: rutina.shortDescription,
  };
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

const PRECIO_RUTINA = 15000;

export default async function RutinaDetallePage({ params }: PageProps) {
  const { slug } = await params;
  const rutina = getRutinaBySlug(slug);

  if (!rutina) notFound();

  const suplementos = rutina.suplementosRecomendados
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappComprarMsg = encodeURIComponent(
    `Hola! Quiero comprar la rutina "${rutina.name}" por ${formatPrice(PRECIO_RUTINA)}. ¿Cómo puedo pagar?`
  );
  const whatsappComprarURL = `https://wa.me/${whatsappNum}?text=${whatsappComprarMsg}`;

  const whatsappSuplementosMsg = encodeURIComponent(
    `Hola! Ya tengo la rutina "${rutina.name}" y quiero armarla con suplementos. ¿Me podés asesorar?`
  );
  const whatsappSuplementosURL = `https://wa.me/${whatsappNum}?text=${whatsappSuplementosMsg}`;

  const diaGratis = rutina.dias[0];
  const diasBloqueados = rutina.dias.slice(1);

  return (
    <main className="min-h-screen bg-[#0A1628]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/rutinas" className="hover:text-slate-300 transition-colors">Rutinas</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-300 line-clamp-1">{rutina.name}</span>
        </nav>

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

        {/* Días de entrenamiento */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-1">
            Días de entrenamiento
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            Vista previa — Día 1 disponible gratis
          </p>

          {/* Día 1 — gratis */}
          <RutinaDias dias={[diaGratis]} />

          {/* Días bloqueados */}
          {diasBloqueados.length > 0 && (
            <div className="relative mt-3">
              {/* Contenido borroso */}
              <div
                className="blur-sm select-none pointer-events-none opacity-50"
                aria-hidden="true"
              >
                <RutinaDias dias={diasBloqueados} />
              </div>

              {/* Overlay de compra */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#0F172A]/95 border border-slate-700 rounded-2xl p-6 sm:p-8 text-center shadow-2xl max-w-sm mx-4">
                  <div className="w-12 h-12 bg-[#16A34A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-[#16A34A]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Contenido bloqueado
                  </h3>
                  <p className="text-slate-400 text-sm mb-1">
                    Los {diasBloqueados.length} días restantes están disponibles al comprar la rutina completa.
                  </p>
                  <p className="text-[#4ADE80] font-bold text-2xl mb-5">
                    {formatPrice(PRECIO_RUTINA)}
                  </p>
                  <a
                    href={whatsappComprarURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-6 py-3 rounded-full transition-colors w-full justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Comprar por WhatsApp
                  </a>
                  <p className="text-slate-600 text-xs mt-3">
                    Recibís la rutina completa en PDF
                  </p>
                </div>
              </div>
            </div>
          )}
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

        {/* WhatsApp CTA suplementos */}
        <div className="bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-2xl p-6 sm:p-8 text-center mb-8">
          <h3 className="text-white font-bold text-xl mb-2">
            ¿Ya tenés la rutina y querés sumarle suplementos?
          </h3>
          <p className="text-green-100 text-sm mb-5">
            Te armamos un plan de suplementación personalizado para tu objetivo.
          </p>
          <a
            href={whatsappSuplementosURL}
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
