import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../entities/commande';  // Modèle Commande

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
})
export class BackComponent implements OnInit {
  commandes: Commande[] = [];  // Tableau des commandes
  error: string = '';  // Message d'erreur en cas d'échec de la requête
  isLoading: boolean = true;  // Indicateur de chargement

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.getCommandes();  // Appel à la méthode pour récupérer les commandes
  }

  // Récupérer toutes les commandes
  getCommandes(): void {
    this.commandeService.getAllCommandes().subscribe(
      (data) => {
        this.commandes = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des commandes';
        this.isLoading = false;
      }
    );
  }

  // Autres méthodes pour gérer les commandes (création, mise à jour, suppression) peuvent être ajoutées ici
}
