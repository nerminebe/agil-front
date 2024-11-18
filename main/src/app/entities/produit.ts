import { TypeProduit } from "./TypeProduct";

export interface Produit {
    id: number;
    nom: string;
    typeProduit: string;
    prixUnitaire: number;
}