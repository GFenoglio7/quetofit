import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types";

const BADGE_STYLES: Record<string, string> = {
  "mas-vendido": "bg-[#FACC15] text-yellow-900",
  nuevo: "bg-[#16A34A] text-white",
  oferta: "bg-red-500 text-white",
  limitado: "bg-orange-500 text-white",
};

const BADGE_LABELS: Record<string, string> = {
  "mas-vendido": "Más Vendido",
  nuevo: "Nuevo",
  oferta: "Oferta",
  limitado: "Últimas Unidades",
};

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const allOutOfStock = product.variants.every((v) => !v.stock);

  return (
    <Link href={`/productos/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/10 transition-all duration-300 hover:-translate-y-1 border border-slate-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[product.badge]}`}
            >
              {BADGE_LABELS[product.badge]}
            </span>
          )}
          {allOutOfStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-slate-200 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full">
                Sin stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-slate-400 font-medium mb-1">
            {CATEGORY_LABELS[product.category]} · {product.brand}
          </p>
          <h3 className="text-slate-800 font-semibold text-sm leading-snug line-clamp-2 mb-3 flex-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <span
              className={`font-bold ${
                product.basePrice === 0 ? "text-sm text-slate-500" : "text-[#16A34A] text-base"
              }`}
            >
              {formatPrice(product.basePrice)}
            </span>
            <span className="text-xs text-[#16A34A] font-semibold group-hover:underline">
              Ver más →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
