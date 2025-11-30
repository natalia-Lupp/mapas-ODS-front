import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { AlunosServices } from './database/alunos.service'; 
import { OutrosService } from './database/outros.service'; 
import { EventosService } from './database/eventos.service';
import { InterfaceEvento } from '../services/models/evento'; 
@Injectable({
  providedIn: 'root'
})
export class PessoasNotifierService {
  
  private needsUpdate$ = new BehaviorSubject<boolean>(true);
  public totalPessoas$: Observable<number>;

  constructor(
    private alunosService: AlunosServices,
    private outrosService: OutrosService,
    private eventosService: EventosService 
  ) {
    this.totalPessoas$ = this.needsUpdate$.pipe(
      switchMap(() => 
        combineLatest([
          this.calcularTotalBaseDePessoas(),
          this.eventosService.getAll()
        ])
      ),
      map(([totalBase, listaEventos]) => {
          // Calcula a média de pessoas de eventos ativos
          const mediaPessoasEvento = listaEventos.length > 0 
              ? this.calcularMediaDiariaDePessoasEvento(listaEventos)
              : 0;
          
          // O total é a Base Ativa/Última + a Média dos Eventos Ativos
          const totalFinal = Math.round(totalBase + mediaPessoasEvento);
          
          return totalFinal;
      }),
      tap(total => console.log('Total de Pessoas (Base + Eventos):', total))
    );
  }

  // --- FUNÇÃO AUXILIAR: ENCONTRAR O REGISTRO ATIVO OU O ÚLTIMO HISTÓRICO ---
  /**
   * Encontra o registro ativo (data de fim no futuro) ou, se não houver, 
   * retorna o registro que terminou mais recentemente (último histórico).
   */
  private encontrarRegistroAtivo(data: any[], campoDataFim: string): any {
      if (!data || data.length === 0) return null;

      const hoje = new Date().getTime();

      // 1. Mapear e validar datas
      const dataComDatasValidas = data
          .map(item => ({
              ...item,
              timestampFim: new Date(item[campoDataFim]).getTime()
          }))
          .filter(item => !isNaN(item.timestampFim));

      if (dataComDatasValidas.length === 0) return null;

      // 2. TENTA ENCONTRAR REGISTROS ATIVOS (Data de fim >= Hoje)
      const ativos = dataComDatasValidas
          .filter(item => item.timestampFim >= hoje);

      if (ativos.length > 0) {
        // Se houver ativos, ordena para pegar o que termina mais tarde (o principal ativo)
        ativos.sort((a, b) => b.timestampFim - a.timestampFim); 
        return ativos[0];
      }
      
      // 3. FALLBACK: Se não há registros ATIVOS (porque todos já terminaram), usa o registro HISTÓRICO MAIS RECENTE
      
      // Filtra apenas os registros que já terminaram
      const historico = dataComDatasValidas
          .filter(item => item.timestampFim < hoje);
          
      if (historico.length > 0) {
        // Ordena DESC para pegar o que terminou mais recentemente (o maior timestamp entre os passados)
        historico.sort((a, b) => b.timestampFim - a.timestampFim); 
        return historico[0];
      }

      return null; // Não há dados válidos
  }

  // --- Lógica de Cálculo de Base (Alunos + Funcionários) ---

  private calcularTotalBaseDePessoas(): Observable<number> {
    return combineLatest([
      this.alunosService.getAll().pipe(
        map(data => {
          // Busca o semestre ativo ou o último histórico
          const ultimoSemestreAtivo = this.encontrarRegistroAtivo(data, 'data_fim_semestre');
          
          if (!ultimoSemestreAtivo) return 0;
          
          return ultimoSemestreAtivo.quantidade_alunos_geral || 0;
        })
      ),
      this.outrosService.getAll().pipe(
        map(data => {
          // Busca o período ativo ou o último histórico
          const ultimoPeriodoAtivo = this.encontrarRegistroAtivo(data, 'periodo_fim');

          if (!ultimoPeriodoAtivo) return 0;

          return (
            Number(ultimoPeriodoAtivo.auxiliares_administrativos || 0) + 
            Number(ultimoPeriodoAtivo.docentes || 0) + 
            Number(ultimoPeriodoAtivo.tercerizados || 0)
          );
        })
      )
    ]).pipe(
        map(([totalAlunos, totalFuncionarios]) => totalAlunos + totalFuncionarios)
    );
  }
  
  // --- Lógica de Cálculo de Eventos ---
  
  private calcularMediaDiariaDePessoasEvento(listaEventos: InterfaceEvento[]): number {
    let totalPessoasExtras = 0;
    let totalDiasDeEventos = 0;
    const hoje = new Date().getTime();

    for (const evento of listaEventos) {
      const dataInicio = new Date(evento.data_inicio);
      const dataFim = new Date(evento.data_fim);
      
      const numPessoas = Number(evento.numero_estimado_pessoas) || 0; 

      if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime()) || numPessoas <= 0) {
        continue;
      }
      
      // Contabiliza apenas eventos que estão ativos (data de fim não passou)
      if (dataFim.getTime() < hoje) {
          continue;
      }

      const diffTime = Math.abs(dataFim.getTime() - dataInicio.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

      if (diffDays > 0) {
        totalPessoasExtras += numPessoas;
        totalDiasDeEventos += diffDays;
      }
    }

    if (totalDiasDeEventos === 0) {
      return 0;
    }

    return totalPessoasExtras / totalDiasDeEventos;
  }

  notifyPessoasChange(): void {
    this.needsUpdate$.next(true);
  }
}