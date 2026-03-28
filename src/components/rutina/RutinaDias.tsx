"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DiaEntrenamiento } from "@/types";

interface Props {
  dias: DiaEntrenamiento[];
}

export default function RutinaDias({ dias }: Props) {
  const [abierto, setAbierto] = useState<number>(0);

  return (
    <div className="space-y-3">
      {dias.map((dia, idx) => {
        const estaAbierto = abierto === idx;
        return (
          <div
            key={dia.numero}
            className="bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800"
          >
            <button
              onClick={() => setAbierto(estaAbierto ? -1 : idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-semibold text-white text-sm sm:text-base">
                {dia.nombre}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                  estaAbierto ? "rotate-180" : ""
                }`}
              />
            </button>

            {estaAbierto && (
              <div className="px-5 pb-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 pr-4">
                          Ejercicio
                        </th>
                        <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 px-3 whitespace-nowrap">
                          Series
                        </th>
                        <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 px-3 whitespace-nowrap">
                          Reps
                        </th>
                        <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider pb-2 px-3 whitespace-nowrap">
                          Descanso
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {dia.ejercicios.map((ej, i) => (
                        <tr key={i} className="group">
                          <td className="py-3 pr-4">
                            <span className="text-slate-200 font-medium">
                              {ej.nombre}
                            </span>
                            {ej.notas && (
                              <p className="text-slate-500 text-xs mt-0.5">
                                {ej.notas}
                              </p>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center text-slate-300 whitespace-nowrap">
                            {ej.series}
                          </td>
                          <td className="py-3 px-3 text-center text-[#4ADE80] font-semibold whitespace-nowrap">
                            {ej.repeticiones}
                          </td>
                          <td className="py-3 px-3 text-center text-slate-400 whitespace-nowrap">
                            {ej.descanso}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
