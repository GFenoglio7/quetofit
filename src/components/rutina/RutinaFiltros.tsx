"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const OBJETIVOS = [
  { value: "", label: "Todos" },
  { value: "hipertrofia", label: "💪 Hipertrofia" },
  { value: "fuerza", label: "⚡ Fuerza" },
  { value: "definicion", label: "🔥 Definición" },
  { value: "resistencia", label: "🏃 Resistencia" },
  { value: "principiante", label: "🌱 Principiantes" },
];

const NIVELES = [
  { value: "", label: "Todos los niveles" },
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
];

export default function RutinaFiltros() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const objetivoActivo = searchParams.get("objetivo") ?? "";
  const nivelActivo = searchParams.get("nivel") ?? "";

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      {/* Objetivo */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Objetivo
        </p>
        <div className="flex flex-wrap gap-2">
          {OBJETIVOS.map((o) => (
            <button
              key={o.value}
              onClick={() => setParam("objetivo", o.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                objetivoActivo === o.value
                  ? "bg-[#16A34A] text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nivel */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Nivel
        </p>
        <div className="flex flex-wrap gap-2">
          {NIVELES.map((n) => (
            <button
              key={n.value}
              onClick={() => setParam("nivel", n.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                nivelActivo === n.value
                  ? "bg-[#16A34A] text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
