import { CommonModule, DatePipe, NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { EChartsCoreOption } from 'echarts/core';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import { MetricasService } from '../../../services/database/metricas.service';
import { InterfaceMetricas } from '../../../services/models/metrica';
import { retry } from 'rxjs';

//tem que registrar ANTES do componente
echarts.use([PieChart, GridComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-dashboard-nakagawa',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  providers: [
    DatePipe,
    provideEchartsCore({ echarts })
  ],
  templateUrl: './dashboard-nakagawa.html',
  styleUrls: ['./dashboard-nakagawa.css']
})
export class DashboardNakagawa implements OnInit {

  metrica?: InterfaceMetricas | null = null;
  pizzaOption!: EChartsCoreOption;

  totalMetricas = 0;
  totalAlunos = 0;
  totalEventos = 0;

  constructor(
    private route: ActivatedRoute,
    private metricasService: MetricasService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadMetricaById(id);
      }
    });
  }

  private loadMetricaById(id: string): void {
    this.metricasService.getById(id).subscribe({
      next: (value) => {
        this.metrica = value
        this.graficoPizzaAlunos();
      },
      error: (err) => console.error(err)
    });
  }

  totalLitrosConsumidosPorAlunos():number{
   return (this.metrica?.litros_por_total_alunos_geral?? 0)  + (this.metrica?.litros_por_total_alunos_noturnos?? 0) + (this.metrica?.litros_por_total_alunos_integral ?? 0) 
  }

  //GRAFICOS
  private graficoPizzaAlunos(): void {
    this.pizzaOption = {  // <-- agora sim atualiza o gráfico
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>Valor: {c}<br/>Porcentagem: {d}%'
      },
      series: [
        {
          name: 'Consumo por Alunos',
          type: 'pie',
          radius: '80%',
          label: {
            formatter: '{b}: {c} ({d}%)'
          },
          color: ['#1F9EBB', '#307F91', '#00BCE6'],
          data: [
            { value: this.metrica?.litros_por_total_alunos_geral, name: 'Geral' },
            { value: this.metrica?.litros_por_total_alunos_integral, name: 'Integral' },
            { value: this.metrica?.litros_por_total_alunos_noturnos, name: 'Noturno' }
          ]
        }
      ]
    };
  }
}
