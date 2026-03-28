"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { getAllRutinas } from "@/lib/rutinas";

// Esto se ejecuta server-side, pero el componente es client.
// Importamos los datos directamente.
import rutinasData from "@/data/rutinas.json";

const rutinas = rutinasData as Array<{ id: string; slug: string; name: string }>;

export default function GenerarLinkPage() {
  const [nombre, setNombre] = useState("");
  const [slugRutina, setSlugRutina] = useState(rutinas[0]?.slug ?? "");
  const [copiado, setCopiado] = useState(false);

  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://tu-dominio.vercel.app";

  const url =
    nombre && slugRutina
      ? `${base}/rutinas/para?para=${encodeURIComponent(nombre)}&r=${slugRutina}`
      : "";

  function copiar() {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8">

          <div className="mb-6">
            <h1 className="text-white font-bold text-2xl mb-1">Generar link de rutina</h1>
            <p className="text-slate-400 text-sm">
              Completá los datos y copiá el link para enviarle al cliente.
            </p>
          </div>

          <div className="space-y-4">
            {/* Nombre del cliente */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Nombre del cliente
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juan García"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#16A34A] transition-colors text-sm"
              />
            </div>

            {/* Rutina */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Rutina
              </label>
              <select
                value={slugRutina}
                onChange={(e) => setSlugRutina(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#16A34A] transition-colors text-sm"
              >
                {rutinas.map((r) => (
                  <option key={r.id} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* URL generada */}
            {url && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Link generado
                </label>
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3">
                  <p className="text-[#4ADE80] text-xs break-all font-mono leading-relaxed">
                    {url}
                  </p>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={copiar}
                disabled={!url}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
              >
                {copiado ? (
                  <>
                    <Check className="w-4 h-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar link
                  </>
                )}
              </button>

              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Preview
                </a>
              )}
            </div>
          </div>

          <p className="text-slate-600 text-xs mt-5 text-center">
            Esta página no está enlazada desde ningún lado del sitio.
          </p>
        </div>
      </div>
    </main>
  );
}
