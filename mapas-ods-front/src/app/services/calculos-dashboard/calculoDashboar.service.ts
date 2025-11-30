import { Injectable } from '@angular/core';
import { IntarefaceContaSanepar } from '../models/contaSanepar'; // Certifique-se de que o caminho do model está correto
@Injectable({
  providedIn: 'root'
})
export class CalculosDashboardService {

  private _totalPessoas: number = 0; 
  private metaLitrosPorPessoaDia = 50; 
  // private diasNoMesPadrao = 30; // 🛑 Removido

  constructor() { }

  setTotalPessoas(total: number): void {
      this._totalPessoas = total > 0 ? total : 1; 
  }

  getTotalPessoas(): number {
      return this._totalPessoas;
  }

  valorTotalLitros(metrosCubicos: number): number {
    return metrosCubicos * 1000; 
  }

  /**
   * Calcula o número de dias entre duas datas (leitura anterior e leitura atual).
   */
  calcularDiferencaDias(dataInicio: string | Date, dataFim: string | Date): number {
    const d1 = new Date(dataInicio).getTime();
    const d2 = new Date(dataFim).getTime();
    
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 1;
  }

  /**
   * Calcula a média total de consumo ESPERADA (ONU) MENSAL em litros.
   * Agora precisa do número de dias da medição.
   */
  mediaConsumoTotalOnuMensal(diasNoPeriodo: number): number {
    return this._totalPessoas * this.metaLitrosPorPessoaDia * diasNoPeriodo;
  }

  /**
   * Verifica se o consumo mensal atingiu a meta da ONU.
   * Agora precisa do número de dias da medição.
   */
  atingiuMeta(metrosCubicos: number, diasNoPeriodo: number): boolean {
    const totalLitrosRealMensal = this.valorTotalLitros(metrosCubicos);
    const metaOnuMensal = this.mediaConsumoTotalOnuMensal(diasNoPeriodo);
    return totalLitrosRealMensal <= metaOnuMensal;
  }

  /**
   * Calcula a média REAL de consumo DIÁRIO por pessoa para um dado mês.
   * Agora precisa do número de dias da medição.
   */
  mediaConsumoDiarioReal(metrosCubicos: number, diasNoPeriodo: number): number {
    const totalLitrosMensal = this.valorTotalLitros(metrosCubicos);
    const totalLitrosDiario = totalLitrosMensal / diasNoPeriodo; 
    const mediaPorPessoa = totalLitrosDiario / this._totalPessoas; 
    return mediaPorPessoa;
  }

  /**
   * Calcula a média REAL de consumo DIÁRIO por pessoa sobre todos os registros.
   */
  calcularMediaGeralDiariaPorPessoa(listaContas: IntarefaceContaSanepar[]): number {
    if (listaContas.length <= 1) return 0; 

    const contasOrdenadas = [...listaContas].sort((a, b) => new Date(a.mes).getTime() - new Date(b.mes).getTime());

    let somaMedias = 0;
    let numContasValidas = 0;

    for (let i = 1; i < contasOrdenadas.length; i++) {
        const contaAtual = contasOrdenadas[i];
        const contaAnterior = contasOrdenadas[i - 1];
        
        const diasNoPeriodo = this.calcularDiferencaDias(contaAnterior.mes, contaAtual.mes);
        
        if (diasNoPeriodo > 0) {
            somaMedias += this.mediaConsumoDiarioReal(contaAtual.metros_cubicos, diasNoPeriodo);
            numContasValidas++;
        }
    }
    
    return Math.round(somaMedias / (numContasValidas || 1));
  }

  getMetaDiariaPorPessoa(): number {
    return this.metaLitrosPorPessoaDia;
  }
}