"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@/lib/types";
import { saveContact, generateId } from "@/lib/storage";
import { metiers } from "@/data/metiers";

interface ContactFormProps {
  contact?: Contact;
}

export function ContactForm({ contact }: ContactFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Contact, "id" | "createdAt">>({
    prenom: contact?.prenom || "",
    metier: contact?.metier || "",
    telephone: contact?.telephone || "",
    email: contact?.email || "",
    adresse: contact?.adresse || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const contactData: Contact = {
      id: contact?.id || generateId(),
      ...formData,
      createdAt: contact?.createdAt || new Date().toISOString(),
    };
    await saveContact(contactData);
    router.push("/contacts");
  }

  const inputClass = "w-full h-12 px-4 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[#f9d423]/40 focus:border-[#f9d423]/50 transition-all";
  const labelClass = "text-[10px] text-muted-foreground font-semibold uppercase tracking-widest";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-card rounded-2xl border border-border card-shadow p-4 space-y-4">
        <p className="text-xs font-bold text-[#b89a00] dark:text-[#f9d423]">Identité</p>
        <div>
          <label className={labelClass}>Prénom</label>
          <input value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} required className={`${inputClass} mt-1.5`} placeholder="Prénom" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border card-shadow p-4 space-y-4">
        <p className="text-xs font-bold text-[#b89a00] dark:text-[#f9d423]">Métier</p>
        <div>
          <label className={labelClass}>Corps de métier</label>
          <select value={formData.metier} onChange={(e) => setFormData({ ...formData, metier: e.target.value })} className={`${inputClass} mt-1.5`}>
            <option value="">Sélectionner un métier</option>
            {metiers.map((m) => (<option key={m.id} value={m.id}>{m.nom}</option>))}
          </select>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border card-shadow p-4 space-y-4">
        <p className="text-xs font-bold text-[#b89a00] dark:text-[#f9d423]">Coordonnées</p>
        <div>
          <label className={labelClass}>Téléphone</label>
          <input type="tel" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} required className={`${inputClass} mt-1.5`} placeholder="+213 XX XX XX XX" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`${inputClass} mt-1.5`} placeholder="email@exemple.com" />
        </div>
        <div>
          <label className={labelClass}>Adresse</label>
          <input value={formData.adresse} onChange={(e) => setFormData({ ...formData, adresse: e.target.value })} className={`${inputClass} mt-1.5`} placeholder="Adresse complète" />
        </div>
      </div>

      <div className="flex gap-3 pt-2 pb-4">
        <button type="submit" className="flex-1 h-12 rounded-xl gradient-yellow text-[#333] font-bold text-sm hover-scale glow-yellow">
          {contact ? "Enregistrer" : "Ajouter le contact"}
        </button>
        <button type="button" onClick={() => router.back()} className="h-12 px-6 rounded-xl bg-card border border-border text-muted-foreground font-medium text-sm hover:text-foreground transition-colors">
          Annuler
        </button>
      </div>
    </form>
  );
}
