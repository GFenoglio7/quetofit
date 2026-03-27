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
