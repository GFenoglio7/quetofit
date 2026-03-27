import type { CartItem } from "@/context/CartContext";

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5491112345678";

export function buildWhatsAppURL(productName: string, variantLabel?: string): string {
  const variant = variantLabel ? ` — ${variantLabel}` : "";
  const message = `Hola! Me interesa el producto: *${productName}${variant}*. ¿Me podés dar más información y el precio?`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppURL(): string {
  const message = "Hola! Quisiera consultar sobre sus productos de suplementos y bienestar.";
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildCartWhatsAppURL(items: CartItem[]): string {
  const lines = items.map((item) => {
    const qty = item.quantity > 1 ? ` x${item.quantity}` : "";
    const price = item.price === 0 ? " (precio a consultar)" : "";
    return `• *${item.productName}* (${item.variantLabel})${qty}${price}`;
  });

  const message = [
    "Hola! Quisiera consultar por los siguientes productos:",
    "",
    ...lines,
    "",
    "¿Me podés confirmar disponibilidad y precio final?",
  ].join("\n");

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
