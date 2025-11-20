import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, throwError } from 'rxjs';

import { BASE_URLS } from '../conts';
import { InterfaceAlunosSemestres } from '../models/alunosSemestre';
import { IntarefaceContaSanepar } from '../models/contaSanepar';
import { InterfaceEvento } from '../models/evento';
import { InterfaceMetricas } from '../models/metrica';
import { IntefaceOutros } from '../models/outros';
import { AlunosServices } from './alunos.service';
import { BasicService } from './basic.service';
import { ContaSaneparService } from './contaSanepar.service';
import { EventosService } from './eventos.service';
import { OutrosService } from './outros.service';

@Injectable({
   providedIn: "root"
})
export class MetricasService extends BasicService<InterfaceMetricas> {
   constructor(http: HttpClient, private alunosService: AlunosServices, private eventosService: EventosService, private outrosSerivice: OutrosService, private contasSaneparService: ContaSaneparService) {
      const endpoint = BASE_URLS.URL_POCKETBASE + BASE_URLS.URL_METRICAS;
      super(http, endpoint);
   }

   override create(data: InterfaceMetricas): Observable<InterfaceMetricas> {
      const consumo = data.consumo_total_agua;
      data.litros_por_total_pessoas_eventos =
         this.calcularLitros(data.total_pessoas_eventos, consumo);

      data.litros_por_total_auxiliares_administrativos =
         this.calcularLitros(data.total_auxiliares_administrativos, consumo);

      data.litros_por_total_tercerizados =
         this.calcularLitros(data.total_tercerizados, consumo);

      data.litros_por_total_docentes =
         this.calcularLitros(data.total_docentes, consumo);

      data.litros_por_total_alunos_geral =
         this.calcularLitros(data.total_alunos_geral, consumo);

      data.litros_por_total_alunos_integral =
         this.calcularLitros(data.total_alunos_integral, consumo);

      data.litros_por_total_alunos_noturnos =
         this.calcularLitros(data.total_alunos_noturnos, consumo);

      return super.create(data);
   }

   private calcularLitros(total: number, consumoTotal: number): number {
      if (!total || !consumoTotal) return 0;
      return Number((consumoTotal / total).toFixed(2));
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

   somaContasSanepar(ids: string[]): Observable<number> {
      return forkJoin(
         ids.map(id =>
            this.getContaSaneper(id).pipe(
               catchError(() => of(null)) // se não tiver ele "pula fora"
            )
         )
      ).pipe(
         map(resultados => {
            const totalMetros =
               resultados
                  .filter((c): c is IntarefaceContaSanepar => c !== null)
                  .reduce((acc, conta) => acc + conta.metros_cubicos, 0);
            return totalMetros * 1000; // converte para litros
         })
      );
   }

   private getContaSaneper(id: string): Observable<IntarefaceContaSanepar> {
      return this.contasSaneparService.getById(id).pipe(
         catchError(err => {
            console.error("Erro em getContaSaneper:", err);
            return throwError(() => err);
         })
      );
   }

   somaOutros(ids: string[]): Observable<{
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
            somas.somaAuxAdministrativos;
            somas.somaTercerizados;
            somas.somaDocentes;

            return somas;
         })
      );
   }

   somaEventos(ids: string[]): Observable<number> {
      const requisicoes = ids.map(id => this.eventosService.getById(id));
      return forkJoin(requisicoes).pipe(
         map((eventos: InterfaceEvento[]) => {
            const totalPessoas = eventos.reduce((acc, evento) => acc + evento.numero_estimado_pessoas, 0);
            return totalPessoas;
         })
      )
   }

   somaAlunos(
      ids: string[]
   ): Observable<{
      somatoriaAlunosGeral: number;
      somatoriaAlunosIntegral: number;
      somatoriaAlunosNoturnos: number;
   }> {
      const requisicoes = ids.map(id => this.alunosService.getById(id));

      //esse forkJOin é novo para min é novo
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
            somas.somatoriaAlunosGeral;
            somas.somatoriaAlunosIntegral;
            somas.somatoriaAlunosNoturnos;

            return somas;
         })
      );
   }



}