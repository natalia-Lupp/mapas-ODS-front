import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { ContaSaneparService } from '../../services/database/contaSanepar.service';
import { IntarefaceContaSanepar } from '../../services/models/contaSanepar';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard-admin.html'
})
export class DashboardAdmin implements OnInit {

  listaContas: IntarefaceContaSanepar[] = [];
  totalPessoas = 1026;
  metaLitrosPorPessoaDia = 50; // meta ONU DIÁRIA por pessoa
  diasNoMes = 30; // Considerando média de 30 dias por mês (mudar pra pegar o total de dias mes)

  constructor(private contaSaneparService: ContaSaneparService) {}

  ngOnInit(): void {
    this.getContasSanepar();
  }

  private getContasSanepar(): void {
    this.contaSaneparService.getAll().subscribe({
      next: (data) => {
        this.listaContas = data;
      },
      error: (err) => {
        console.error('Erro ao buscar contas:', err);
      }
    });
  }

  //Valor total em litros de um registro (MENSAL)
  valorTotalLitros(metrosCubicos: number): number {
    return metrosCubicos * 1000; // 1 m³ = 1000 litros
  }

  //Média total de consumo ESPERADA (ONU) MENSAL
  mediaConsumoTotalOnuMensal(): number {
    return this.totalPessoas * this.metaLitrosPorPessoaDia * this.diasNoMes;
  }

  // Verifica se o registro atingiu a meta
  atingiuMeta(metrosCubicos: number): boolean {
    const totalLitrosRealMensal = this.valorTotalLitros(metrosCubicos);
    const metaOnuMensal = this.mediaConsumoTotalOnuMensal();
    return totalLitrosRealMensal <= metaOnuMensal;
  }

  // Calcula a média REAL de consumo DIÁRIO por pessoa
  mediaConsumoDiarioReal(metrosCubicos: number): number {
    const totalLitrosMensal = this.valorTotalLitros(metrosCubicos);
    const totalLitrosDiario = totalLitrosMensal / this.diasNoMes;
    const mediaPorPessoa = totalLitrosDiario / this.totalPessoas;
    return mediaPorPessoa;
  }

  //Média real de consumo por pessoa (em litros/dia) Totais de todo os meses
  get mediaConsumoRealPorPessoaExibicao(): number {
    const medias = this.listaContas.map(c => this.mediaConsumoDiarioReal(c.metros_cubicos));
    const mediaGeral = medias.reduce((acc, m) => acc + m, 0) / (medias.length || 1);
    return Math.round(mediaGeral);
  }

  onExcluirTodos() {
    if (confirm('Deseja realmente excluir todos os registros?')) {
      this.listaContas.forEach(c => {
        if (c.id) {
          this.contaSaneparService.delete(c.id).subscribe();
        }
      });
      this.listaContas = [];
    }
  }

  onExportarPDF() {
    alert('PDF exportado com sucesso (mock)');
  }
}
