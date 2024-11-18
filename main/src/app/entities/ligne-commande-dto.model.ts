// ligne-commande-dto.model.ts
export interface LigneCommandeDTO {
    id: number;
    produitId: number | null; 
    quantite: number;
    prixUnitaire: number;
    total: number;
  }
  