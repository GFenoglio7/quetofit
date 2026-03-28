import rutinasData from "@/data/rutinas.json";
import type { Rutina, ObjetivoRutina, NivelRutina } from "@/types";

const rutinas = rutinasData as Rutina[];

export function getAllRutinas(): Rutina[] {
  return rutinas;
}

export function getFeaturedRutinas(): Rutina[] {
  return rutinas.filter((r) => r.featured);
}

export function getRutinaBySlug(slug: string): Rutina | undefined {
  return rutinas.find((r) => r.slug === slug);
}

export function getRutinasByObjetivo(objetivo: ObjetivoRutina): Rutina[] {
  return rutinas.filter((r) => r.objetivo === objetivo);
}

export function getRutinasByNivel(nivel: NivelRutina): Rutina[] {
  return rutinas.filter((r) => r.nivel === nivel);
}

export function getAllSlugsRutinas(): string[] {
  return rutinas.map((r) => r.slug);
}

export function filterRutinas({
  objetivo,
  nivel,
}: {
  objetivo?: string;
  nivel?: string;
}): Rutina[] {
  return rutinas.filter((r) => {
    if (objetivo && r.objetivo !== objetivo) return false;
    if (nivel && r.nivel !== nivel) return false;
    return true;
  });
}
