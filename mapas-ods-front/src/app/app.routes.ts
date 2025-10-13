import { Routes } from '@angular/router';
import { TelaLogin } from './pages/tela-login/tela-login';
import { Home } from './pages/home/home'
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
      path: 'login',
      title: "Tela de Login",
      component: TelaLogin
   },
   {
      path: '',
      title: "Home Mapa ODS",
      component: Home,
      pathMatch: "full"
   }
];
