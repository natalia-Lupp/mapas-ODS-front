import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-navbar-adm',
  standalone: true,
  // Certifique-se de que RouterModule está aqui para que [routerLink] funcione
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-adm.html',
  styleUrls: ['./navbar-adm.css']
})
export class NavbarAdm {

  perfilRoute: string = '/perfil-adm';
  dashboardRoute: string = '/dashboard-adm';
  saneparRoute: string = 'contas-sanepar';
  registerAccountsRoute: string = '/cadastrar-leitura-sanepar'
  infrastructureRoute: string = '/infraestrutura'
  eventRoute: string = '/eventos'
  queryDataRoute: string = '/consultar-dados'

  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  async logout() {
    await this.pbService.logout();
    this.router.navigate(['/login']);
  }

  goPerfil() {
    this.router.navigate([this.perfilRoute]);
  }

 goDashboard() {
    this.router.navigate([this.dashboardRoute]);
  }

  goSanepar() {
    this.router.navigate([this.saneparRoute]);
  }

  registerAccounts() {
    this.router.navigate([this.registerAccountsRoute]);
  }

  infrastructure() {
  this.router.navigate([this.infrastructureRoute]);
  }

  eventUTF() {
  this.router.navigate([this.eventRoute]);
  }

  queryData() {
  this.router.navigate([this.queryDataRoute]);
  }

  
}

