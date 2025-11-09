import { Component, signal } from '@angular/core';
import { LOCALE_ID } from '@angular/core'; 
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }  // <-- meses em português
  ]
})
export class App {
  protected readonly title = signal('mapas-ods-front');
}
