import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './shared/components/button/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Button],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mapas-ods-front');

  onButtonClick(){
    console.log("12313");
  }
}
