"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contacts/ContactForm";

export default function NouveauContactPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 pt-4">
        <Link href="/contacts" className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors card-shadow">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">Nouveau contact</h1>
      </div>
      <ContactForm />
    </div>
  );
}
