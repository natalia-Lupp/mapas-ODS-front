import { Routes } from '@angular/router';

import { ContasSanepar } from './pages/contaSanepar/contas-sanepar/contas-sanepar';
import { FormContaSanepar } from './pages/contaSanepar/form-conta-sanepar/form-conta-sanepar';
import { Eventos } from './pages/eventos/eventos';
import { FormEventos } from './pages/eventos/form-eventos/form-eventos';
import { Home } from './pages/home/home';
import { NavbarAdm } from './shared/components/navbar-adm/navbar-adm';
import { TelaLogin } from './pages/tela-login/tela-login';
import { Infraestrutura } from './pages/infraestrutura/infraestrutura';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';

export const routes: Routes = [
    {
      path: '',
      title: "Home Mapa ODS",
      component: Infraestrutura,
      pathMatch: "full"
   },
   {
      path: 'login',
      title: "Tela de Login",
      component: TelaLogin
   },
   {
      path: 'navbar-adm',
      title: "navbar com rota temporaria",
      component: NavbarAdm

   },
     {
      path: 'sidebar-adm',
      title: "sidebar com rota temporaria",
      component: Sidebar
   },
      {
      path: 'dashbord-adm',
      title: "Dashbord administrador",
      component: DashboardAdmin

   },
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
      component: FormContaSanepar
   }, {
      path: "eventos",
      title: "Eventos",
      component: Eventos
   },
   
   {
      path: "gerenciar-evento/:id",
      title: "Gerenciar Evento",
      component: FormEventos
   }  
];
