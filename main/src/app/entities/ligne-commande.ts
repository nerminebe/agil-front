import { Produit } from "./produit";
export interface LigneCommande {
    id: number;
    produit: Produit;
    quantite: number;
    prixUnitaire: number;
    total: number;
  }