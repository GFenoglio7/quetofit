export interface ProductVariant {
  id: string;
  label: string;
  flavor?: string;
  size?: string;
  price: number;
  stock: boolean;
}

export type Category =
  | "proteinas"
  | "energia"
  | "barras"
  | "creatina"
  | "aminoacidos"
  | "quemadores"
  | "pre-entreno"
  | "hidratacion"
  | "accesorios"
  | "minerales"
  | "colageno"
  | "bienestar";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  shortDescription: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  basePrice: number;
  featured: boolean;
  badge?: "nuevo" | "mas-vendido" | "oferta" | "limitado";
  tags: string[];
}

export interface Ejercicio {
  nombre: string;
  series: number;
  repeticiones: string;
  descanso: string;
  notas?: string;
}

export interface DiaEntrenamiento {
  numero: number;
  nombre: string;
  ejercicios: Ejercicio[];
}

export type ObjetivoRutina =
  | "hipertrofia"
  | "definicion"
  | "fuerza"
  | "resistencia"
  | "principiante";

export type NivelRutina = "principiante" | "intermedio" | "avanzado";

export interface Rutina {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  objetivo: ObjetivoRutina;
  nivel: NivelRutina;
  diasPorSemana: number;
  duracionMinutos: number;
  dias: DiaEntrenamiento[];
  suplementosRecomendados: string[];
  featured: boolean;
  badge?: "nuevo" | "recomendado" | "popular";
}

export const OBJETIVO_LABELS: Record<ObjetivoRutina, string> = {
  hipertrofia: "Hipertrofia",
  definicion: "Definición",
  fuerza: "Fuerza",
  resistencia: "Resistencia",
  principiante: "Principiantes",
};

export const NIVEL_LABELS: Record<NivelRutina, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  proteinas: "Proteínas",
  energia: "Energía",
  barras: "Barras",
  creatina: "Creatina",
  aminoacidos: "Aminoácidos",
  quemadores: "Quemadores",
  "pre-entreno": "Pre-Entreno",
  hidratacion: "Hidratación",
  accesorios: "Accesorios",
  minerales: "Minerales",
  colageno: "Colágeno",
  bienestar: "Bienestar",
};
