import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { buildGeneralWhatsAppURL } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0F172A] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#0A1628]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(22,163,74,0.15),rgba(255,255,255,0))]" />

      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#16A34A]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#16A34A]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-full px-4 py-1.5 mb-8">
          <Zap className="w-3.5 h-3.5 text-[#16A34A]" />
          <span className="text-[#16A34A] text-xs font-semibold uppercase tracking-wider">
            Suplementos Premium
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Tu rendimiento,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16A34A] to-[#4ADE80]">
            sin límites
          </span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Proteínas, creatina, pre-entrenos, colágeno y más. Todo lo que necesitás para entrenar más
          fuerte y recuperarte mejor.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/productos"
            className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#16A34A]/25 hover:-translate-y-0.5"
          >
            Ver productos
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={buildGeneralWhatsAppURL()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#25D366]/25 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            Consultar ahora
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {[
            { icon: Shield, text: "Productos originales" },
            { icon: MessageCircle, text: "Atención personalizada" },
            { icon: Truck, text: "Envíos a todo el país" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-slate-400 text-sm">
              <Icon className="w-4 h-4 text-[#16A34A]" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
