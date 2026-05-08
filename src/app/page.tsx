"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Wrench, Calculator, Plus, ArrowRight } from "lucide-react";
import { Contact } from "@/lib/types";
import { getContacts } from "@/lib/storage";
import { ContactCard } from "@/components/contacts/ContactCard";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  const derniersContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="p-4 space-y-6">
      {/* Theme toggle */}
      <div className="flex justify-end pt-2">
        <ThemeToggle />
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f9d423]/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Dar El Itqan
          </h1>
          <p className="text-white/60 text-sm mt-1">
            Boîte à outils BTP
          </p>
          <div className="flex items-center gap-8 mt-5">
            <div>
              <p className="text-3xl font-bold text-[#f9d423]">{contacts.length}</p>
              <p className="text-[11px] text-white/50 uppercase tracking-wider mt-0.5">Contacts</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-3xl font-bold">1</p>
              <p className="text-[11px] text-white/50 uppercase tracking-wider mt-0.5">Outil actif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick cards */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/contacts" className="group">
          <div className="relative bg-card rounded-2xl p-4 border border-border card-shadow transition-all duration-200 hover-scale">
            <div className="w-10 h-10 rounded-xl bg-[#333] dark:bg-[#f9d423] flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-white dark:text-[#333]" />
            </div>
            <p className="font-semibold text-foreground text-sm">Contacts</p>
            <p className="text-xs text-muted-foreground mt-0.5">{contacts.length} enregistrés</p>
            <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/40 group-hover:text-[#f9d423] transition-colors" />
          </div>
        </Link>
        <Link href="/outils" className="group">
          <div className="relative bg-card rounded-2xl p-4 border border-border card-shadow transition-all duration-200 hover-scale">
            <div className="w-10 h-10 rounded-xl gradient-yellow flex items-center justify-center mb-3">
              <Wrench className="w-5 h-5 text-[#333]" />
            </div>
            <p className="font-semibold text-foreground text-sm">Outils</p>
            <p className="text-xs text-muted-foreground mt-0.5">Calculs & devis</p>
            <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/40 group-hover:text-[#f9d423] transition-colors" />
          </div>
        </Link>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/contacts/nouveau">
          <div className="flex items-center justify-center gap-2 h-11 rounded-xl gradient-yellow text-[#333] font-semibold text-sm hover-scale glow-yellow">
            <Plus className="w-4 h-4" /> Nouveau contact
          </div>
        </Link>
        <Link href="/outils/surfaces">
          <div className="flex items-center justify-center gap-2 h-11 rounded-xl bg-card border border-border text-foreground font-medium text-sm hover-scale card-shadow">
            <Calculator className="w-4 h-4" /> Calc. surfaces
          </div>
        </Link>
      </div>

      {/* Recent */}
      {derniersContacts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Récents
            </h2>
            <Link href="/contacts" className="text-xs text-[#f9d423] dark:text-[#f9d423] font-semibold">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {derniersContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      )}

      {contacts.length === 0 && (
        <div className="bg-card rounded-2xl p-8 text-center border border-dashed border-border card-shadow">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Users className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">Aucun contact</p>
          <p className="text-sm text-muted-foreground mt-1">
            Commencez par ajouter vos premiers contacts
          </p>
        </div>
      )}
    </div>
  );
}
