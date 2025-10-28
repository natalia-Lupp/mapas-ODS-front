import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-user.html',
  styleUrls: ['./navbar-user.css']
})
export class NavbarUser {}
