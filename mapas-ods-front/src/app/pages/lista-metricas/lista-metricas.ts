import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetricasService } from '../../services/database/metricas.service';
import { InterfaceMetricas } from '../../services/models/metrica';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { Toast } from '../../shared/components/toast/toast';
import { TipoAlerta } from '../../shared/components/toast/toast.enum';

@Component({
  selector: 'app-lista-metricas',
  imports: [SharedModule, CommonModule, Toast],
  standalone: true,
  templateUrl: './lista-metricas.html',
  styleUrl: './lista-metricas.css'
})
export class ListaMetricas implements OnInit {

  listaMetricas: InterfaceMetricas[] = [];

  showToast = false;
  toastMensagem = '';
  tipoAlertaToast: TipoAlerta = TipoAlerta.SUCESSO;

  constructor(
    private metricasService: MetricasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMetricas();
  }

  visualizarMetrica(id?: string) {
    this.router.navigate([`adm/calculadora-nakagawa/dashboard-nakagawa/${id}`]);
  }

  novaLeitura() {
    this.router.navigate(['/adm/calculadora-nakagawa/filtro']);
  }

  deletarMetrica(id?: string) {
    if (!id) {
      this.showToastMessage('ID inválido para exclusão', TipoAlerta.ERRO);
      return;
    }

    this.metricasService.delete(id).subscribe({
      next: () => {
        this.showToastMessage('Métrica excluída com sucesso', TipoAlerta.SUCESSO);
        this.getAllMetricas();
      },
      error: (err) => {
        console.error(err);
        this.showToastMessage('Erro ao excluir métrica', TipoAlerta.ERRO);
      }
    });
  }

  private getAllMetricas() {
    this.metricasService.getAll().subscribe({
      next: (value) => {
        this.listaMetricas = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1000) {
    this.toastMensagem = mensagem;
    this.tipoAlertaToast = tipo;
    this.showToast = true;

    setTimeout(() => this.showToast = false, duration);
  }
}
