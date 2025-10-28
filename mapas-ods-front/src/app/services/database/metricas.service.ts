import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URLS } from '../conts';
import { InterfaceMetricas } from '../models/metrica';
import { BasicService } from './basic.service';

@Injectable({
   providedIn: "root"
})
export class MetricasService extends BasicService<InterfaceMetricas> {
   constructor(http: HttpClient) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_METRICAS;
      super(http, endpoint);
   }
}