import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntefaceOutros } from '../../services/models/outros';
import { OutrosService } from '../../services/database/outros.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-outros',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './outros.html',
  styleUrl: './outros.css'
})
export class Outros implements OnInit {

  outrosLista: IntefaceOutros[] = [];

  constructor(private router: Router, private outrosService: OutrosService) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.outrosService.getAll().subscribe({
      next: (data) => {
        this.outrosLista = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  cadastrar() {

  }

  atualizar(id?: string) {

  }

  deletar(id: string) {

  }

}
