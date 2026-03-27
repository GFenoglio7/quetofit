import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-8 h-8 text-slate-400" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">404</h1>
        <p className="text-slate-400 mb-8">Esta página no existe o el producto fue removido.</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Ir al inicio
          </Link>
          <Link
            href="/productos"
            className="bg-[#1E293B] hover:bg-[#243044] text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-slate-700"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}
