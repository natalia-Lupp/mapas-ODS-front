import { Routes } from '@angular/router';

import { ContasSanepar } from './pages/contaSanepar/contas-sanepar/contas-sanepar';
import { FormContaSanepar } from './pages/contaSanepar/form-conta-sanepar/form-conta-sanepar';
import { Eventos } from './pages/eventos/eventos';
import { FormEventos } from './pages/eventos/form-eventos/form-eventos';
import { Home } from './pages/home/home';
import { NavbarAdm } from './shared/components/navbar-adm/navbar-adm';
import { TelaLogin } from './pages/tela-login/tela-login';
import { Infraestrutura } from './pages/infraestrutura/infraestrutura';
import { FormAlunosSemestre } from './pages/alunos-semestre/form-alunos-semestre/form-alunos-semestre';
import { AlunosSemestre } from './pages/alunos-semestre/alunos-semestre';
import { Outros } from './pages/outros/outros';
import { FormOutros } from './pages/outros/form-outros/form-outros';

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
      component: FormContaSanepar
   }, {
      path: "eventos",
      title: "Eventos",
      component: Eventos
   },
   {
      path: 'login',
      title: "Tela de Login",
      component: TelaLogin
   },
   {
      path: "gerenciar-evento/:id",
      title: "Gerenciar Evento",
      component: FormEventos
   },
   {
      path: '',
      title: "Home Mapa ODS",
      component: Home,
      pathMatch: "full"
   },
   {
      path: 'alunos-semestre',
      title: "Alunos Semestre",
      component: AlunosSemestre,
   },
   {
      path: "form-alunos-semestre/:id",
      title: "Gerenciar Alunos Semestre",
      component: FormAlunosSemestre
   },
   {
      path: "form-alunos-semestre",
      title: " Gerenciar Alunos Semestre",
      component: FormAlunosSemestre
   },
   {
      path: 'outros',
      title: "Outros",
      component: Outros
   },
   {
      path: 'cadastrar-outros',
      title: "Cadastrar Outros ",
      component: FormOutros
   },
   {
      path: 'outros/:id',
      title: "Gerenciar Outros",
      component: FormOutros
   }
];
