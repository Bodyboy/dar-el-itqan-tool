export interface Contact {
  id: string;
  prenom: string;
  metier: string;
  telephone: string;
  email: string;
  adresse: string;
  createdAt: string;
}

export interface Metier {
  id: string;
  nom: string;
  categorie: CategorieMetier;
}

export type CategorieMetier = "gros-oeuvre" | "second-oeuvre" | "autres";

export interface Piece {
  id: string;
  nom: string;
  longueur: number;
  largeur: number;
  hauteur: number;
  ouvertures: Ouverture[];
}

export interface Ouverture {
  id: string;
  type: "porte" | "fenetre";
  largeur: number;
  hauteur: number;
}
