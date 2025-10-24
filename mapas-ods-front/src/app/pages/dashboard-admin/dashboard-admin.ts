import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module/shared.module';

interface Consumo {
  mes: string;
  consumoM3: number;
  mediaLitrosPorPessoa: number;
  atingiuMeta: boolean;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard-admin.html',
})


export class DashboardAdmin {
  consumos: Consumo[] = [
    { mes: 'Janeiro', consumoM3: 490, mediaLitrosPorPessoa: 48, atingiuMeta: true },
    { mes: 'Fevereiro', consumoM3: 512, mediaLitrosPorPessoa: 52, atingiuMeta: false },
    { mes: 'Março', consumoM3: 465, mediaLitrosPorPessoa: 47, atingiuMeta: true },
    { mes: 'Abril', consumoM3: 505, mediaLitrosPorPessoa: 50, atingiuMeta: true },
  ];

  totalPessoas = 1026;

  // Valor exato com decimais
  get mediaGeralLitros(): number {
    const total = this.consumos.reduce((acc, c) => acc + c.mediaLitrosPorPessoa, 0);
    return total / this.consumos.length;
  }

  // Valor arredondado para exibição
  get mediaGeralLitrosExibicao(): number {
    return Math.round(this.mediaGeralLitros);
  }

  onExcluirTodos() {
    if (confirm('Deseja realmente excluir todos os registros?')) {
      this.consumos = [];
    }
  }

  onExportarPDF() {
    alert('PDF exportado com sucesso (mock)');
  }
}
