import { Routes } from '@angular/router';
import { AppBadgeComponent } from './badge/badge.component';
import { LigneCommandeComponent } from './ligne-commande/ligne-commande.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { BonTravailListComponent } from './bon-travail/bon-travail-list.component';
import { AppReclamationComponent } from './Reclamation/Reclamation.component'; 
import { AppProduitComponent } from './produit/produit.component';
import { CommandeComponent } from './commande/commande.component';
export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {  path: 'badge',
        component: AppBadgeComponent,
      },
    
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'BonTravail',
        component: BonTravailListComponent,
      },
      {
        path: 'produit',
        component: AppProduitComponent,
      },
      {
        path: 'commande',
        component: CommandeComponent ,
      },

      {
        path: 'ligne-commande',
        component: LigneCommandeComponent,
      },
      {
        path: 'reclamation',
        component: AppReclamationComponent,
      },
    ],
  },
];
