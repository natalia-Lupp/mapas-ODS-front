import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module/shared.module';

@Component({
  selector: 'app-consultar-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './consultar-dados.html',
  styleUrls: ['./consultar-dados.css']
})
export class ConsultarDados {
  consulta = {
    ano: '',
    mes: '',
    dia: '',
    predio: '',
    tipoConsulta: '',
    tipoDado: ''
  };

  anos = [2023, 2024, 2025];
  meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  dias = Array.from({ length: 31 }, (_, i) => i + 1);

  predios = ['RU', 'Bloco A', 'Bloco B', 'Biblioteca'];
  tiposConsulta = ['Média mensal', 'Consumo diário', 'Total anual','Media por pessoa'];
  modelos = ['Tabela', 'Gráfico'];

  consultarDados() {
    console.log('Consulta gerada:', this.consulta);
  }

  voltar() {
    window.history.back();
  }
}
