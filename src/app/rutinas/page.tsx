import { Suspense } from "react";
import type { Metadata } from "next";
import { filterRutinas } from "@/lib/rutinas";
import RutinaGrid from "@/components/rutina/RutinaGrid";
import RutinaFiltros from "@/components/rutina/RutinaFiltros";

export const metadata: Metadata = {
  title: "Rutinas de Entrenamiento | Queto-Fit",
  description:
    "Rutinas de entrenamiento armadas por un Licenciado en Educación Física. Encontrá la rutina ideal para tu objetivo y nivel.",
};

interface PageProps {
  searchParams: Promise<{ objetivo?: string; nivel?: string }>;
}

export default async function RutinasPage({ searchParams }: PageProps) {
  const { objetivo, nivel } = await searchParams;
  const rutinas = filterRutinas({ objetivo, nivel });

  const titulo =
    objetivo || nivel
      ? `${rutinas.length} rutina${rutinas.length !== 1 ? "s" : ""} encontrada${rutinas.length !== 1 ? "s" : ""}`
      : "Todas las rutinas";

  return (
    <main className="min-h-screen bg-[#0A1628]">
      {/* Hero */}
      <section className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-[#16A34A] text-sm font-semibold uppercase tracking-wider mb-2">
            Entrenamiento
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Rutinas de Entrenamiento
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Rutinas diseñadas y curadas por un Licenciado en Educación Física.
            Filtrá por objetivo y nivel para encontrar la que mejor se adapta a vos.
          </p>
        </div>

        {/* Filtros */}
        <Suspense fallback={null}>
          <RutinaFiltros />
        </Suspense>
      </section>

      {/* Catálogo */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <p className="text-slate-400 text-sm mb-6">{titulo}</p>
        <RutinaGrid rutinas={rutinas} />
      </section>
    </main>
  );
}
