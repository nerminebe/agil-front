import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Produit } from 'src/app/entities/produit';
import { TypeProduit } from 'src/app/entities/TypeProduct';
import { ProduitService } from 'src/app/services/produit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produit',
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
  ],
  templateUrl: './produit.component.html'
})
export class AppProduitComponent implements OnInit {
  produits: Produit[] = [];
  newProduit: Produit = { id: 0, nom: '', typeProduit: TypeProduit.CARBURANT, prixUnitaire: 0 };

  // Add a property to hold enum values
  typeProduitEnum = TypeProduit;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    // this.loadProduits();
  }

  /* loadProduits(): void {
    this.produitService.getProduits().subscribe((data: Produit[]) => {
      this.produits = data;
    });
  } */

  addProduit(): void {
    this.produitService.createProduct(this.newProduit).subscribe((produit) => {
      this.produits.push(produit);
      // Reset the form correctly
      this.newProduit = { id: 0, nom: '', typeProduit: TypeProduit.CARBURANT, prixUnitaire: 0 }; // Reset form with valid enum value
    });
  }
}
