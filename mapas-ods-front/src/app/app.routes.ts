import { Routes } from '@angular/router';

import { AlunosSemestre } from './pages/alunos-semestre/alunos-semestre';
import { FormAlunosSemestre } from './pages/alunos-semestre/form-alunos-semestre/form-alunos-semestre';
import { CalculadoraNakagawa } from './pages/calculadora-nakagawa/calculadora-nakagawa';
import { DashboardNakagawa } from './pages/calculadora-nakagawa/dashboard-nakagawa/dashboard-nakagawa';
import { ContasSanepar } from './pages/contaSanepar/contas-sanepar/contas-sanepar';
import { FormContaSanepar } from './pages/contaSanepar/form-conta-sanepar/form-conta-sanepar';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardUser } from './pages/dashboard-user/dashboard-user';
import { Eventos } from './pages/eventos/eventos';
import { FormEventos } from './pages/eventos/form-eventos/form-eventos';
import { Home } from './pages/home/home';
import { Infraestrutura } from './pages/infraestrutura/infraestrutura';
import { FormOutros } from './pages/outros/form-outros/form-outros';
import { Outros } from './pages/outros/outros';
import { PerfilUser } from './pages/perfil-user/perfil-user';
import { Perfil } from './pages/perfil/perfil';
import { TelaLogin } from './pages/tela-login/tela-login';
import { ConsultarDados } from './pages/consultar-dados/consultar-dados';
import { ListaMetricas } from './pages/lista-metricas/lista-metricas';

export const routes: Routes = [


   // Página inicial
   {
      path: '',
      title: 'Home Mapa ODS',
      component: ListaMetricas,
      pathMatch: 'full'
   },
   {
      path: 'consultar-dados',
      title: "Consultar Dados",
      component: ConsultarDados
   },

   // Login
   {
      path: 'login',
      title: 'Tela de Login',
      component: TelaLogin
   },

   // Dashboards
   {
      path: 'dashboard-adm',
      title: 'Dashboard Administrador',
      component: DashboardAdmin
   },
   {
      path: 'dashboard-user',
      title: 'Dashboard Usuário',
      component: DashboardUser
   },

   // Perfis
   {
      path: 'perfil-adm',
      title: 'Perfil Administrador',
      component: Perfil
   },
   {
      path: 'perfil-user',
      title: 'Perfil Usuário',
      component: PerfilUser
   },

   // Contas Sanepar
   {
      path: 'contas-sanepar',
      title: 'Contas Sanepar',
      component: ContasSanepar,
      pathMatch: 'full'
   },
   {
      path: 'cadastrar-leitura-sanepar',
      title: 'Cadastrar Leitura Sanepar',
      component: FormContaSanepar
   },
   {
      path: 'atualizar-leitura-sanepar/:id',
      title: 'Atualizar Leitura Sanepar',
      component: FormContaSanepar
   },

   // Eventos
   {
      path: 'eventos',
      title: 'Eventos',
      component: Eventos
   },
   {
      path: 'cadastrar-evento',
      title: 'Cadastrar Evento',
      component: FormEventos
   },
   {
      path: 'gerenciar-evento/:id',
      title: 'Gerenciar Evento',
      component: FormEventos
   },

   // Outros
   {
      path: 'outros',
      title: 'Outros',
      component: Outros
   },
   {
      path: 'cadastrar-outro',
      title: 'Cadastrar Outro',
      component: FormOutros
   },
   {
      path: 'atualizar-outro/:id',
      title: 'Atualizar Outro',
      component: FormOutros
   },

   // Alunos Semestre
   {
      path: 'alunos-semestre',
      title: 'Alunos por Semestre',
      component: AlunosSemestre
   },
   {
      path: 'cadastrar-aluno-semestre',
      title: 'Cadastrar Aluno Semestre',
      component: FormAlunosSemestre
   },
   {
      path: 'atualizar-aluno-semestre/:id',
      title: 'Atualizar Aluno Semestre',
      component: FormAlunosSemestre
   },

   // Calculadora Nakagawa
   {
      path: 'calculadora-nakagawa',
      title: 'Calculadora Nakagawa',
      component: CalculadoraNakagawa
   },
   {
      path: 'dashboard-nakagawa/:id',
      title: 'Dashboard Nakagawa',
      component: DashboardNakagawa
   },

   // Infraestrutura
   {
      path: 'infraestrutura',
      title: 'Infraestrutura',
      component: Infraestrutura
   },

   // Rota curinga (404)
   {
      path: '**',
      redirectTo: ''
   },
   {
      path:"listagem-metricas",
      component:ListaMetricas
   }
];
