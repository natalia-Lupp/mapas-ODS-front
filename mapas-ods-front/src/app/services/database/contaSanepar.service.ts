import { BasicService } from "./basic.service";
import { IntarefaceContaSanepar } from "../models/contaSanepar";
import { HttpClient } from "@angular/common/http";
import { BASE_URLS } from "../conts";
import { Injectable } from "@angular/core";


@Injectable({
   providedIn: "root"
})
export class ContaSaneparService extends BasicService<IntarefaceContaSanepar> {

   constructor(http: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_CONTA_SANEPAR;
      super(http, endpoint);
   }

} 