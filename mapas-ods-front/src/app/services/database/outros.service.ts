import { HttpClient } from "@angular/common/http";
import { IntefaceOutros } from "../models/outros";
import { BasicService } from "./basic.service";
import { BASE_URLS } from "../conts";

export class OutrosService extends BasicService<IntefaceOutros> {
   constructor(htpp: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_OUTROS;
      super(htpp, endpoint);
   }
}