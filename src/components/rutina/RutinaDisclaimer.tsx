import { AlertTriangle } from "lucide-react";

export default function RutinaDisclaimer() {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 sm:p-5">
      <div className="flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            Descargo de responsabilidad
          </p>
          <p className="text-slate-400 text-xs leading-relaxed">
            Las rutinas publicadas en este sitio tienen carácter informativo y educativo general. No
            constituyen asesoramiento médico personalizado ni reemplazan la evaluación de un
            profesional de la salud, médico deportólogo, kinesiólogo o preparador físico habilitado.
            Al acceder y utilizar cualquier rutina, el usuario declara conocer su estado de salud y
            asume la <strong className="text-slate-300">total responsabilidad</strong> por la
            ejecución de los ejercicios. Queto-Fit no se hace responsable por lesiones, daños
            físicos, problemas de salud, accidentes ni cualquier otro perjuicio —directo o
            indirecto, de corto, mediano o largo plazo— que pudieran derivarse del uso de las
            rutinas aquí publicadas. Se recomienda consultar con un médico antes de iniciar
            cualquier programa de ejercicio, especialmente ante condiciones de salud preexistentes.
          </p>
        </div>
      </div>
    </div>
  );
}
