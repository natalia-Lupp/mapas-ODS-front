import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-adm',
  imports: [CommonModule, RouterModule], // router link colocado por ser um item padrão
  templateUrl: './navbar-adm.html',
  styleUrl: './navbar-adm.css'
})
export class NavbarAdm {

}
