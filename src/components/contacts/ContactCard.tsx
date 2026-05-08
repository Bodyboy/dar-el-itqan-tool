"use client";

import { useRouter } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";
import { Contact } from "@/lib/types";
import { metiers } from "@/data/metiers";

interface ContactCardProps {
  contact: Contact;
}

const avatarColors = [
  "bg-[#333]",
  "bg-[#555]",
  "bg-[#444]",
  "bg-[#2d2d2d]",
  "bg-[#4a4a4a]",
  "bg-[#3a3a3a]",
];

function getAvatarColor(name: string) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
}

export function ContactCard({ contact }: ContactCardProps) {
  const router = useRouter();
  const metier = metiers.find((m) => m.id === contact.metier);
  const avatarBg = getAvatarColor(contact.prenom);

  return (
    <div
      onClick={() => router.push(`/contacts/${contact.id}`)}
      className="flex items-center gap-3 p-3.5 bg-card rounded-2xl border border-border card-shadow transition-all duration-200 hover:border-[#f9d423]/40 hover-scale cursor-pointer"
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${avatarBg} flex items-center justify-center text-white font-bold text-sm`}>
        {contact.prenom[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm truncate">
          {contact.prenom}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f9d423]/15 text-[#b89a00] dark:text-[#f9d423] text-[10px] font-semibold">
            {metier?.nom || contact.metier}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <a
          href={`tel:${contact.telephone}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
        >
          <Phone className="w-4 h-4" />
        </a>
        <a
          href={`https://wa.me/${contact.telephone.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
