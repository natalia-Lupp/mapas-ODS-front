import { HttpClient } from "@angular/common/http";
import { IntefaceOutros } from "../models/outros";
import { BasicService } from "./basic.service";
import { BASE_URLS } from "../conts";
import { Injectable } from "@angular/core";
import { map, retry } from "rxjs";

@Injectable({
   providedIn: "root"
})
export class OutrosService extends BasicService<IntefaceOutros> {
   constructor(htpp: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_OUTROS;
      super(htpp, endpoint);
   }


   getByIntervaloData(dataInicio: Date, dataFim: Date) {
      return this.getAll().pipe(
         map((outros: IntefaceOutros[]) => {
            const inicio = new Date(dataInicio).getTime();
            const fim = new Date(dataFim).getTime();
            return outros.filter(outro => {
               const inicioOutro = new Date(outro.periodo_inicio).getTime();
               const fimOutro = new Date(outro.periodo_fim).getTime();

               return inicioOutro >= inicio && fimOutro <= fim;
            });
         })
      );
   }
}