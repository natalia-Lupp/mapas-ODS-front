import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class PdfService {

  gerarDashboardPdf(
    listaContas: any[],
    mediaConsumoReal: number,
    metaLitros: number
  ) {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Relatório do Dashboard', 14, 22);

    // Cards resumo
    doc.setFontSize(12);
    doc.text(`Média Real de Consumo por Pessoa: ${mediaConsumoReal}`, 14, 32);
    doc.text(`Meta ONU (L/mês): ${metaLitros}`, 14, 38);

    // Cabeçalho da tabela
    const head = [['Mês/Ano','Consumo Total (m³)','Status','Média Real']];

    // Corpo da tabela
    const body = listaContas.map(c => [
      new Date(c.mes).toLocaleDateString('pt-BR',{month:'long', year:'numeric'}),
      c.metros_cubicos,
      c.atingiuMeta ? 'Atingiu' : 'Não atingiu',
      c.mediaConsumo.toFixed(0)
    ]);

    autoTable(doc, {
      startY: 45,
      head,
      body,
      styles: {
        textColor: [0, 0, 0],
        fillColor: [255, 255, 255],
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      }
    });

    // Abre em nova aba
    doc.output('dataurlnewwindow');
  }
}
