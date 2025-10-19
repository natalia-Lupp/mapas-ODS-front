import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements OnInit {

   ano: String = "";

  constructor(private router: Router) { }


  ngOnInit(): void {
    this.ano = this.anoAtual();
  }


  anoAtual():String{
    const data = new Date();
    return data.getFullYear().toString();
  }

}
