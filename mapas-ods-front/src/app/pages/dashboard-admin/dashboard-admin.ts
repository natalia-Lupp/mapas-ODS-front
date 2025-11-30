import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { ContaSaneparService } from '../../services/database/contaSanepar.service';
import { IntarefaceContaSanepar } from '../../services/models/contaSanepar';
import { CalculosDashboardService } from '../../services/calculos-dashboard/calculoDashboar.service';


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
    private calculosService: CalculosDashboardService 
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

 
   //Retorna a meta diária por pessoa (obtido do serviço para o card).
 
  get metaLitrosPorPessoaDia(): number {
    return this.calculosService.getMetaDiariaPorPessoa();
  }

  
   //Verifica se o registro atingiu a meta (delegação para o serviço).
  
  atingiuMeta(metrosCubicos: number): boolean {
    return this.calculosService.atingiuMeta(metrosCubicos);
  }

 
   //Calcula a média REAL de consumo DIÁRIO por pessoa (delegação para o serviço).
  
  mediaConsumoDiarioReal(metrosCubicos: number): number {
    return this.calculosService.mediaConsumoDiarioReal(metrosCubicos);
  }

 
   //Média geral para exibição no card de resumo (delegação para o serviço).
  
  get mediaConsumoRealPorPessoaExibicao(): number {
    return this.calculosService.calcularMediaGeralDiariaPorPessoa(this.listaContas);
  }


  onExcluirTodos() {
    // É recomendado usar um modal customizado em vez de window.confirm() em aplicações Angular.
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
    // É recomendado usar um modal customizado em vez de alert().
    console.log('PDF exportado com sucesso (mock)');
    // Implementação de um mock de mensagem temporária para evitar o alert() nativo:
    const mockModal = document.createElement('div');
    mockModal.textContent = 'PDF exportado com sucesso (mock)';
    mockModal.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 10px; border-radius: 5px; z-index: 1000;';
    document.body.appendChild(mockModal);
    setTimeout(() => document.body.removeChild(mockModal), 3000);
  }
}