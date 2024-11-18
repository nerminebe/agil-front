import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneCommandeDTO } from '../entities/ligne-commande-dto.model';
import { LigneCommande } from '../entities/ligne-commande'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private apiUrl = 'http://localhost:8080/api/ligne-commandes'; 

  constructor(private http: HttpClient) {}

  // Method to get all lignes de commande by commandeId
  getLigneCommandes(commandeId: number): Observable<LigneCommandeDTO[]> {
    return this.http.get<LigneCommande[]>(`${this.apiUrl}/commande/${commandeId}`).pipe(
      map(lignes => lignes.map(ligne => this.mapToDTO(ligne))) // Map the entities to DTOs
    );
  }

  // Method to get a single ligne de commande by ID
  getLigneCommandeById(id: number): Observable<LigneCommandeDTO> {
    return this.http.get<LigneCommande>(`${this.apiUrl}/${id}`).pipe(
      map(ligne => this.mapToDTO(ligne)) // Map the entity to DTO
    );
  }

  // Method to create a new ligne de commande
  createLigneCommande(ligneCommande: LigneCommande): Observable<LigneCommandeDTO> {
    return this.http.post<LigneCommande>(this.apiUrl, ligneCommande).pipe(
      map(ligne => this.mapToDTO(ligne)) // Map the entity to DTO
    );
  }

  // Method to update an existing ligne de commande
  updateLigneCommande(id: number, ligneCommande: LigneCommande): Observable<LigneCommandeDTO> {
    return this.http.put<LigneCommande>(`${this.apiUrl}/${id}`, ligneCommande).pipe(
      map(ligne => this.mapToDTO(ligne)) // Map the entity to DTO
    );
  }

  // Method to delete a ligne de commande
  deleteLigneCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Method to map a LigneCommande entity to a LigneCommandeDTO
  private mapToDTO(ligne: LigneCommande): LigneCommandeDTO {
    return {
      id: ligne.id,
      produitId: ligne.produit ? ligne.produit.id : null, // Ensure produit has an 'id' field
      quantite: ligne.quantite,
      prixUnitaire: ligne.prixUnitaire, // Use the correct property
      total: ligne.total, // Use total instead of prixTotal
    };
  }
}
