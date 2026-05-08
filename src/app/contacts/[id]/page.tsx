"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Edit, Trash2 } from "lucide-react";
import { Contact } from "@/lib/types";
import { getContact, deleteContact } from "@/lib/storage";
import { metiers } from "@/data/metiers";
import { ContactForm } from "@/components/contacts/ContactForm";

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [contact, setContact] = useState<Contact | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (params.id) getContact(params.id as string).then(setContact);
  }, [params.id]);

  if (!contact) {
    return <div className="p-4 pt-16 text-center text-muted-foreground">Contact non trouvé</div>;
  }

  const metier = metiers.find((m) => m.id === contact.metier);

  async function handleDelete() {
    if (confirm("Supprimer ce contact ?")) {
      await deleteContact(contact!.id);
      router.push("/contacts");
    }
  }

  if (isEditing) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 pt-4">
          <button onClick={() => setIsEditing(false)} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">Modifier</h1>
        </div>
        <ContactForm contact={contact} />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-5">
      <div className="flex items-center justify-between pt-4">
        <Link href="/contacts" className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors card-shadow">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex gap-2">
          <button onClick={() => setIsEditing(true)} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors card-shadow">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={handleDelete} className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-red-500/60 hover:text-red-500 transition-colors card-shadow">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#333] flex items-center justify-center text-white font-bold text-2xl mx-auto">
          {contact.prenom[0]}
        </div>
        <h2 className="mt-4 text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
          {contact.prenom}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#f9d423]/15 text-[#b89a00] dark:text-[#f9d423] text-xs font-semibold">
            {metier?.nom || contact.metier}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <a href={`tel:${contact.telephone}`} className="flex items-center gap-2 h-11 px-5 rounded-xl gradient-success text-white font-medium text-sm hover-scale">
          <Phone className="w-4 h-4" /> Appeler
        </a>
        <a href={`https://wa.me/${contact.telephone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 h-11 px-5 rounded-xl bg-card border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 font-medium text-sm hover-scale card-shadow">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>

      <div className="bg-card rounded-2xl border border-border card-shadow p-4 space-y-4">
        {contact.telephone && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f9d423]/15 flex items-center justify-center"><Phone className="w-4 h-4 text-[#b89a00] dark:text-[#f9d423]" /></div>
            <a href={`tel:${contact.telephone}`} className="text-sm text-foreground font-medium">{contact.telephone}</a>
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f9d423]/15 flex items-center justify-center"><Mail className="w-4 h-4 text-[#b89a00] dark:text-[#f9d423]" /></div>
            <a href={`mailto:${contact.email}`} className="text-sm text-foreground font-medium truncate">{contact.email}</a>
          </div>
        )}
        {contact.adresse && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"><MapPin className="w-4 h-4 text-muted-foreground" /></div>
            <span className="text-sm text-foreground">{contact.adresse}</span>
          </div>
        )}
      </div>
    </div>
  );
}
