import Link from "next/link";
import { Dumbbell, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppURL } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Queto<span className="text-[#16A34A]">-Fit</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Suplementos y productos de bienestar para llevar tu rendimiento al siguiente nivel.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Productos
            </h3>
            <ul className="space-y-2">
              {[
                ["Proteínas", "/productos?category=proteinas"],
                ["Creatina", "/productos?category=creatina"],
                ["Pre-Entreno", "/productos?category=pre-entreno"],
                ["Colágeno", "/productos?category=colageno"],
                ["Bienestar", "/productos?category=bienestar"],
                ["Ver todo", "/productos"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              ¿Tenés preguntas? Escribinos directamente por WhatsApp.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={buildGeneralWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4" />
                Escribinos
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <span className="w-4 h-4 flex items-center justify-center font-bold text-xs">IG</span>
                @quetofit
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Queto-Fit. Todos los derechos reservados.
          </p>
          <p className="text-slate-600 text-xs">
            Precios en pesos argentinos. Sujetos a cambios sin previo aviso.
          </p>
        </div>
      </div>
    </footer>
  );
}
