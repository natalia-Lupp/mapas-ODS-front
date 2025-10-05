import { BasicService } from "./basic.service";
import { ContaSanepar } from "../models/contaSanepar";
import { HttpClient } from "@angular/common/http";
import { BASE_URLS } from "../conts";

export class ContaSaneparService extends BasicService<ContaSanepar> {

   constructor(http: HttpClient) {

      super(http, BASE_URLS.URL_CONTA_SANEPAR);
   }

}