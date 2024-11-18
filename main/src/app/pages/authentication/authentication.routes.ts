// app/pages/authentication/authentication.routes.ts
import { Routes } from '@angular/router';
import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'login',
    component: AppSideLoginComponent,
  },
  {
    path: 'register',
    component: AppSideRegisterComponent,
  },
];
