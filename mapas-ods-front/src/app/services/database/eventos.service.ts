import { Injectable } from "@angular/core";
import { BasicService } from "./basic.service";
import { InterfaceEvento } from "../models/evento";
import { HttpClient } from "@angular/common/http";
import { BASE_URLS } from "../conts";
import { map } from "rxjs";


@Injectable({
   providedIn: "root"
})
export class EventosService extends BasicService<InterfaceEvento> {
   constructor(http: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_EVENTOS;
      super(http, endpoint)
   }



   getEventosByIntervaloData(dataInicio: Date, dataFim: Date) {
      return this.getAll().pipe(
         map((eventos: InterfaceEvento[]) => {
            return eventos.filter(evento => {
               const dataInicioEvento: Date = new Date(evento.data_inicio);
               const dataFimEvento: Date = new Date(evento.data_fim);
               return dataInicioEvento >= dataInicio && dataFimEvento <= dataFim;
            })
         })
      )
   }


}