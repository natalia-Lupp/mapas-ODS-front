import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdm } from './pages/navbar-adm/navbar-adm';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarAdm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mapas-ods-front');

  onButtonClick() {
    console.log("12313");
  }
}
