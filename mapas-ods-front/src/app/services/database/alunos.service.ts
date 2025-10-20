import { Injectable } from "@angular/core";
import { BasicService } from "./basic.service";
import { HttpClient } from "@angular/common/http";
import { BASE_URLS } from "../conts";
import { InterfaceAlunosSemestres } from "../models/alunosSemestre";
import { map, Observable } from "rxjs";

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
}