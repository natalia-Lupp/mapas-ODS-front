import { Routes } from '@angular/router';
import { telaLoginRoutes } from './tela-login/tela-login.routes';
import { Logo } from './shared/components/logo/logo';
import { TelaLogin } from './tela-login/tela-login';

export const routes: Routes = [
   {
      path: '',
      component: TelaLogin
   }
];
