"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types";
import type { ProductVariant } from "@/types";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductVariantSelector from "@/components/product/ProductVariantSelector";
import WhatsAppButton from "@/components/product/WhatsAppButton";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ChevronLeft, Tag, CheckCircle2 } from "lucide-react";

const BADGE_LABELS: Record<string, string> = {
  "mas-vendido": "Más Vendido",
  nuevo: "Nuevo",
  oferta: "Oferta",
  limitado: "Últimas Unidades",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);

  const currentPrice = selectedVariant?.price ?? product.basePrice;
  const isConsultar = currentPrice === 0;

  return (
    <div className="min-h-screen bg-[#0A1628] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-slate-300 transition-colors">Productos</Link>
          <span>/</span>
          <Link
            href={`/productos?category=${product.category}`}
            className="hover:text-slate-300 transition-colors"
          >
            {CATEGORY_LABELS[product.category]}
          </Link>
          <span>/</span>
          <span className="text-slate-400 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Gallery */}
          <ProductImageGallery images={product.images} name={product.name} />

          {/* Info */}
          <div className="flex flex-col">
            {/* Brand + category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-slate-400">{product.brand}</span>
              <span className="text-slate-600">·</span>
              <span className="text-sm text-slate-400">{CATEGORY_LABELS[product.category]}</span>
              {product.badge && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="inline-flex items-center gap-1 bg-[#16A34A]/10 border border-[#16A34A]/20 text-[#16A34A] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    {BADGE_LABELS[product.badge]}
                  </span>
                </>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-slate-400 leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span
                className={`font-bold ${
                  isConsultar ? "text-slate-400 text-lg" : "text-[#16A34A] text-3xl"
                }`}
              >
                {formatPrice(currentPrice)}
              </span>
              {!isConsultar && (
                <p className="text-slate-500 text-xs mt-1">
                  Hasta 6 cuotas sin interés · 15% OFF pagando en efectivo
                </p>
              )}
            </div>

            {/* Variant selector */}
            <div className="mb-8">
              <ProductVariantSelector
                variants={product.variants}
                onSelect={setSelectedVariant}
              />
            </div>

            {/* WhatsApp CTA */}
            <div className="space-y-3">
              <WhatsAppButton
                productName={product.name}
                variantLabel={selectedVariant?.label}
                size="lg"
                fullWidth
              />
              {isConsultar && (
                <p className="text-center text-slate-500 text-xs">
                  Consultanos el precio actualizado por WhatsApp
                </p>
              )}
            </div>

            {/* Back button */}
            <Link
              href="/productos"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors mt-6 w-fit"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver al catálogo
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-800">
            <h2 className="text-white font-bold text-lg mb-4">Descripción</h2>
            <p className="text-slate-400 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {product.tags.length > 0 && (
            <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-800">
              <h2 className="text-white font-bold text-lg mb-4">Características</h2>
              <ul className="space-y-2">
                {product.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-2 text-slate-300 text-sm capitalize">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Productos relacionados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky WhatsApp bar on mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0F172A]/90 backdrop-blur-md border-t border-slate-800 lg:hidden z-40">
        <WhatsAppButton
          productName={product.name}
          variantLabel={selectedVariant?.label}
          size="md"
          fullWidth
        />
      </div>
    </div>
  );
}
