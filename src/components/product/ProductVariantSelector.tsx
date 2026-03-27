"use client";

import { useState } from "react";
import type { ProductVariant } from "@/types";

interface Props {
  variants: ProductVariant[];
  onSelect: (variant: ProductVariant) => void;
}

export default function ProductVariantSelector({ variants, onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string>(variants[0]?.id ?? "");

  if (variants.length <= 1) return null;

  const hasFlavors = variants.some((v) => v.flavor);
  const hasSizes = variants.some((v) => v.size);

  const flavorVariants = hasFlavors ? variants : [];
  const sizeVariants = hasSizes && !hasFlavors ? variants : [];

  function select(variant: ProductVariant) {
    setSelectedId(variant.id);
    onSelect(variant);
  }

  const VariantButton = ({ variant }: { variant: ProductVariant }) => (
    <button
      onClick={() => select(variant)}
      disabled={!variant.stock}
      className={`
        relative px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150
        ${
          selectedId === variant.id
            ? "border-[#16A34A] bg-[#16A34A]/10 text-[#16A34A]"
            : variant.stock
            ? "border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
            : "border-slate-800 text-slate-600 cursor-not-allowed"
        }
      `}
    >
      {!variant.stock && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-full h-px bg-slate-600 rotate-[-20deg]" />
        </span>
      )}
      {variant.flavor ?? variant.size ?? variant.label}
      {!variant.stock && (
        <span className="ml-1.5 text-xs text-slate-500">(sin stock)</span>
      )}
    </button>
  );

  return (
    <div className="space-y-4">
      {flavorVariants.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-300 mb-2">Sabor</p>
          <div className="flex flex-wrap gap-2">
            {flavorVariants.map((v) => (
              <VariantButton key={v.id} variant={v} />
            ))}
          </div>
        </div>
      )}
      {sizeVariants.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-300 mb-2">Tamaño</p>
          <div className="flex flex-wrap gap-2">
            {sizeVariants.map((v) => (
              <VariantButton key={v.id} variant={v} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
