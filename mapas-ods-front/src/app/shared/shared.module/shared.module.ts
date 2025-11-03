import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAdm } from '../components/navbar-adm/navbar-adm';
import { Sidebar } from '../components/sidebar/sidebar';
import { NavbarUser } from '../components/navbar-user/navbar-user';
import { SidebarUSer } from '../components/sidebar-user/sidebar-user';

@NgModule({
  imports: [CommonModule, NavbarAdm, Sidebar, NavbarUser, SidebarUSer ],
  exports: [NavbarAdm, Sidebar, NavbarUser, SidebarUSer],
})
export class SharedModule {}
