import { Shield, MessageCircle, CreditCard, Package } from "lucide-react";

const BENEFITS = [
  { icon: Shield, title: "Productos Originales", desc: "100% auténticos, marcas líderes" },
  { icon: MessageCircle, title: "Atención Personalizada", desc: "Asesoramiento por WhatsApp" },
  { icon: CreditCard, title: "Financiación Disponible", desc: "Hasta 6 cuotas sin interés" },
  { icon: Package, title: "Envíos a Todo el País", desc: "Despacho rápido y seguro" },
];

export default function BenefitsBar() {
  return (
    <section className="bg-[#1E293B] border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#16A34A]/10 rounded-lg flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
