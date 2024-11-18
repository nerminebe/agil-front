import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
    accessRoles: ["ROLE_ADMINISTRATEUR"],
  },
  {
    navCap: 'UI Components',
  },
  {
    displayName: 'Ligne_Commande',
    iconName: 'info-circle',
    route: '/ui-components/ligne-commande',
    accessRoles: ["ROLE_ADMINISTRATEUR"],

  },
  {
    displayName: 'Produit_Station',
    iconName: 'list-details',
    route: '/ui-components/lists',
    accessRoles: ["ROLE_ADMINISTRATEUR"],

  },
  {
    displayName: 'Station',
    iconName: 'file-text',
    route: '/ui-components/menu',
    accessRoles: ["ROLE_ADMINISTRATEUR"],

  },
  {
    displayName: 'Depot',
    iconName: 'file-text-ai',
    route: '/ui-components/tooltips',
    accessRoles: ["ROLE_ADMINISTRATEUR"],

  },
  {
    displayName: 'Bon de travail',
    iconName: 'clipboard-text',
    route: '/ui-components/BonTravail',
    accessRoles: [],
  },
  {
    displayName: 'Reclamation',
    iconName: 'bell-exclamation',
    route: '/ui-components/reclamation',
    accessRoles: ["ROLE_ADMINISTRATEUR",]

  },
  {
    displayName: 'Produit',
    iconName: 'brand-producthunt',
    route: '/ui-components/produit',
    accessRoles: [],
  },
  {
    displayName: 'Commande',
    iconName: 'command',
    route: '/ui-components/commande',
    accessRoles: [],
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication/login',
    accessRoles: [],
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
    accessRoles: [],
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
    accessRoles: [],
  },
  {
    displayName: 'Sample Page',
    iconName: 'brand-dribbble',
    route: '/extra/sample-page',
    accessRoles: [],
  },
];
