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

  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  async logout() {
    await this.pbService.logout();
    this.router.navigate(['/login']);
  }

 

  
}

