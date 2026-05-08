import { Metier } from "@/lib/types";

export const metiers: Metier[] = [

  // Second œuvre
  { id: "plomberie", nom: "Plomberie", categorie: "second-oeuvre" },
  { id: "electricite", nom: "Électricité", categorie: "second-oeuvre" },
  { id: "plaquiste", nom: "Plaquiste", categorie: "second-oeuvre" },
  { id: "peinture", nom: "Peinture", categorie: "second-oeuvre" },
  { id: "carrelage", nom: "Carrelage", categorie: "second-oeuvre" },
  { id: "climatisation", nom: "Climatisation", categorie: "second-oeuvre" },
  { id: "fenetre", nom: "Fenêtre", categorie: "second-oeuvre" },
  { id: "etancheite", nom: "Étanchéité", categorie: "second-oeuvre" },
  { id: "isolation", nom: "Isolation", categorie: "second-oeuvre" },
  { id: "soudeur", nom: "Soudeur", categorie: "second-oeuvre" },
  { id: "manutentionnaire", nom: "Manutentionnaire", categorie: "second-oeuvre" },
  { id: "platrerie", nom: "Plâtrerie", categorie: "second-oeuvre" },
  { id: "menuiserie porte", nom: "Menuiserie Porte", categorie: "second-oeuvre" },
  { id: "cuisiniste", nom: "Cuisiniste", categorie: "second-oeuvre" },
  { id: "marbre", nom: "Marbre", categorie: "second-oeuvre" },

  // Gros œuvre
  { id: "maconnerie", nom: "Maçonnerie", categorie: "gros-oeuvre" },
  { id: "ferraillage", nom: "Ferraillage", categorie: "gros-oeuvre" },
  { id: "coffrage", nom: "Coffrage", categorie: "gros-oeuvre" },
  { id: "beton", nom: "Béton", categorie: "gros-oeuvre" },
  { id: "fondations", nom: "Fondations", categorie: "gros-oeuvre" },
  { id: "charpente", nom: "Charpente", categorie: "gros-oeuvre" },
  { id: "couverture", nom: "Couverture / Toiture", categorie: "gros-oeuvre" },

  // Autres
  { id: "architecte", nom: "Architecte", categorie: "autres" },
  { id: "bureau-etudes", nom: "Bureau d'études", categorie: "autres" },
  { id: "geometre", nom: "Géomètre", categorie: "autres" },
  { id: "fournisseur", nom: "Fournisseur matériaux", categorie: "autres" },
  { id: "transporteur", nom: "Transporteur", categorie: "autres" },

  //Fournisseurs
  { id: "fournisseur-bois", nom: "Fournisseur Bois", categorie: "autres" },
  { id: "fournisseur-carrelage", nom: "Fournisseur Carrelage", categorie: "autres" },
  { id: "fournisseur-peinture", nom: "Fournisseur Peinture", categorie: "autres" },
  { id: "fournisseur-placo", nom: "Fournisseur Placo", categorie: "autres" },

];

export const categorieLabels: Record<string, string> = {
  "gros-oeuvre": "Gros œuvre",
  "second-oeuvre": "Second œuvre",
  "autres": "Autres",
};
