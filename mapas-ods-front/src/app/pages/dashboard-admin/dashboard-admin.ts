import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { ContaSaneparService } from '../../services/database/contaSanepar.service';
import { IntarefaceContaSanepar } from '../../services/models/contaSanepar';
import { CalculosDashboardService } from '../../services/calculos-dashboard/calculoDashboar.service';
import { PdfService } from '../../services/pdf/pdf.service';
import { PessoasNotifierService } from '../../services/pessoas-notifier.service';
import { Subscription } from 'rxjs'; 
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard-admin.html'
})
export class DashboardAdmin implements OnInit, OnDestroy {

  listaContas: IntarefaceContaSanepar[] = [];
  totalPessoas: number = 0;
  private subscriptions = new Subscription(); 
 
  constructor(
    private contaSaneparService: ContaSaneparService,
    private calculosService: CalculosDashboardService,
    private pdfService: PdfService,
    private pessoasNotifierService: PessoasNotifierService 
  ) {}

  ngOnInit(): void {
    // 1. Assina as mudanças do total de pessoas
    this.subscriptions.add(
      this.pessoasNotifierService.totalPessoas$.subscribe(total => {
        const totalPessoasAnterior = this.totalPessoas;
        this.totalPessoas = total;
        
        // 2. Sempre que o total mudar, atualiza o serviço de cálculos
        this.calculosService.setTotalPessoas(this.totalPessoas);

        // 🚨 CORREÇÃO: Se o total de pessoas mudou, recarrega a lista para forçar o re-render
        if (totalPessoasAnterior !== total) {
            this.getContasSanepar(); 
        }
      })
    );
    
    // 3. Carrega a lista de contas no início
    this.getContasSanepar();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); 
  }

  private getContasSanepar(): void {
    this.contaSaneparService.getAll().subscribe({
      next: (data) => {
        // 🔥 CORREÇÃO: Ordena a lista de contas pela data (mes) de forma decrescente (mais recente primeiro)
        this.listaContas = data.sort((a, b) => new Date(b.mes).getTime() - new Date(a.mes).getTime());
      },
      error: (err) => {
        console.error('Erro ao buscar contas:', err);
      }
    });
  }

  /**
   * Calcula o número de dias da medição. Usa a conta anterior como referência.
   * Presume que listaContas está ordenada de forma decrescente (mais recente primeiro).
   */
  getDiasNoPeriodo(contaAtual: IntarefaceContaSanepar, index: number): number {
    
    // Se for o último item da lista (o mais antigo), ou se for o único item, retorna 30 dias de fallback.
    // O anterior na lista DESC é [index + 1].
    if (index >= this.listaContas.length - 1) { 
         return 30; 
    }
    
    const contaAnterior = this.listaContas[index + 1]; 
    
    // Usa a função do serviço para calcular a diferença real de dias.
    return this.calculosService.calcularDiferencaDias(contaAnterior.mes, contaAtual.mes);
  }


  // 🛑 MODIFICADO: Recebe e usa o index para calcular os dias
  atingiuMeta(metrosCubicos: number, index: number): boolean {
    const dias = this.getDiasNoPeriodo(this.listaContas[index], index);
    return this.calculosService.atingiuMeta(metrosCubicos, dias);
  }

  // 🛑 MODIFICADO: Recebe e usa o index para calcular os dias
  mediaConsumoDiarioReal(metrosCubicos: number, index: number): number {
    const dias = this.getDiasNoPeriodo(this.listaContas[index], index);
    return this.calculosService.mediaConsumoDiarioReal(metrosCubicos, dias);
  }


  get metaLitrosPorPessoaDia(): number {
    return this.calculosService.getMetaDiariaPorPessoa();
  }

  get mediaConsumoRealPorPessoaExibicao(): number {
    // O cálculo da média geral já é feito no serviço e lida com a ordenação
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
    // 🔥 Modificar o mapa para incluir o cálculo de dias e média/meta corretos
    const lista = this.listaContas.map((c, index) => ({
      ...c,
      atingiuMeta: this.atingiuMeta(c.metros_cubicos, index),
      mediaConsumo: this.mediaConsumoDiarioReal(c.metros_cubicos, index)
    }));

    this.pdfService.gerarDashboardPdf(
      lista,
      this.mediaConsumoRealPorPessoaExibicao,
      this.metaLitrosPorPessoaDia
    );
  }
}