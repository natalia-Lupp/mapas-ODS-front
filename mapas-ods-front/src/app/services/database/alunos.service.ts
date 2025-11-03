import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { BASE_URLS } from '../conts';
import { InterfaceAlunosSemestres } from '../models/alunosSemestre';
import { BasicService } from './basic.service';

@Injectable({
   providedIn: "root"
})
export class AlunosServices extends BasicService<InterfaceAlunosSemestres> {

   constructor(http: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_ALUNOS_SEMESTRE;
      super(http, endpoint)
   }

   getBySemestreNome(nomeSemestre: String): Observable<InterfaceAlunosSemestres | undefined> {
      return super.getAll().pipe(
         map(items => items.find(item => item.nome_semestre === nomeSemestre))
      )
   }

   getByIntervaloData(dataInicio: Date, dataFim: Date) {
      return this.getAll().pipe(
         map((alunos: InterfaceAlunosSemestres[]) => {
            const inicio = new Date(dataInicio).getTime();
            const fim = new Date(dataFim).getTime();
            return alunos.filter(aluno => {
               const inicioSemestre = new Date(aluno.data_inicio_semestre).getTime();
               const fimSemestre = new Date(aluno.data_fim_semestre).getTime();
               return inicioSemestre >= inicio && fimSemestre <= fim;
            });
         })
      );
   }


}