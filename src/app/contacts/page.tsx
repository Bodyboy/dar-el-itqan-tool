"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { Contact } from "@/lib/types";
import { getContacts } from "@/lib/storage";
import { metiers } from "@/data/metiers";
import { SearchBar } from "@/components/contacts/SearchBar";
import { ContactCard } from "@/components/contacts/ContactCard";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [recherche, setRecherche] = useState("");
  const [filtreMetier, setFiltreMetier] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getContacts().then(setContacts);
  }, []);

  const contactsFiltres = contacts.filter((contact) => {
    const matchRecherche =
      recherche === "" ||
      contact.prenom.toLowerCase().includes(recherche.toLowerCase()) ||
      metiers.find((m) => m.id === contact.metier)?.nom.toLowerCase().includes(recherche.toLowerCase());

    const matchMetier = filtreMetier === "all" || contact.metier === filtreMetier;

    return matchRecherche && matchMetier;
  });

  const contactsTries = [...contactsFiltres].sort((a, b) =>
    a.prenom.localeCompare(b.prenom)
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between pt-4">
        <div>
          <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">Contacts</h1>
          <p className="text-xs text-muted-foreground">{contacts.length} professionnel{contacts.length > 1 ? "s" : ""}</p>
        </div>
        <Link href="/contacts/nouveau">
          <div className="flex items-center gap-1.5 h-9 px-4 rounded-xl gradient-yellow text-[#333] text-sm font-semibold hover-scale glow-yellow">
            <Plus className="w-4 h-4" /> Ajouter
          </div>
        </Link>
      </div>

      <SearchBar
        value={recherche}
        onChange={setRecherche}
        placeholder="Rechercher un prénom ou métier..."
      />

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-xs font-medium transition-all ${
            showFilters
              ? "bg-[#f9d423] text-[#333] font-semibold"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Filter className="w-3 h-3" /> Filtres
        </button>
        {filtreMetier !== "all" && (
          <span className="text-xs text-[#b89a00] dark:text-[#f9d423] font-semibold">
            {metiers.find((m) => m.id === filtreMetier)?.nom}
          </span>
        )}
      </div>

      {showFilters && (
        <div className="p-4 bg-card rounded-2xl border border-border card-shadow">
          <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-2.5">Corps de métier</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltreMetier("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filtreMetier === "all"
                  ? "bg-[#333] dark:bg-[#f9d423] text-white dark:text-[#333]"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Tous
            </button>
            {metiers.map((m) => (
              <button
                key={m.id}
                onClick={() => setFiltreMetier(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filtreMetier === m.id
                    ? "gradient-yellow text-[#333] font-semibold"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.nom}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {contactsTries.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>

      {contactsTries.length === 0 && (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Filter className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-foreground">Aucun contact trouvé</p>
          {recherche && <p className="text-sm text-muted-foreground mt-1">Essayez avec d&apos;autres termes</p>}
        </div>
      )}
    </div>
  );
}
