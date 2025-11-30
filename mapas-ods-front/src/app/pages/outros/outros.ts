import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { OutrosService } from '../../services/database/outros.service';
import { IntefaceOutros } from '../../services/models/outros';

interface IntefaceOutrosComTotal extends IntefaceOutros {
  totalFuncionarios?: number;
}

@Component({
  selector: 'app-outros',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './outros.html',
  styleUrls: ['./outros.css']
})
export class Outros implements OnInit {

  outrosLista: IntefaceOutrosComTotal[] = [];
  totalGeralFuncionarios: number = 0; 

  constructor(
    private router: Router,
    private outrosService: OutrosService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.outrosService.getAll().subscribe({
      next: (data: IntefaceOutros[]) => {
        this.outrosLista = data.map(item => {
          const aux = Number(item.auxiliares_administrativos) || 0;
          const doc = Number(item.docentes) || 0;
          const terc = Number(item.tercerizados) || 0;
          
          const total = aux + doc + terc;
          
          return {
            ...item,
            totalFuncionarios: total
          } as IntefaceOutrosComTotal;
        });
        
        this.totalGeralFuncionarios = this.outrosLista.reduce(
          (acc, item) => acc + (item.totalFuncionarios || 0), 0
        );
      },
      error: (err) => console.error(err)
    });
  }

  cadastrar() {
    this.router.navigate(['adm/funcionarios/cadastrar-funcionarios']);
  }

  atualizar(id?: string) {
    if (!id) return;
    this.router.navigate([`adm/funcionarios/atualizar-funcionarios/${id}`]);
  }

  deletar(id?: string) {
    if (!id) return;
    
    this.outrosService.delete(id).subscribe({
      next: () => this.getAll(),
      error: (err) => console.error(err)
    });
  }
}