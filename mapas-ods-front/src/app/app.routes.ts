import { Routes } from '@angular/router';
import { telaLoginRoutes } from './pages/tela-login/tela-login.routes';
import { Logo } from './shared/components/logo/logo';
import { TelaLogin } from './pages/tela-login/tela-login';
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
      path:"",
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
