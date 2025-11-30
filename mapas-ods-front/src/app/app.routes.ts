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
      component: Home,
      pathMatch: 'full'
   },
     // Login
   {
      path: 'login',
      title: 'Tela de Login',
      component: TelaLogin
   },

   // Dashboards
   {
      path: 'adm/dashboard-adm',
      title: 'Dashboard Administrador',
      component: DashboardAdmin
   },
   {
      path: 'user/dashboard-user',
      title: 'Dashboard Usuário',
      component: DashboardUser
   },

   // Consultar Dados temporarimamente desativado por calculos estarem sendo feitos pela calculadora
/*
    {
      path: 'adm/consultar-dados',
      title: "Consultar Dados",
      component: ConsultarDados
   },
   */

   // Perfis temporariamente desativados para implementação futura
   /*
   {
      path: 'adm/perfil-adm',
      title: 'Perfil Administrador',
      component: Perfil
   },
   {
      path: 'adm/perfil-user',
      title: 'Perfil Usuário',
      component: PerfilUser
   },
   */ 

   // Contas Sanepar
   {
      path: 'adm/contas-sanepar',
      title: 'Contas Sanepar',
      component: ContasSanepar,
      pathMatch: 'full'
   },
   {
      path: 'adm/contas-sanepar/cadastrar-leitura-sanepar',
      title: 'Cadastrar Leitura Sanepar',
      component: FormContaSanepar
   },
   {
      path: 'adm/contas-sanepar/atualizar-leitura-sanepar/:id',
      title: 'Atualizar Leitura Sanepar',
      component: FormContaSanepar
   },

   // Eventos
   {
      path: 'adm/eventos',
      title: 'Eventos',
      component: Eventos
   },
   {
      path: 'adm/eventos/cadastrar-evento',
      title: 'Cadastrar Evento',
      component: FormEventos
   },
   {
      path: 'adm/eventos/gerenciar-evento/:id',
      title: 'Gerenciar Evento',
      component: FormEventos
   },

   // funcionarios
   {
      path: 'adm/funcionarios',
      title: 'Funcionarios',
      component: Outros
   },
   {
      path: 'adm/funcionarios/cadastrar-funcionarios',
      title: 'Cadastrar Funcionários',
      component: FormOutros
   },
   {
      path: 'adm/funcionarios/atualizar-funcionarios/:id',
      title: 'Atualizar Funcionários',
      component: FormOutros
   },

   // Alunos Semestre
   {
      path: 'adm/alunos-semestre',
      title: 'Alunos por Semestre',
      component: AlunosSemestre
   },
   {
      path: 'adm/alunos-semestre/cadastrar-aluno-semestre',
      title: 'Cadastrar Aluno Semestre',
      component: FormAlunosSemestre
   },
   {
      path: 'adm/alunos-semestre/atualizar-aluno-semestre/:id',
      title: 'Atualizar Aluno Semestre',
      component: FormAlunosSemestre
   },

   // Calculadora Nakagawa
    {
      path:"adm/calculadora-nakagawa/listagem-metricas",
       title: 'lista de metricas',
      component:ListaMetricas
   },

   {
      path: 'adm/calculadora-nakagawa/filtro',
      title: 'Calculadora Nakagawa',
      component: CalculadoraNakagawa
   },
   {
      path: 'adm/calculadora-nakagawa/dashboard-nakagawa/:id',
      title: 'Dashboard Nakagawa',
      component: DashboardNakagawa
   },

   // Infraestrutura
   {
      path: 'adm/infraestrutura',
      title: 'Infraestrutura',
      component: Infraestrutura
   },

   // Rota curinga (404)
   {
      path: '**',
      redirectTo: ''
   }
];
