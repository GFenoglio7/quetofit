import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import { ShoppingBag } from "lucide-react";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="w-12 h-12 text-slate-600 mb-4" />
        <p className="text-slate-400 text-lg">No hay productos en esta categoría.</p>
        <p className="text-slate-500 text-sm mt-1">Probá con otra categoría o volvé más tarde.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
