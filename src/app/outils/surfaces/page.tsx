"use client";

import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";
import { SurfaceCalculator } from "@/components/outils/SurfaceCalculator";

export default function SurfacesPage() {
  return (
    <div className="p-4 space-y-5">
      <div className="flex items-center gap-3 pt-4">
        <Link href="/outils" className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors card-shadow">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-yellow flex items-center justify-center">
            <Calculator className="w-4 h-4 text-[#333]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">Calcul de surfaces</h1>
            <p className="text-xs text-muted-foreground">Sol et murs avec ouvertures</p>
          </div>
        </div>
      </div>
      <SurfaceCalculator />
    </div>
  );
}
