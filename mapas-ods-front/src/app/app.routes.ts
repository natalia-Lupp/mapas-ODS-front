import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TelaLogin } from './pages/tela-login/tela-login';
import { Home } from './pages/home/home'
import { ContasSanepar } from './pages/contaSanepar/contas-sanepar/contas-sanepar';
import { FormContaSanepar } from './pages/contaSanepar/form-conta-sanepar/form-conta-sanepar';
import { NavbarAdm } from './pages/navbar-adm/navbar-adm';

export const routes: Routes = [
   {
      path: 'navbar-adm',
      title: "navbar com rota temporaria",
      component: NavbarAdm

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
