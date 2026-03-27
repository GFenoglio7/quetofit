"use client";

import Image from "next/image";
import { X, Trash2, ShoppingCart, Minus, Plus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { buildCartWhatsAppURL } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems } =
    useCart();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const hasUnknownPrices = items.some((i) => i.price === 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0F172A] border-l border-slate-800 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#16A34A]" />
            <h2 className="text-white font-bold text-lg">Mi Consulta</h2>
            {totalItems > 0 && (
              <span className="bg-[#16A34A] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="text-slate-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingCart className="w-12 h-12 text-slate-700 mb-3" />
              <p className="text-slate-400 font-medium">Tu consulta está vacía</p>
              <p className="text-slate-600 text-sm mt-1">
                Agregá productos para consultar por WhatsApp
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex gap-3 bg-[#1E293B] rounded-xl p-3 border border-slate-800"
              >
                {/* Image */}
                <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold leading-snug line-clamp-2">
                    {item.productName}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.variantLabel}</p>
                  <p className="text-[#16A34A] font-bold text-sm mt-1">
                    {item.price === 0 ? "A consultar" : formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                {/* Quantity + Remove */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-slate-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3 text-white" />
                    </button>
                    <span className="text-white text-sm font-semibold w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 px-4 py-4 space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">
                {hasUnknownPrices ? "Total estimado" : "Total"}
              </span>
              <span className="text-white font-bold text-lg">
                {total === 0 ? "A consultar" : formatPrice(total)}
              </span>
            </div>

            {hasUnknownPrices && (
              <p className="text-slate-500 text-xs">
                * Algunos productos tienen precio a confirmar por WhatsApp
              </p>
            )}

            {/* WhatsApp button */}
            <a
              href={buildCartWhatsAppURL(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="w-full text-slate-500 hover:text-slate-300 text-sm transition-colors py-1"
            >
              Vaciar consulta
            </button>
          </div>
        )}
      </div>
    </>
  );
}
