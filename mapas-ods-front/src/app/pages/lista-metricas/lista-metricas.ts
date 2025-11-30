import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MetricasService } from '../../services/database/metricas.service';
import { InterfaceMetricas } from '../../services/models/metrica';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-metricas',
  imports: [SharedModule, CommonModule],
  standalone: true,
  templateUrl: './lista-metricas.html',
  styleUrl: './lista-metricas.css'
})
export class ListaMetricas implements OnInit {

  listaMetricas: InterfaceMetricas[] = [];

  constructor(private metricasService: MetricasService,private router: Router) { }

  ngOnInit(): void {
    this.getAllMetricas();
  }

  visualizarMetrica(id?:string){
    this.router.navigate([`dashboard-nakagawa/${id}`])
  }

  private getAllMetricas() {
    this.metricasService.getAll().subscribe({
      next: (value) => {
        this.listaMetricas = value
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  novaLeitura() {
  this.router.navigate(['/calculadora-nakagawa']);
}

}
