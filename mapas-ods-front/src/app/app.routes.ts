import { Routes } from '@angular/router';
import { TelaLogin } from './pages/tela-login/tela-login';
import { Home } from './pages/home/home'
import { ContasSanepar } from './pages/contaSanepar/contas-sanepar/contas-sanepar';
import { FormContaSanepar } from './pages/contaSanepar/form-conta-sanepar/form-conta-sanepar';
import { Eventos } from './pages/eventos/eventos';
import { FormEventos } from './pages/eventos/form-eventos/form-eventos';

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
   },{
      path:"eventos",
      title:"Eventos",
      component:Eventos
   },
  {
      path: 'login',
      title: "Tela de Login",
      component: TelaLogin
   },
   {
      path:"gerenciar-evento/:id",
      title:"Gerenciar Evento",
      component:FormEventos
   },
   {
      path: 'xxxxxx',
      title: "Home Mapa ODS",
      component: Eventos,
      pathMatch: "full"
   }
];
