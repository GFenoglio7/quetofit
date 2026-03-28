import type { Rutina } from "@/types";
import RutinaCard from "./RutinaCard";

interface Props {
  rutinas: Rutina[];
}

export default function RutinaGrid({ rutinas }: Props) {
  if (rutinas.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-lg">
          No hay rutinas para los filtros seleccionados.
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Probá cambiando el objetivo o el nivel.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rutinas.map((rutina) => (
        <RutinaCard key={rutina.id} rutina={rutina} />
      ))}
    </div>
  );
}
