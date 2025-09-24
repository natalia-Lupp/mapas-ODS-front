import { Component } from '@angular/core';
import { Logo } from '../shared/components/logo/logo';
import { Button } from '../shared/components/button/button';

@Component({
  selector: 'app-home',
  imports: [Logo, Button],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
