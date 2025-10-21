import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAdm } from '../components/navbar-adm/navbar-adm';
import { Sidebar } from '../components/sidebar/sidebar';

@NgModule({
  imports: [CommonModule, NavbarAdm, Sidebar],
  exports: [NavbarAdm, Sidebar],
})
export class SharedModule {}
