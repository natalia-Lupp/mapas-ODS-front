import { Component } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo'
import { Button } from '../../shared/components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Logo, Button],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private router: Router) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }

}