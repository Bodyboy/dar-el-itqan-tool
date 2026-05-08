import { supabase } from "./supabase";
import { Contact } from "./types";

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("prenom", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return (data || []).map(mapFromDb);
}

export async function getContact(id: string): Promise<Contact | undefined> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return undefined;
  return data ? mapFromDb(data) : undefined;
}

export async function saveContact(contact: Contact): Promise<void> {
  const dbContact = mapToDb(contact);

  const { error } = await supabase
    .from("contacts")
    .upsert(dbContact, { onConflict: "id" });

  if (error) console.error("Save error:", error);
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id);

  if (error) console.error("Delete error:", error);
}

function mapFromDb(row: Record<string, unknown>): Contact {
  return {
    id: row.id as string,
    prenom: row.prenom as string,
    metier: (row.metier as string) || "",
    telephone: row.telephone as string,
    email: (row.email as string) || "",
    adresse: (row.adresse as string) || "",
    createdAt: (row.created_at as string) || new Date().toISOString(),
  };
}

function mapToDb(contact: Contact) {
  return {
    id: contact.id,
    prenom: contact.prenom,
    metier: contact.metier,
    telephone: contact.telephone,
    email: contact.email,
    adresse: contact.adresse,
    created_at: contact.createdAt,
  };
}
