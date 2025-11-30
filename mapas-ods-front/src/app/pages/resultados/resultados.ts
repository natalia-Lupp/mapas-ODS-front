import { Component, OnInit } from '@angular/core';
import { MetricasService } from '../../services/database/metricas.service';
import { InterfaceMetricas } from '../../services/models/metrica';

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class Resultados implements OnInit {

  listMetricas: InterfaceMetricas[] = [];

  constructor(private service: MetricasService) { }

  ngOnInit(): void {

  }
  
  private async getMetricas() {
    await this.service.getAll().subscribe({
      next: (data) => {
        this.listMetricas = data;
      },
      error: (err) => {
        console.error(err);
      },
    })
  }

}
