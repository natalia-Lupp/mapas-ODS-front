import { Routes } from '@angular/router';
import { TelaLogin } from './tela-login/tela-login'
import {Home} from './home/home'

export const routes: Routes = [
  { path: '', component: Home }, // rota inicial
  { path: 'login', component: TelaLogin }      // rota de login
];
