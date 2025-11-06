import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, firstValueFrom } from 'rxjs';
import { MetricasService } from '../../../services/database/metricas.service';
import { ContaSaneparService } from '../../../services/database/contaSanepar.service';
import { AlunosServices } from '../../../services/database/alunos.service';
import { EventosService } from '../../../services/database/eventos.service';
import { InterfaceMetricas } from '../../../services/models/metrica';
import { IntarefaceContaSanepar } from '../../../services/models/contaSanepar';
import { InterfaceAlunosSemestres } from '../../../services/models/alunosSemestre';
import { InterfaceEvento } from '../../../services/models/evento';

@Component({
  selector: 'app-dashboard-nakagawa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseChartDirective, DatePipe],
  templateUrl: './dashboard-nakagawa.html',
  styleUrls: ['./dashboard-nakagawa.css']
})
export class DashboardNakagawa implements OnInit {
  formFiltro!: FormGroup;
  metricas: InterfaceMetricas[] = [];
  metricasFiltradas: InterfaceMetricas[] = [];
  
  // Cards de resumo
  totalMetricas = 0;
  totalConsumoAgua = 0;
  totalAlunos = 0;
  totalEventos = 0;
  
  // Gráfico de consumo de água
  consumoChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Consumo de Água (m³)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
      }
    ],
    labels: []
  };
  
  consumoChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      x: { title: { display: true, text: 'Período' } },
      y: { title: { display: true, text: 'm³' }, beginAtZero: true }
    }
  };
  
  // Gráfico de distribuição de alunos
  alunosChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Alunos',
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)'
        ],
        borderWidth: 2
      }
    ],
    labels: ['Geral', 'Integral', 'Noturno']
  };
  
  alunosChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  };
  
  // Gráfico de eventos
  eventosChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Pessoas Estimadas',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2
      }
    ],
    labels: []
  };
  
  eventosChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(
    private metricasService: MetricasService,
    private contasSaneparService: ContaSaneparService,
    private alunosService: AlunosServices,
    private eventosService: EventosService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.formFiltro = this.formBuilder.group({
      dataInicio: [''],
      dataFim: ['']
    });
    
    this.carregarDados();
  }

  carregarDados(): void {
    this.metricasService.getAll().subscribe({
      next: (metricas) => {
        this.metricas = metricas;
        this.aplicarFiltros();
        this.calcularResumos();
        this.atualizarGraficos();
      },
      error: (err) => {
        console.error('Erro ao carregar métricas:', err);
      }
    });
  }

  aplicarFiltros(): void {
    const filtro = this.formFiltro.value;
    
    if (filtro.dataInicio && filtro.dataFim) {
      const inicio = new Date(filtro.dataInicio);
      const fim = new Date(filtro.dataFim);
      
      this.metricasFiltradas = this.metricas.filter(metrica => {
        const dataInicio = new Date(metrica.data_inicio_periodo);
        const dataFim = new Date(metrica.data_fim_periodo);
        return dataInicio >= inicio && dataFim <= fim;
      });
    } else {
      this.metricasFiltradas = [...this.metricas];
    }
  }

  filtrar(): void {
    this.aplicarFiltros();
    this.calcularResumos();
    this.atualizarGraficos();
  }

  limparFiltros(): void {
    this.formFiltro.reset();
    this.aplicarFiltros();
    this.calcularResumos();
    this.atualizarGraficos();
  }

  calcularResumos(): void {
    this.totalMetricas = this.metricasFiltradas.length;
    this.totalConsumoAgua = 0;
    this.totalAlunos = 0;
    this.totalEventos = 0;
    
    // Processar todas as métricas
    const promises: Promise<any>[] = [];
    
    this.metricasFiltradas.forEach(metrica => {
      // Processar contas Sanepar
      if (metrica.contas_sanepars && Array.isArray(metrica.contas_sanepars)) {
        const contasIds: string[] = [];
        metrica.contas_sanepars.forEach((conta: any) => {
          if (typeof conta === 'object' && conta.metros_cubicos) {
            this.totalConsumoAgua += conta.metros_cubicos || 0;
          } else if (typeof conta === 'string') {
            contasIds.push(conta);
          }
        });
        
        if (contasIds.length > 0) {
          const requests = contasIds.map(id => this.contasSaneparService.getById(id));
          promises.push(
            firstValueFrom(forkJoin(requests)).then(contas => {
              contas.forEach(conta => {
                this.totalConsumoAgua += conta.metros_cubicos || 0;
              });
            })
          );
        }
      }
      
      // Processar alunos
      if (metrica.alunos_semestres && Array.isArray(metrica.alunos_semestres)) {
        const alunosIds: string[] = [];
        metrica.alunos_semestres.forEach((aluno: any) => {
          if (typeof aluno === 'object' && aluno.quantidade_alunos_geral !== undefined) {
            this.totalAlunos += (aluno.quantidade_alunos_geral || 0) + 
                               (aluno.quantidade_alunos_integral || 0) + 
                               (aluno.quantidade_alunos_noturnos || 0);
          } else if (typeof aluno === 'string') {
            alunosIds.push(aluno);
          }
        });
        
        if (alunosIds.length > 0) {
          const requests = alunosIds.map(id => this.alunosService.getById(id));
          promises.push(
            firstValueFrom(forkJoin(requests)).then(alunos => {
              alunos.forEach(aluno => {
                this.totalAlunos += (aluno.quantidade_alunos_geral || 0) + 
                                   (aluno.quantidade_alunos_integral || 0) + 
                                   (aluno.quantidade_alunos_noturnos || 0);
              });
            })
          );
        }
      }
      
      // Contar eventos
      if (metrica.eventos && Array.isArray(metrica.eventos)) {
        this.totalEventos += metrica.eventos.length;
      }
    });
    
    // Aguardar todas as requisições assíncronas
    Promise.all(promises).then(() => {
      // Atualizar gráficos após calcular resumos
      this.atualizarGraficos();
    });
  }

  atualizarGraficos(): void {
    this.atualizarGraficoConsumo();
    this.atualizarGraficoAlunos();
    this.atualizarGraficoEventos();
  }

  atualizarGraficoConsumo(): void {
    const labels: string[] = [];
    const dados: number[] = [];
    const promises: Promise<void>[] = [];
    
    this.metricasFiltradas.forEach((metrica, index) => {
      const periodo = `${this.datePipe.transform(metrica.data_inicio_periodo, 'dd/MM/yyyy')} - ${this.datePipe.transform(metrica.data_fim_periodo, 'dd/MM/yyyy')}`;
      labels.push(periodo);
      
      let consumo = 0;
      if (metrica.contas_sanepars && Array.isArray(metrica.contas_sanepars)) {
        const contasIds: string[] = [];
        metrica.contas_sanepars.forEach((conta: any) => {
          if (typeof conta === 'object' && conta.metros_cubicos) {
            consumo += conta.metros_cubicos || 0;
          } else if (typeof conta === 'string') {
            contasIds.push(conta);
          }
        });
        
        if (contasIds.length > 0) {
          const requests = contasIds.map(id => this.contasSaneparService.getById(id));
          promises.push(
            firstValueFrom(forkJoin(requests)).then(contas => {
              const total = contas.reduce((acc, conta) => acc + (conta.metros_cubicos || 0), 0);
              dados[index] = (dados[index] || 0) + total;
            })
          );
        } else {
          dados.push(consumo);
        }
      } else {
        dados.push(0);
      }
    });
    
    Promise.all(promises).then(() => {
      this.consumoChartData = {
        datasets: [
          {
            ...this.consumoChartData.datasets?.[0],
            data: dados
          }
        ],
        labels
      };
    });
  }

  atualizarGraficoAlunos(): void {
    let geral = 0;
    let integral = 0;
    let noturno = 0;
    const promises: Promise<void>[] = [];
    
    this.metricasFiltradas.forEach(metrica => {
      if (metrica.alunos_semestres && Array.isArray(metrica.alunos_semestres)) {
        const alunosIds: string[] = [];
        metrica.alunos_semestres.forEach((aluno: any) => {
          if (typeof aluno === 'object' && aluno.quantidade_alunos_geral !== undefined) {
            geral += aluno.quantidade_alunos_geral || 0;
            integral += aluno.quantidade_alunos_integral || 0;
            noturno += aluno.quantidade_alunos_noturnos || 0;
          } else if (typeof aluno === 'string') {
            alunosIds.push(aluno);
          }
        });
        
        if (alunosIds.length > 0) {
          const requests = alunosIds.map(id => this.alunosService.getById(id));
          promises.push(
            firstValueFrom(forkJoin(requests)).then(alunos => {
              alunos.forEach(aluno => {
                geral += aluno.quantidade_alunos_geral || 0;
                integral += aluno.quantidade_alunos_integral || 0;
                noturno += aluno.quantidade_alunos_noturnos || 0;
              });
            })
          );
        }
      }
    });
    
    Promise.all(promises).then(() => {
      this.alunosChartData = {
        datasets: [
          {
            ...this.alunosChartData.datasets?.[0],
            data: [geral, integral, noturno]
          }
        ],
        labels: ['Geral', 'Integral', 'Noturno']
      };
    });
  }

  atualizarGraficoEventos(): void {
    const labels: string[] = [];
    const dados: number[] = [];
    
    this.metricasFiltradas.forEach(metrica => {
      if (metrica.eventos && Array.isArray(metrica.eventos)) {
        metrica.eventos.forEach((evento: any) => {
          if (typeof evento === 'object') {
            labels.push(evento.nome_evento || 'Evento');
            dados.push(evento.numero_estimado_pessoas || 0);
          }
        });
      }
    });
    
    this.eventosChartData = {
      datasets: [
        {
          ...this.eventosChartData.datasets?.[0],
          data: dados
        }
      ],
      labels
    };
  }
}

