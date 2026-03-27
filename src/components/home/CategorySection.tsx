import Link from "next/link";
import { Zap, Dumbbell, Apple, Heart, Droplets, Pill } from "lucide-react";

const CATEGORIES = [
  { slug: "proteinas", label: "Proteínas", icon: Dumbbell, desc: "Whey y suplementos proteicos", color: "from-blue-500/20 to-blue-600/10" },
  { slug: "pre-entreno", label: "Pre-Entreno", icon: Zap, desc: "Energía y pump máximo", color: "from-orange-500/20 to-orange-600/10" },
  { slug: "creatina", label: "Creatina", icon: Dumbbell, desc: "Fuerza y rendimiento", color: "from-purple-500/20 to-purple-600/10" },
  { slug: "energia", label: "Energía & Geles", icon: Zap, desc: "Geles para deportes de resistencia", color: "from-yellow-500/20 to-yellow-600/10" },
  { slug: "colageno", label: "Colágeno", icon: Heart, desc: "Piel, articulaciones y bienestar", color: "from-pink-500/20 to-pink-600/10" },
  { slug: "bienestar", label: "Bienestar", icon: Pill, desc: "Ashwagandha, NAD+ y más", color: "from-green-500/20 to-green-600/10" },
  { slug: "barras", label: "Barras Proteicas", icon: Apple, desc: "Snacks nutritivos y deliciosos", color: "from-amber-500/20 to-amber-600/10" },
  { slug: "minerales", label: "Minerales", icon: Droplets, desc: "Magnesio, potasio y electrolitos", color: "from-cyan-500/20 to-cyan-600/10" },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Explorá por categoría
          </h2>
          <p className="text-slate-400">Encontrá exactamente lo que buscás para tus objetivos</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map(({ slug, label, icon: Icon, desc, color }) => (
            <Link
              key={slug}
              href={`/productos?category=${slug}`}
              className="group relative bg-[#1E293B] hover:bg-[#243044] border border-slate-800 hover:border-[#16A34A]/40 rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">{label}</h3>
              <p className="text-slate-500 text-xs leading-snug">{desc}</p>
              <span className="absolute bottom-4 right-4 text-[#16A34A] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Ver →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
