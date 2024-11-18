import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../../../services/ligne-commande.service';
import { ProduitService } from '../../../services/produit.service';
import { LigneCommandeDTO } from '../../../entities/ligne-commande-dto.model';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { LigneCommande } from '../../../entities/ligne-commande';
import { Produit } from '../../../entities/produit';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ligne-commande',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './ligne-commande.component.html',
  styleUrls: ['./ligne-commande.component.scss']
})
export class LigneCommandeComponent implements OnInit {
  produits: Produit[] = [];
  lignesCommande: MatTableDataSource<LigneCommandeDTO> = new MatTableDataSource();
  ligneCommandeForm: FormGroup;
  editMode: boolean = false;
  currentLigneId: number | null = null;
  selectedProduit: Produit | null = null;

  displayedColumns: string[] = ['id', 'produit', 'quantite', 'prixTotal'];

  constructor(
    private ligneCommandeService: LigneCommandeService,
    private produitService: ProduitService,
    private fb: FormBuilder
  ) {
    this.ligneCommandeForm = this.fb.group({
      produit: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      prixTotal: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadLigneCommandes();
    this.produitService.getAllProducts().subscribe((data: Produit[]) => {
      this.produits = data;
    });
  }

  loadLigneCommandes(): void {
    this.ligneCommandeService.getLigneCommandes(1).subscribe(
      (data: LigneCommandeDTO[]) => {
        this.lignesCommande.data = data;
      },
      (error) => console.error('Erreur lors du chargement des lignes de commande', error)
    );
  }

  onProductChange(produitId: number): void {
    this.selectedProduit = this.produits.find(p => p.id === produitId) || null;
    this.calculatePrixTotal();
  }

  calculatePrixTotal(): void {
    if (this.selectedProduit && this.ligneCommandeForm.value.quantite) {
      const quantite = this.ligneCommandeForm.value.quantite;
      const prixTotal = this.selectedProduit.prixUnitaire * quantite;
      this.ligneCommandeForm.patchValue({ prixTotal });
    }
  }

  onSubmit(): void {
    if (this.ligneCommandeForm.valid) {
      const ligneCommande = this.ligneCommandeForm.value;
      if (this.editMode) {
        this.updateLigneCommande(this.currentLigneId!, ligneCommande);
      } else {
        this.createLigneCommande(ligneCommande);
      }
    }
  }

  createLigneCommande(ligneCommande: LigneCommande): void {
    this.ligneCommandeService.createLigneCommande(ligneCommande).subscribe(
      (data) => {
        this.lignesCommande.data = [...this.lignesCommande.data, data];
        this.ligneCommandeForm.reset();
        this.selectedProduit = null;
      },
      (error) => console.error('Erreur lors de la création de la ligne de commande', error)
    );
  }

  updateLigneCommande(id: number, ligneCommande: LigneCommande): void {
    this.ligneCommandeService.updateLigneCommande(id, ligneCommande).subscribe(
      (data) => {
        const index = this.lignesCommande.data.findIndex((l) => l.id === id);
        if (index !== -1) {
          this.lignesCommande.data[index] = data;
        }
        this.editMode = false;
        this.currentLigneId = null;
        this.ligneCommandeForm.reset();
        this.selectedProduit = null;
      },
      (error) => console.error('Erreur lors de la mise à jour de la ligne de commande', error)
    );
  }

  cancelEdit(): void {
    this.editMode = false;
    this.ligneCommandeForm.reset();
    this.selectedProduit = null;
  }
}
