import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-adm',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-adm.html',
  styleUrls: ['./navbar-adm.css']
})
export class NavbarAdm {}
