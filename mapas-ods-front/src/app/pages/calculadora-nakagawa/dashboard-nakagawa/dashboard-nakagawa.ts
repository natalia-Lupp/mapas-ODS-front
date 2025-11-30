import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { EChartsCoreOption } from 'echarts/core';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';

import { DateHelper } from '../../../helpers/formatDate';
import { EventosService } from '../../../services/database/eventos.service';
import { MetricasService } from '../../../services/database/metricas.service';
import { InterfaceMetricas } from '../../../services/models/metrica';
import { SharedModule } from '../../../shared/shared.module/shared.module';
import { InterfaceEvento } from '../../../services/models/evento';

//tem que registrar ANTES do componente
echarts.use([PieChart, GridComponent, TooltipComponent, CanvasRenderer, BarChart]);

@Component({
  selector: 'app-dashboard-nakagawa',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, SharedModule],
  providers: [
    DatePipe,
    provideEchartsCore({ echarts })
  ],
  templateUrl: './dashboard-nakagawa.html',
  styleUrls: ['./dashboard-nakagawa.css']
})
export class DashboardNakagawa implements OnInit {

  metrica?: InterfaceMetricas | null = null;
  optionStudens!: EChartsCoreOption;
  showFuncionarios!: EChartsCoreOption;
  showEventos!: EChartsCoreOption;

  metricaGeral!: EChartsCoreOption;

  eventos!: InterfaceEvento[];

  totalMetricas = 0;
  totalAlunos = 0;
  totalEventos = 0;
  totalFuncionarios = 0;

  constructor(
    private route: ActivatedRoute,
    private metricasService: MetricasService,
    private eventosService: EventosService,
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
        this.totalFuncionarios = this.getTotalFuncionarios();
        this.graficoAlunosBar();
        this.graficoFuncionarios();
        this.carregarEventos();
        this.metricaGeralGrafico();
      },
      error: (err) => console.error(err)
    });
  }

  getMediaPorDiaDoPeriodo(): number {
    if (!this.metrica?.data_inicio_periodo || !this.metrica?.data_fim_periodo) {
      return 0;
    }

    const inicio = new Date(this.metrica.data_inicio_periodo).getTime();
    const fim = new Date(this.metrica.data_fim_periodo).getTime();

    const dias = (fim - inicio) / (1000 * 60 * 60 * 24);

    if (dias <= 0) return 0;

    const total = this.metrica.consumo_total_agua ?? 0;

    return total / dias;
  }

  totalLitrosConsumidosPorAlunos(): number {
    return (this.metrica?.litros_por_total_alunos_geral ?? 0) + (this.metrica?.litros_por_total_alunos_noturnos ?? 0) + (this.metrica?.litros_por_total_alunos_integral ?? 0)
  }

  totalLitrosConsumidosPorFuncionarios(): number {
    return ((this.metrica?.litros_por_total_auxiliares_administrativos ?? 0) + (this.metrica?.litros_por_total_docentes ?? 0) + (this.metrica?.litros_por_total_tercerizados ?? 0));
  }

  getTotalFuncionarios(): number {
    return ((this.metrica?.total_auxiliares_administrativos ?? 0) + (this.metrica?.total_docentes ?? 0) + (this.metrica?.total_tercerizados ?? 0));
  }

  getTotalPessoasEventos(): number {
    return this.metrica?.total_pessoas_eventos ?? 0;
  }

  //GRAFICOS
  private graficoAlunosBar(): void {
    this.optionStudens = {
      title: {
        text: 'Consumo Total por Alunos'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.05]
      },
      yAxis: {
        type: 'category',
        data: ['Geral', 'Integral', 'Noturno']
      },
      series: [
        {
          name: `${DateHelper.formatar(this.metrica?.data_inicio_periodo)} - ${DateHelper.formatar(this.metrica?.data_fim_periodo)}`,
          type: 'bar',
          data: [
            this.metrica?.litros_por_total_alunos_geral ?? 0,
            this.metrica?.litros_por_total_alunos_integral ?? 0,
            this.metrica?.litros_por_total_alunos_noturnos ?? 0
          ],
          itemStyle: {
            color: '#efb23b'
          }
        }
      ]
    };
  }


  private graficoFuncionarios(): void {
    this.showFuncionarios = {
      title: {
        text: 'Consumo Funcionarios'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.055]
      },
      yAxis: {
        type: 'category',
        data: ['Aux. Administativos', 'Docentes', 'Tercerizados']
      },
      series: [
        {
          name: `${DateHelper.formatar(this.metrica?.data_inicio_periodo)} - ${DateHelper.formatar(this.metrica?.data_fim_periodo)}`,
          type: 'bar',
          data: [
            this.metrica?.litros_por_total_auxiliares_administrativos ?? 0,
            this.metrica?.litros_por_total_docentes ?? 0,
            this.metrica?.litros_por_total_tercerizados ?? 0
          ],
          itemStyle: {
            color: '#fb2c36'
          }
        }
      ]
    }
  }

  private carregarEventos(): void {
    if (!this.metrica?.eventos) return;

    const ids = this.metrica.eventos;
    this.eventos = [];
    let carregados = 0;

    ids.forEach((id: string) => {
      this.eventosService.getById(id).subscribe({
        next: (evento) => {

          this.eventos.push(evento);
          carregados++;
          if (carregados === ids.length) {
            this.graphEvents();
          }
        },
        error: (err) => console.error(err)
      });
    });
  }

  private graphEvents(): void {
    this.showEventos = {
      title: {
        text: 'World Population'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: this.eventos.map(e => e.nome_evento)
      },
      series: [
        {
          name: 'Participantes',
          type: 'bar',
          data: this.eventos.map(e => e.numero_estimado_pessoas ?? 0),
          itemStyle: {
            color: '#ad47f7'
          }
        }
      ]
    };
  }

  private metricaGeralGrafico(): void {
    this.metricaGeral = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '15%',
        left: 'center'
      },
      series: [
        {
          name: 'Consumo de Agua por',
          type: 'pie',
          radius: ['40%', '80%'],
          center: ['50%', '80%'],
          startAngle: 180,
          endAngle: 360,
          color: ['#efb23b', '#fb2c36', '#ad47f7'],
          label: {
            show: true,
            formatter: '{b}: {d}%',
            fontSize: 14,
            color: '#333'
          },

          data: [
            { value: this.totalLitrosConsumidosPorAlunos().toFixed(2), name: 'Alunos' },
            { value: this.totalLitrosConsumidosPorFuncionarios().toFixed(2), name: 'Funcionarios' },
            { value: this.metrica?.litros_por_total_pessoas_eventos?? 0, name: 'Evento' },
          ]
        }
      ]
    }
  }
}
