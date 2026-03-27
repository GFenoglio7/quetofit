import { getAllProducts, getProductsByCategory, getAvailableCategories } from "@/lib/products";
import ProductGrid from "@/components/product/ProductGrid";
import { CATEGORY_LABELS, type Category } from "@/types";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos | Queto-Fit",
  description: "Explorá nuestro catálogo completo de suplementos deportivos y productos de bienestar.",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category as Category | undefined;
  const availableCategories = getAvailableCategories();

  const products =
    category && availableCategories.includes(category)
      ? getProductsByCategory(category)
      : getAllProducts();

  return (
    <div className="min-h-screen bg-[#0A1628] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {category ? CATEGORY_LABELS[category] : "Todos los Productos"}
          </h1>
          <p className="text-slate-400">
            {products.length} producto{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          <Link
            href="/productos"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !category
                ? "bg-[#16A34A] text-white"
                : "bg-[#1E293B] text-slate-300 hover:bg-[#243044] border border-slate-700"
            }`}
          >
            Todos
          </Link>
          {availableCategories.map((cat) => (
            <Link
              key={cat}
              href={`/productos?category=${cat}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-[#16A34A] text-white"
                  : "bg-[#1E293B] text-slate-300 hover:bg-[#243044] border border-slate-700"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
