"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product, ProductVariant } from "@/types";

interface Props {
  product: Product;
  variant?: ProductVariant;
  fullWidth?: boolean;
}

export default function AddToCartButton({ product, variant, fullWidth }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const targetVariant = variant ?? product.variants.find((v) => v.stock) ?? product.variants[0];

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      slug: product.slug,
      productName: product.name,
      variantId: targetVariant.id,
      variantLabel: targetVariant.label,
      price: targetVariant.price,
      image: product.images[0],
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const isOutOfStock = !targetVariant.stock;

  return (
    <button
      onClick={handleClick}
      disabled={isOutOfStock}
      className={`
        flex items-center justify-center gap-2 font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200
        ${fullWidth ? "w-full" : ""}
        ${
          isOutOfStock
            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
            : added
            ? "bg-[#16A34A] text-white"
            : "bg-[#16A34A] hover:bg-[#15803D] text-white hover:shadow-lg hover:shadow-[#16A34A]/25 hover:-translate-y-0.5"
        }
      `}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          Agregado
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? "Sin stock" : "Agregar"}
        </>
      )}
    </button>
  );
}
