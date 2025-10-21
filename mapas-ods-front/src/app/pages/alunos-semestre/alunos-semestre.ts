import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunosServices } from '../../services/database/alunos.service';
import { InterfaceAlunosSemestres } from '../../services/models/alunosSemestre';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alunos-semestre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alunos-semestre.html',
  styleUrls: ['./alunos-semestre.css']
})
export class AlunosSemestre implements OnInit {

  alunosSemestres: InterfaceAlunosSemestres[] = [];

  constructor(
    private router: Router, private alunosSemestreService: AlunosServices) { }

  ngOnInit(): void {
    this.getAlunosSemestres();
  }

  getAlunosSemestres(): Observable<InterfaceAlunosSemestres[]> {
    return this.alunosSemestreService.getAll();
  }
}
