import { HttpClient } from '@angular/common/http';

import { BASE_URLS } from '../conts';
import { InterfaceInfraestrutura } from '../models/infraestrutura';
import { BasicService } from './basic.service';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: "root"
})
export class InfraestruturaService extends BasicService<InterfaceInfraestrutura> {
   constructor(http: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_INFRAESTRUTURA;
      super(http, endpoint);
   }
}