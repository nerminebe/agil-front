export interface Reclamation {
    id: number;
    gerant: {
      id: number;
      name: string;
    };
    type: string;  // Correspond à TypeReclamation (ex: Commercial, Technique, etc.)
    categorieReclamation: string;  // Correspond à CategorieReclamation
    status: string;  // Correspond à StatusReclamation (ex: 'confirmed', 'cancelled', 'rejected')
    traiteeLe: Date;
    nonValideeLe: Date;
    clotureeLe: Date;
    description: string;
    dateReclamation: Date;
    dateResolution: Date;
    observation: string;
  }
  