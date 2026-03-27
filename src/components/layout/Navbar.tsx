"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppURL } from "@/lib/whatsapp";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/productos?category=proteinas", label: "Proteínas" },
    { href: "/productos?category=bienestar", label: "Bienestar" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0F172A]/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center group-hover:bg-[#15803D] transition-colors">
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">
            Queto<span className="text-[#16A34A]">-Fit</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* WhatsApp CTA + Mobile Menu */}
        <div className="flex items-center gap-3">
          <a
            href={buildGeneralWhatsAppURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-1"
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0F172A]/98 backdrop-blur-md border-t border-slate-800 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors text-sm"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={buildGeneralWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold px-3 py-2.5 rounded-lg transition-colors mt-2"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
