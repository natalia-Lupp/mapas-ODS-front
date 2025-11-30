import { Injectable } from '@angular/core';
import { IntarefaceContaSanepar } from '../models/contaSanepar'; // Certifique-se de que o caminho do model está correto

@Injectable({
  providedIn: 'root'
})
export class CalculosDashboardService {

  // Constantes de cálculo movidas do componente
  private totalPessoas = 1026;
  private metaLitrosPorPessoaDia = 50; // Meta ONU DIÁRIA por pessoa (litros/dia)
  private diasNoMesPadrao = 30; 

  constructor() { }

  /**
   * Converte metros cúbicos (m³) para litros.
   * @param metrosCubicos Consumo em m³.
   * @returns Consumo em litros.
   */
  valorTotalLitros(metrosCubicos: number): number {
    return metrosCubicos * 1000; // 1 m³ = 1000 litros
  }

  /**
   * Calcula a média total de consumo ESPERADA (ONU) MENSAL em litros.
   * @returns Consumo esperado em litros para um mês de 30 dias.
   */
  mediaConsumoTotalOnuMensal(): number {
    // Cálculo: Pessoas * Meta Diária (L/dia) * Dias no Mês
    return this.totalPessoas * this.metaLitrosPorPessoaDia * this.diasNoMesPadrao;
  }

  /**
   * Verifica se o consumo mensal atingiu a meta da ONU.
   * @param metrosCubicos Consumo mensal em m³.
   * @returns true se o consumo real for menor ou igual à meta.
   */
  atingiuMeta(metrosCubicos: number): boolean {
    const totalLitrosRealMensal = this.valorTotalLitros(metrosCubicos);
    const metaOnuMensal = this.mediaConsumoTotalOnuMensal();
    return totalLitrosRealMensal <= metaOnuMensal;
  }

  /**
   * Calcula a média REAL de consumo DIÁRIO por pessoa para um dado mês.
   * @param metrosCubicos Consumo mensal em m³.
   * @returns Média de consumo em litros/pessoa/dia.
   */
  mediaConsumoDiarioReal(metrosCubicos: number): number {
    const totalLitrosMensal = this.valorTotalLitros(metrosCubicos);
    const totalLitrosDiario = totalLitrosMensal / this.diasNoMesPadrao;
    const mediaPorPessoa = totalLitrosDiario / this.totalPessoas;
    return mediaPorPessoa;
  }

  /**
   * Calcula a média REAL de consumo DIÁRIO por pessoa sobre todos os registros.
   * @param listaContas Lista de registros de consumo.
   * @returns Média geral arredondada em litros/pessoa/dia.
   */
  calcularMediaGeralDiariaPorPessoa(listaContas: IntarefaceContaSanepar[]): number {
    const medias = listaContas.map(c => this.mediaConsumoDiarioReal(c.metros_cubicos));
    const mediaGeral = medias.reduce((acc, m) => acc + m, 0) / (medias.length || 1);
    return Math.round(mediaGeral);
  }

  /**
   * Retorna a meta diária por pessoa (para exibição no card).
   */
  getMetaDiariaPorPessoa(): number {
    return this.metaLitrosPorPessoaDia;
  }
}
