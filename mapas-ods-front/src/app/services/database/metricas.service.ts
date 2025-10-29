import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

import { BASE_URLS } from '../conts';
import { InterfaceAlunosSemestres } from '../models/alunosSemestre';
import { InterfaceEvento } from '../models/evento';
import { InterfaceMetricas } from '../models/metrica';
import { IntefaceOutros } from '../models/outros';
import { AlunosServices } from './alunos.service';
import { BasicService } from './basic.service';
import { ContaSaneparService } from './contaSanepar.service';
import { EventosService } from './eventos.service';
import { OutrosService } from './outros.service';
import { IntarefaceContaSanepar } from '../models/contaSanepar';
import { Resultado } from '../models/resultado';

@Injectable({
   providedIn: "root"
})
export class MetricasService extends BasicService<InterfaceMetricas> {
   constructor(http: HttpClient, private alunosService: AlunosServices, private eventosService: EventosService, private outrosSerivice: OutrosService, private contasSaneparService: ContaSaneparService) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_METRICAS;
      super(http, endpoint);
   }

   getEventosByIntervaloData(dataInicio: Date, dataFim: Date) {
      return this.getAll().pipe(
         map((metricas: InterfaceMetricas[]) => {
            return metricas.filter(metrica => {
               const dataInicioEvento: Date = new Date(metrica.data_inicio_periodo);
               const dataFimEvento: Date = new Date(metrica.data_fim_periodo);
               return dataInicioEvento >= dataInicio && dataFimEvento <= dataFim;
            })
         })
      )
   }

   private somaContasSanepar(ids: string[]): Observable<number> {

      const requisicoes = ids.map(id => this.contasSaneparService.getById(id));

      return forkJoin(requisicoes).pipe(
         map((contas: IntarefaceContaSanepar[]) => {
            const totalContas = contas.reduce((acc, conta) => acc + conta.metros_cubicos, 0);

            const totalEmLitros = totalContas * 1000;

            return totalEmLitros;
         })
      )
   }

   private somaOutros(
      ids: string[],
      metrica: InterfaceMetricas
   ): Observable<{
      somaAuxAdministrativos: number;
      somaTercerizados: number;
      somaDocentes: number;
   }> {
      const requests = ids.map(id => this.outrosSerivice.getById(id));

      return forkJoin(requests).pipe(
         map((outros: IntefaceOutros[]) => {
            const somas = outros.reduce(
               (acc, outro) => {
                  acc.somaAuxAdministrativos += outro.auxiliares_administrativos ?? 0;
                  acc.somaTercerizados += outro.tercerizados ?? 0;
                  acc.somaDocentes += outro.docentes ?? 0;
                  return acc;
               },
               { somaAuxAdministrativos: 0, somaTercerizados: 0, somaDocentes: 0 }
            );
            somas.somaAuxAdministrativos *= metrica.peso_aux_administrativos;
            somas.somaTercerizados *= metrica.peso_tercerizados;
            somas.somaDocentes *= metrica.peso_docentes;

            return somas;
         })
      );
   }

   private somaEventos(ids: string[], metrica: InterfaceMetricas): Observable<number> {

      const requisicoes = ids.map(id => this.eventosService.getById(id));

      return forkJoin(requisicoes).pipe(
         map((eventos: InterfaceEvento[]) => {
            const totalPessoas = eventos.reduce((acc, evento) => acc + evento.numero_estimado_pessoas, 0);

            const totalComPeso = totalPessoas * metrica.peso_evento;

            return totalComPeso;
         })
      )
   }

   private somaAlunos(
      ids: string[],
      metrica: InterfaceMetricas
   ): Observable<{
      somatoriaAlunosGeral: number;
      somatoriaAlunosIntegral: number;
      somatoriaAlunosNoturnos: number;
   }> {
      const requisicoes = ids.map(id => this.alunosService.getById(id));

      //esse forkJOin é novo para min vi num video no youtube 
      return forkJoin(requisicoes).pipe(
         map((alunos: InterfaceAlunosSemestres[]) => {
            const somas = alunos.reduce(
               (acc, aluno) => {
                  acc.somatoriaAlunosGeral += aluno.quantidade_alunos_geral;
                  acc.somatoriaAlunosIntegral += aluno.quantidade_alunos_integral;
                  acc.somatoriaAlunosNoturnos += aluno.quantidade_alunos_noturnos;
                  return acc;
               },
               { somatoriaAlunosGeral: 0, somatoriaAlunosIntegral: 0, somatoriaAlunosNoturnos: 0 }
            );
            somas.somatoriaAlunosGeral *= metrica.peso_alunos_geral;
            somas.somatoriaAlunosIntegral *= metrica.peso_alunos_integral;
            somas.somatoriaAlunosNoturnos *= metrica.peso_alunos_noturno;

            return somas;
         })
      );
   }



}