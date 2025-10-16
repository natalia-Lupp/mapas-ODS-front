import { Injectable } from "@angular/core";
import { BasicService } from "./basic.service";
import { InterfaceEvento } from "../models/evento";
import { HttpClient } from "@angular/common/http";
import { BASE_URLS } from "../conts";


@Injectable({
   providedIn: "root"
})
export class EventosService extends BasicService<InterfaceEvento> {
   constructor(http: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_EVENTOS;
      super(http, endpoint)
   }
}