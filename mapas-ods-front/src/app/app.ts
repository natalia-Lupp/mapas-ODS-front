import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdm } from './shared/components/navbar-adm/navbar-adm';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarAdm,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mapas-ods-front');

  onButtonClick() {
    console.log("12313");
  }
}
