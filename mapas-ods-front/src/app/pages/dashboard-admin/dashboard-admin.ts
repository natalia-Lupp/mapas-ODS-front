import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { ContaSaneparService } from '../../services/database/contaSanepar.service';
import { IntarefaceContaSanepar } from '../../services/models/contaSanepar';
import { CalculosDashboardService } from '../../services/calculos-dashboard/calculoDashboar.service';
import { PdfService } from '../../services/pdf/pdf.service'; // serviço de PDF

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard-admin.html'
})
export class DashboardAdmin implements OnInit {

  listaContas: IntarefaceContaSanepar[] = [];
 
  constructor(
    private contaSaneparService: ContaSaneparService,
    private calculosService: CalculosDashboardService,
    private pdfService: PdfService
  ) {}

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

  get metaLitrosPorPessoaDia(): number {
    return this.calculosService.getMetaDiariaPorPessoa();
  }

  atingiuMeta(metrosCubicos: number): boolean {
    return this.calculosService.atingiuMeta(metrosCubicos);
  }

  mediaConsumoDiarioReal(metrosCubicos: number): number {
    return this.calculosService.mediaConsumoDiarioReal(metrosCubicos);
  }

  get mediaConsumoRealPorPessoaExibicao(): number {
    return this.calculosService.calcularMediaGeralDiariaPorPessoa(this.listaContas);
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
    // Prepara dados da tabela
    const lista = this.listaContas.map(c => ({
      ...c,
      atingiuMeta: this.atingiuMeta(c.metros_cubicos),
      mediaConsumo: this.mediaConsumoDiarioReal(c.metros_cubicos)
    }));

    // Chama o serviço de PDF
    this.pdfService.gerarDashboardPdf(
      lista,
      this.mediaConsumoRealPorPessoaExibicao,
      this.metaLitrosPorPessoaDia
    );
  }
}
