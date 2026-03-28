import Link from "next/link";
import { Calendar, Clock, Target, TrendingUp } from "lucide-react";
import type { Rutina } from "@/types";
import { OBJETIVO_LABELS, NIVEL_LABELS } from "@/types";

const NIVEL_COLORS: Record<string, string> = {
  principiante: "bg-emerald-100 text-emerald-700",
  intermedio: "bg-blue-100 text-blue-700",
  avanzado: "bg-orange-100 text-orange-700",
};

const OBJETIVO_ICONS: Record<string, string> = {
  hipertrofia: "💪",
  definicion: "🔥",
  fuerza: "⚡",
  resistencia: "🏃",
  principiante: "🌱",
};

const BADGE_STYLES: Record<string, string> = {
  recomendado: "bg-[#16A34A] text-white",
  popular: "bg-amber-500 text-white",
  nuevo: "bg-blue-500 text-white",
};

const BADGE_LABELS: Record<string, string> = {
  recomendado: "Recomendado",
  popular: "Popular",
  nuevo: "Nuevo",
};

interface Props {
  rutina: Rutina;
}

export default function RutinaCard({ rutina }: Props) {
  return (
    <Link href={`/rutinas/${rutina.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
        {/* Header con color por objetivo */}
        <div className="relative bg-gradient-to-br from-[#0F172A] to-[#1E293B] px-5 pt-5 pb-8">
          {rutina.badge && (
            <span
              className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[rutina.badge]}`}
            >
              {BADGE_LABELS[rutina.badge]}
            </span>
          )}
          <div className="text-4xl mb-2">{OBJETIVO_ICONS[rutina.objetivo]}</div>
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#4ADE80] transition-colors">
            {rutina.name}
          </h3>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-px bg-slate-100 border-y border-slate-100">
          <div className="bg-white px-4 py-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span className="text-xs text-slate-600">
              <span className="font-bold text-slate-800">{rutina.diasPorSemana}</span> días/sem
            </span>
          </div>
          <div className="bg-white px-4 py-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span className="text-xs text-slate-600">
              <span className="font-bold text-slate-800">{rutina.duracionMinutos}</span> min/ses
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
              <Target className="w-3 h-3" />
              {OBJETIVO_LABELS[rutina.objetivo]}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${NIVEL_COLORS[rutina.nivel]}`}
            >
              <TrendingUp className="w-3 h-3" />
              {NIVEL_LABELS[rutina.nivel]}
            </span>
          </div>

          <p className="text-slate-500 text-sm line-clamp-2 flex-1">
            {rutina.shortDescription}
          </p>

          <span className="text-[#16A34A] text-sm font-semibold group-hover:underline mt-auto">
            Ver rutina →
          </span>
        </div>
      </div>
    </Link>
  );
}
