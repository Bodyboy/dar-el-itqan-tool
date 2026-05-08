"use client";

import Link from "next/link";
import { Calculator, Package, FileText, Ruler, ArrowRight, Lock } from "lucide-react";

const outils = [
  { id: "surfaces", nom: "Calcul de surfaces", description: "Surfaces au sol et des murs, déduction des ouvertures", icon: Calculator, href: "/outils/surfaces", disponible: true },
  { id: "materiaux", nom: "Calcul de matériaux", description: "Estimer les quantités de matériaux selon les surfaces", icon: Package, href: "/outils/materiaux", disponible: false },
  { id: "devis", nom: "Devis rapide", description: "Générer un devis simplifié pour vos travaux", icon: FileText, href: "/outils/devis", disponible: false },
  { id: "conversion", nom: "Conversions", description: "Convertir les unités de mesure du bâtiment", icon: Ruler, href: "/outils/conversion", disponible: false },
];

export default function OutilsPage() {
  return (
    <div className="p-4 space-y-5">
      <div className="pt-4">
        <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">Outils</h1>
        <p className="text-xs text-muted-foreground">Outils de calcul pour le bâtiment</p>
      </div>

      <div className="space-y-3">
        {outils.map((outil) => {
          const content = (
            <div className={`relative bg-card rounded-2xl p-4 border border-border card-shadow transition-all duration-200 ${outil.disponible ? "hover:border-[#f9d423]/40 hover-scale" : "opacity-50"}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${outil.disponible ? "gradient-yellow" : "bg-muted"} flex items-center justify-center flex-shrink-0`}>
                  <outil.icon className={`w-5 h-5 ${outil.disponible ? "text-[#333]" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground text-sm">{outil.nom}</h3>
                    {!outil.disponible && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium text-muted-foreground">
                        <Lock className="w-2.5 h-2.5" /> Bientôt
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{outil.description}</p>
                </div>
                {outil.disponible && <ArrowRight className="w-4 h-4 text-muted-foreground/40 mt-1 flex-shrink-0" />}
              </div>
            </div>
          );

          if (outil.disponible) return <Link key={outil.id} href={outil.href} className="block">{content}</Link>;
          return <div key={outil.id}>{content}</div>;
        })}
      </div>
    </div>
  );
}
