"use client";

import { useState, useEffect } from "react";
import { Trash2, Download, Upload, Sparkles } from "lucide-react";
import { getContacts } from "@/lib/storage";
import { useTheme } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function ParametresPage() {
  const [nbContacts, setNbContacts] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    getContacts().then((c) => setNbContacts(c.length));
  }, []);

  async function exporterDonnees() {
    const contacts = await getContacts();
    const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dar-el-itqan-contacts-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importerDonnees() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (Array.isArray(data)) {
            const { saveContact } = await import("@/lib/storage");
            for (const contact of data) {
              await saveContact(contact);
            }
            setNbContacts(data.length);
            alert("Import réussi !");
          }
        } catch { alert("Fichier invalide"); }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  async function supprimerTout() {
    if (confirm("Supprimer tous les contacts ? Cette action est irréversible.")) {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("contacts").delete().neq("id", "");
      setNbContacts(0);
    }
  }

  return (
    <div className="p-4 space-y-5">
      <div className="pt-4">
        <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">Réglages</h1>
        <p className="text-xs text-muted-foreground">Configuration de l&apos;application</p>
      </div>

      {/* Apparence */}
      <div className="bg-card rounded-2xl border border-border card-shadow overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] text-[#b89a00] dark:text-[#f9d423] font-semibold uppercase tracking-widest">Apparence</p>
        </div>
        <div className="p-4 pt-2">
          <div className="flex items-center justify-between h-12 px-4 bg-muted/50 rounded-xl">
            <span className="text-sm font-medium text-foreground">
              {theme === "dark" ? "Mode sombre" : "Mode clair"}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Données */}
      <div className="bg-card rounded-2xl border border-border card-shadow overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] text-[#b89a00] dark:text-[#f9d423] font-semibold uppercase tracking-widest">Données</p>
        </div>
        <div className="p-4 pt-2 space-y-2">
          <div className="flex items-center gap-3 h-11 px-4 bg-muted/30 rounded-xl">
            <span className="text-sm text-muted-foreground">Contacts enregistrés</span>
            <span className="ml-auto text-sm font-bold text-[#b89a00] dark:text-[#f9d423]">{nbContacts}</span>
          </div>
          <button onClick={exporterDonnees} className="w-full flex items-center gap-3 h-12 px-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /></div>
            <span className="text-sm font-medium text-foreground">Exporter les contacts</span>
          </button>
          <button onClick={importerDonnees} className="w-full flex items-center gap-3 h-12 px-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
            <span className="text-sm font-medium text-foreground">Importer des contacts</span>
          </button>
          <div className="pt-2">
            <button onClick={supprimerTout} className="w-full flex items-center gap-3 h-12 px-4 bg-red-500/5 rounded-xl hover:bg-red-500/10 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><Trash2 className="w-4 h-4 text-red-500" /></div>
              <span className="text-sm font-medium text-red-500">Supprimer tous les contacts</span>
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="relative overflow-hidden bg-card rounded-2xl border border-border card-shadow p-5">
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#f9d423]/5 rounded-full -translate-y-6 translate-x-6" />
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-yellow flex items-center justify-center glow-yellow">
            <Sparkles className="w-5 h-5 text-[#333]" />
          </div>
          <div>
            <p className="font-bold text-foreground text-sm font-[family-name:var(--font-space-grotesk)]">Dar El Itqan</p>
            <p className="text-xs text-muted-foreground mt-0.5">Outils BTP &mdash; v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
