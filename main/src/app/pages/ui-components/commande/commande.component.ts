import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../entities/commande';
import { EtatCommande } from 'src/app/entities/Etatcommande'; 
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande',
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
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  isEditMode: boolean = false;
  commande: Commande = {
    id: 0, 
    montant: 0,
    etat: EtatCommande.Pending, // corrected from 'status' to 'etat'
    date: new Date().toISOString(), // corrected from 'dateLivraison' to 'date'
    nomDuChauffeur: '',
    tel: '',
    referenceCommande: ''
  };

  statusOptions = Object.values(EtatCommande);
  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService, private router: Router) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getAllCommandes().subscribe((data: Commande[]) => {
      this.commandes = data;
    });
  }

  saveCommande(): void {
    if (this.isEditMode) {
      this.commandeService.updateCommande(this.commande.id, this.commande).subscribe(() => {
        this.router.navigate(['/commandes']);
      });
    } else {
      this.commandeService.createCommande(this.commande).subscribe(() => {
        this.router.navigate(['/commandes']);
      });
    }
  }

  deleteCommande(id: number): void {
    if (confirm('Are you sure you want to delete this commande?')) {
      this.commandeService.deleteCommande(id).subscribe(() => {
        this.loadCommandes();
      });
    }
  }

  loadCommandeForEdit(id: number): void {
    this.isEditMode = true;
    this.commandeService.getCommandeById(id).subscribe((data: Commande) => {
      this.commande = { ...data, date: new Date(data.date).toISOString() }; // corrected from 'dateLivraison'
    });
  }
}
