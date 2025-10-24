import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BasicService } from "./basic.service";
import { IntarefaceContaSanepar } from "../models/contaSanepar";
import { BASE_URLS } from "../conts";

@Injectable({
   providedIn: "root"
})
export class ContaSaneparService extends BasicService<IntarefaceContaSanepar> {

   constructor(http: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_CONTA_SANEPAR;
      super(http, endpoint);
   }

   getContasByIntervaloData(dataInicio: Date, dataFim: Date): Observable<IntarefaceContaSanepar[]> {
      return this.getAll().pipe(
         map((contas: IntarefaceContaSanepar[]) => {
            return contas.filter(conta => {
               const mes = new Date(conta.mes);
               return mes >= dataInicio && mes <= dataFim;
            });
         })
      );
   }
}
