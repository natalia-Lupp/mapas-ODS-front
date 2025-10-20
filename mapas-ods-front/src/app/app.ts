import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdm } from './shared/components/navbar-adm/navbar-adm';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';
import { Sidenav } from './shared/components/sidenav/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Header,NavbarAdm,Sidenav,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mapas-ods-front');

  onButtonClick() {
    console.log("12313");
  }
}
