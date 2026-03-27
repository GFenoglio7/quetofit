"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppURL } from "@/lib/whatsapp";

interface Props {
  productName: string;
  variantLabel?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function WhatsAppButton({ productName, variantLabel, size = "md", fullWidth = false }: Props) {
  const url = buildWhatsAppURL(productName, variantLabel);

  const sizeClasses = {
    sm: "text-sm px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-3 gap-2",
    lg: "text-base px-6 py-4 gap-2.5",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative inline-flex items-center justify-center font-semibold rounded-xl
        bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851]
        text-white transition-all duration-200
        hover:shadow-lg hover:shadow-[#25D366]/25
        hover:-translate-y-0.5 active:translate-y-0
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
      `}
    >
      <span className="absolute inset-0 rounded-xl animate-ping bg-[#25D366]/20 pointer-events-none" />
      <MessageCircle className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      Consultar por WhatsApp
    </a>
  );
}
