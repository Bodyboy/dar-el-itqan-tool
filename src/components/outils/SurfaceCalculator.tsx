"use client";

import { useState } from "react";
import { Plus, Trash2, DoorOpen, Square } from "lucide-react";
import { Piece, Ouverture } from "@/lib/types";
import { generateId } from "@/lib/storage";

export function SurfaceCalculator() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [hauteurDefaut, setHauteurDefaut] = useState(2.5);

  function ajouterPiece() {
    setPieces([...pieces, { id: generateId(), nom: `Pièce ${pieces.length + 1}`, longueur: 0, largeur: 0, hauteur: hauteurDefaut, ouvertures: [] }]);
  }
  function supprimerPiece(id: string) { setPieces(pieces.filter((p) => p.id !== id)); }
  function updatePiece(id: string, updates: Partial<Piece>) { setPieces(pieces.map((p) => (p.id === id ? { ...p, ...updates } : p))); }

  function ajouterOuverture(pieceId: string, type: "porte" | "fenetre") {
    setPieces(pieces.map((p) => p.id !== pieceId ? p : { ...p, ouvertures: [...p.ouvertures, { id: generateId(), type, largeur: type === "porte" ? 0.9 : 1.2, hauteur: type === "porte" ? 2.1 : 1.2 }] }));
  }
  function supprimerOuverture(pieceId: string, ouvertureId: string) {
    setPieces(pieces.map((p) => p.id !== pieceId ? p : { ...p, ouvertures: p.ouvertures.filter((o) => o.id !== ouvertureId) }));
  }
  function updateOuverture(pieceId: string, ouvertureId: string, updates: Partial<Ouverture>) {
    setPieces(pieces.map((p) => p.id !== pieceId ? p : { ...p, ouvertures: p.ouvertures.map((o) => o.id === ouvertureId ? { ...o, ...updates } : o) }));
  }

  function calculSurfaceSol(piece: Piece) { return piece.longueur * piece.largeur; }
  function calculSurfaceMurs(piece: Piece) {
    const perimetre = 2 * (piece.longueur + piece.largeur);
    return perimetre * piece.hauteur - piece.ouvertures.reduce((acc, o) => acc + o.largeur * o.hauteur, 0);
  }

  const totalSurfaceSol = pieces.reduce((acc, p) => acc + calculSurfaceSol(p), 0);
  const totalSurfaceMurs = pieces.reduce((acc, p) => acc + calculSurfaceMurs(p), 0);

  const inputClass = "h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#f9d423]/40 focus:border-[#f9d423]/50 transition-all";

  return (
    <div className="space-y-5">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">Hauteur sous plafond</label>
          <div className="flex items-center gap-2 mt-1.5">
            <input type="number" step="0.1" value={hauteurDefaut} onChange={(e) => setHauteurDefaut(parseFloat(e.target.value) || 0)} className={`${inputClass} w-20`} />
            <span className="text-xs text-muted-foreground">m</span>
          </div>
        </div>
        <button onClick={ajouterPiece} className="flex items-center gap-2 h-10 px-4 rounded-xl gradient-yellow text-[#333] text-sm font-semibold hover-scale glow-yellow">
          <Plus className="w-4 h-4" /> Ajouter une pièce
        </button>
      </div>

      {pieces.map((piece) => (
        <div key={piece.id} className="bg-card rounded-2xl border border-border card-shadow overflow-hidden">
          <div className="flex items-center justify-between p-4 pb-0">
            <input value={piece.nom} onChange={(e) => updatePiece(piece.id, { nom: e.target.value })} className="font-semibold text-base text-foreground bg-transparent border-none p-0 focus:outline-none" />
            <button onClick={() => supprimerPiece(piece.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-muted-foreground font-medium">Long. (m)</label>
                <input type="number" step="0.01" value={piece.longueur || ""} onChange={(e) => updatePiece(piece.id, { longueur: parseFloat(e.target.value) || 0 })} className={`${inputClass} w-full mt-1`} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-medium">Larg. (m)</label>
                <input type="number" step="0.01" value={piece.largeur || ""} onChange={(e) => updatePiece(piece.id, { largeur: parseFloat(e.target.value) || 0 })} className={`${inputClass} w-full mt-1`} />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-medium">Haut. (m)</label>
                <input type="number" step="0.1" value={piece.hauteur || ""} onChange={(e) => updatePiece(piece.id, { hauteur: parseFloat(e.target.value) || 0 })} className={`${inputClass} w-full mt-1`} />
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => ajouterOuverture(piece.id, "porte")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                <DoorOpen className="w-3.5 h-3.5" /> + Porte
              </button>
              <button onClick={() => ajouterOuverture(piece.id, "fenetre")} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Square className="w-3.5 h-3.5" /> + Fenêtre
              </button>
            </div>

            {piece.ouvertures.length > 0 && (
              <div className="space-y-2 pl-3 border-l-2 border-[#f9d423]/30">
                {piece.ouvertures.map((ouverture) => (
                  <div key={ouverture.id} className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground font-medium w-14">{ouverture.type === "porte" ? "Porte" : "Fenêtre"}</span>
                    <input type="number" step="0.01" value={ouverture.largeur || ""} onChange={(e) => updateOuverture(piece.id, ouverture.id, { largeur: parseFloat(e.target.value) || 0 })} className={`${inputClass} w-16 h-7 px-2 text-xs`} placeholder="L" />
                    <span className="text-muted-foreground text-xs">x</span>
                    <input type="number" step="0.01" value={ouverture.hauteur || ""} onChange={(e) => updateOuverture(piece.id, ouverture.id, { hauteur: parseFloat(e.target.value) || 0 })} className={`${inputClass} w-16 h-7 px-2 text-xs`} placeholder="H" />
                    <span className="text-[10px] text-muted-foreground">m</span>
                    <button onClick={() => supprimerOuverture(piece.id, ouverture.id)} className="w-6 h-6 rounded-md flex items-center justify-center text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-colors ml-auto">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#f9d423]/10 border border-[#f9d423]/20 p-3 rounded-xl">
                <p className="text-[10px] text-muted-foreground font-medium">Surface au sol</p>
                <p className="text-xl font-bold text-[#b89a00] dark:text-[#f9d423] mt-0.5">{calculSurfaceSol(piece).toFixed(2)} <span className="text-sm font-medium">m²</span></p>
              </div>
              <div className="bg-[#333]/5 dark:bg-white/5 border border-[#333]/10 dark:border-white/10 p-3 rounded-xl">
                <p className="text-[10px] text-muted-foreground font-medium">Surface murs</p>
                <p className="text-xl font-bold text-foreground mt-0.5">{calculSurfaceMurs(piece).toFixed(2)} <span className="text-sm font-medium">m²</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {pieces.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-5 text-white">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#f9d423]/10 rounded-full -translate-y-8 translate-x-8" />
          <h3 className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">Récapitulatif</h3>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <p className="text-white/50 text-xs">Surface totale au sol</p>
              <p className="text-2xl font-bold text-[#f9d423] mt-0.5">{totalSurfaceSol.toFixed(2)} m²</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Surface totale murs</p>
              <p className="text-2xl font-bold mt-0.5">{totalSurfaceMurs.toFixed(2)} m²</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/15 text-sm text-white/50">
            {pieces.length} pièce{pieces.length > 1 ? "s" : ""}
          </div>
        </div>
      )}

      {pieces.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Square className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <p className="font-medium text-foreground">Aucune pièce</p>
          <p className="text-sm text-muted-foreground mt-1">Ajoutez une pièce pour commencer</p>
        </div>
      )}
    </div>
  );
}
