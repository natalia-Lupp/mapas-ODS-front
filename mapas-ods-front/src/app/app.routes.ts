import { Routes } from '@angular/router';

import { ContasSanepar } from './pages/contaSanepar/contas-sanepar/contas-sanepar';
import { FormContaSanepar } from './pages/contaSanepar/form-conta-sanepar/form-conta-sanepar';
import { Eventos } from './pages/eventos/eventos';
import { FormEventos } from './pages/eventos/form-eventos/form-eventos';
import { Home } from './pages/home/home';
import { TelaLogin } from './pages/tela-login/tela-login';
import { Infraestrutura } from './pages/infraestrutura/infraestrutura';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { Perfil } from './pages/perfil/perfil';
import { PerfilUser } from './pages/perfil-user/perfil-user';


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
      path: 'dashbord-adm',
      title: "Dashbord administrador",
      component: DashboardAdmin

   },

   {
      path: 'perfil-adm',
      title: "Perfil administrador",
      component: Perfil

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
   },
   {
      path: "eventos",
      title: "Eventos",
      component: Eventos
   },
   
   {
      path: "gerenciar-evento/:id",
      title: "Gerenciar Evento",
      component: FormEventos
   },

   {
      path: 'dashbord-user',
      title: "Dashbord usuario",
      component: DashboardUser

   },

   {
      path: 'perfil-user',
      title: "Perfil Usuario",
      component: PerfilUser

   },
];
