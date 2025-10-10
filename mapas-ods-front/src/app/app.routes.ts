import { Routes } from '@angular/router';
import { telaLoginRoutes } from './pages/tela-login/tela-login.routes';
import { Logo } from './shared/components/logo/logo';
import { TelaLogin } from './pages/tela-login/tela-login';
import { ContasSanepar } from './pages/contaSanepar/contas-sanepar/contas-sanepar';
import { FormContaSanepar } from './pages/contaSanepar/form-conta-sanepar/form-conta-sanepar';

export const routes: Routes = [
   {
      path: 'contas-sanepar',
      title: "Contas Sanepar",
      component: ContasSanepar
   },
   {
      path: 'cadastrar-leitura-sanepar',
      title: "Cadastrar Leitura Sanepar",
      component: FormContaSanepar
   },
   {
      path: 'atualizar-leitura-sanepar/:id',
      title: "Atualizar Leitura Sanpear",
      component:FormContaSanepar
   },
   {
      path: '',
      title: "Home Mapa ODS",
      component: TelaLogin,
      pathMatch: "full"
   }
];
