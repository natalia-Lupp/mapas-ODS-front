import { Routes } from '@angular/router';

// 🚨 Importação do AuthGuard (Assumindo que você o criou em './guards/auth.guard')
import { AuthGuard } from './guards/auth.guard'; 

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
      component: DashboardAdmin,
      canActivate: [AuthGuard] 
   },
   {
      path: 'user/dashboard-user',
      title: 'Dashboard Usuário',
      component: DashboardUser,
      canActivate: [AuthGuard] 
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
      pathMatch: 'full',
      canActivate: [AuthGuard] 
   },
   {
      path: 'adm/contas-sanepar/cadastrar-leitura-sanepar',
      title: 'Cadastrar Leitura Sanepar',
      component: FormContaSanepar,
      canActivate: [AuthGuard] 
   },
   {
      path: 'adm/contas-sanepar/atualizar-leitura-sanepar/:id',
      title: 'Atualizar Leitura Sanepar',
      component: FormContaSanepar,
      canActivate: [AuthGuard] 
   },

   // Eventos
   {
      path: 'adm/eventos',
      title: 'Eventos',
      component: Eventos,
      canActivate: [AuthGuard] 
   },
   {
      path: 'adm/eventos/cadastrar-evento',
      title: 'Cadastrar Evento',
      component: FormEventos,
      canActivate: [AuthGuard] 
   },
   {
      path: 'adm/eventos/gerenciar-evento/:id',
      title: 'Gerenciar Evento',
      component: FormEventos,
      canActivate: [AuthGuard] 
   },

   // funcionarios
   {
      path: 'adm/funcionarios',
      title: 'Funcionarios',
      component: Outros,
      canActivate: [AuthGuard] 
   },
   {
      path: 'adm/funcionarios/cadastrar-funcionarios',
      title: 'Cadastrar Funcionários',
      component: FormOutros,
      canActivate: [AuthGuard]
   },
   {
      path: 'adm/funcionarios/atualizar-funcionarios/:id',
      title: 'Atualizar Funcionários',
      component: FormOutros,
      canActivate: [AuthGuard]
   },

   // Alunos Semestre
   {
      path: 'adm/alunos-semestre',
      title: 'Alunos por Semestre',
      component: AlunosSemestre,
      canActivate: [AuthGuard]
   },
   {
      path: 'adm/alunos-semestre/cadastrar-aluno-semestre',
      title: 'Cadastrar Aluno Semestre',
      component: FormAlunosSemestre,
      canActivate: [AuthGuard]
   },
   {
      path: 'adm/alunos-semestre/atualizar-aluno-semestre/:id',
      title: 'Atualizar Aluno Semestre',
      component: FormAlunosSemestre,
      canActivate: [AuthGuard]
   },

   // Calculadora Nakagawa
    {
      path:"adm/calculadora-nakagawa/listagem-metricas",
       title: 'lista de metricas',
      component:ListaMetricas,
      canActivate: [AuthGuard]
   },

   {
      path: 'adm/calculadora-nakagawa/filtro',
      title: 'Calculadora Nakagawa',
      component: CalculadoraNakagawa,
      canActivate: [AuthGuard] 
   },
   {
      path: 'adm/calculadora-nakagawa/dashboard-nakagawa/:id',
      title: 'Dashboard Nakagawa',
      component: DashboardNakagawa,
      canActivate: [AuthGuard]
   },

   // Infraestrutura
   {
      path: 'adm/infraestrutura',
      title: 'Infraestrutura',
      component: Infraestrutura,
      canActivate: [AuthGuard] 
   },

   // Rota curinga (404)
   {
     path: '**',
   redirectTo: '/',
   pathMatch: 'full'
   }
];