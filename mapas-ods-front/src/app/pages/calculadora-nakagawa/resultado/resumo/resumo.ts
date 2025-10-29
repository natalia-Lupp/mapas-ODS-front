import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MetricasService } from '../../../../services/database/metricas.service';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [],
  templateUrl: './resumo.html',
  styleUrls: ['./resumo.css']
})
export class Resumo implements OnChanges {

  @Input() dataInicio!: string;
  @Input() dataFim!: string;

  constructor(private metricaService: MetricasService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ((this.dataInicio && changes['dataInicio']) || (this.dataFim && changes['dataFim'])) {
      this.getAllDados(this.dataInicio, this.dataFim);
    }
  }

  getAllDados(dataInicio: string, dataFim: string) {
    console.log('Buscando dados entre:', dataInicio, 'e', dataFim);
    this.metricaService.getEventosByIntervaloData(new Date(dataInicio), new Date(dataFim)).subscribe({
      next: (value) => console.log('Resultados:', value),
      error: (err) => console.error('Erro:', err)
    });
  }
}
