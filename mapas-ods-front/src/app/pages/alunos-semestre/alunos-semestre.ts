import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunosServices } from '../../services/database/alunos.service';
import { InterfaceAlunosSemestres } from '../../services/models/alunosSemestre';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alunos-semestre',
  imports: [],
  standalone: true,
  templateUrl: './alunos-semestre.html',
  styleUrl: './alunos-semestre.css'
})
export class AlunosSemestre implements OnInit {

  alunosSemestres: InterfaceAlunosSemestres[] = [];

  constructor(private router: Router, private alunosService: AlunosServices) {

  }

  ngOnInit(): void {
    this.getAllAlunosSemestres();
  }

  getAllAlunosSemestres() {
    return this.alunosService.getAll().subscribe({
      next: (data) => {
        this.alunosSemestres = data;
      },
      error: (err) => {
        console.error({ ERRO_GET_ALL_ALUNOS_SEMESTRE: err })
      }
    })
  }
}
