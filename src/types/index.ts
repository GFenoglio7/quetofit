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
