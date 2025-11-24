import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { OutrosService } from '../../services/database/outros.service';
import { IntefaceOutros } from '../../services/models/outros';

@Component({
  selector: 'app-outros',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './outros.html',
  styleUrls: ['./outros.css']
})
export class Outros implements OnInit {

  outrosLista: IntefaceOutros[] = [];

  constructor(
    private router: Router,
    private outrosService: OutrosService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.outrosService.getAll().subscribe({
      next: (data) => {
        this.outrosLista = data;
      },
      error: (err) => console.error(err)
    });
  }

  cadastrar() {
    this.router.navigate(['cadastrar-outro']);
  }

  atualizar(id?: string) {
    if (!id) return;
    this.router.navigate([`outros/${id}`]);
  }

  deletar(id?: string) {
    if (!id) return;
    
    this.outrosService.delete(id).subscribe({
      next: () => this.getAll(),
      error: (err) => console.error(err)
    });
  }
}
