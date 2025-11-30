import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    if (this.pbService.isAuthenticated()) {
      return true;
    } else {
      // Redireciona para a página de login se não estiver autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}