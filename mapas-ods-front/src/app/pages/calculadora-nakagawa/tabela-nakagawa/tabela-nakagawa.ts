import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AlunosServices } from '../../../services/database/alunos.service';
import { ContaSaneparService } from '../../../services/database/contaSanepar.service';
import { EventosService } from '../../../services/database/eventos.service';
import { MetricasService } from '../../../services/database/metricas.service';
import { OutrosService } from '../../../services/database/outros.service';
import { InterfaceAlunosSemestres } from '../../../services/models/alunosSemestre';
import { IntarefaceContaSanepar } from '../../../services/models/contaSanepar';
import { InterfaceEvento } from '../../../services/models/evento';
import { InterfaceMetricas } from '../../../services/models/metrica';
import { IntefaceOutros } from '../../../services/models/outros';
import { Toast } from '../../../shared/components/toast/toast';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';

@Component({
  selector: 'app-tabela-nakagawa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './tabela-nakagawa.html',
  styleUrls: ['./tabela-nakagawa.css'],
  providers: [DatePipe]
})
export class TabelaNakagawa implements OnChanges, OnInit {
  @Input() dataInicio!: string;
  @Input() dataFim!: string;
  @Input() formPeso!: FormGroup;

  showToast = false;
  toastMensagem = "";
  tipoAlerta: TipoAlerta = TipoAlerta.SUCESSO;

  listaContaSanapear: IntarefaceContaSanepar[] = [];
  listaEventos: InterfaceEvento[] = [];
  listaAlunos: InterfaceAlunosSemestres[] = [];
  listaOutros: IntefaceOutros[] = [];
  formMetricas!: FormGroup;
  formArrayTabela!: FormArray;

  constructor(private contasSaneparService: ContaSaneparService, private eventosService: EventosService, private alunosService: AlunosServices, private outrosServices: OutrosService, private metricasService: MetricasService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.formMetricas = this.formBuilder.group({
      contasSanepar: this.formBuilder.array([]),
      eventos: this.formBuilder.array([]),
      alunosSemestre: this.formBuilder.array([]),
      outros: this.formBuilder.array([]),
    });
  }


  salvar(): void {

    const metricas = this.formMetricas.value;

    //xaxho 
    const metricasParaSalvar: InterfaceMetricas = {
      contas_sanepars: metricas.contasSanepar.map((c: any) => c.id),
      eventos: metricas.eventos.map((e: any) => e.id),
      outros: metricas.outros.map((o: any) => o.id),
      alunos_semestres: metricas.alunosSemestre.map((a: any) => a.id),
      id_infra: "kr3rbrpwz7sqi4r", //valor sempre fixo tem que ajustar isso por horas vai assim mesmo
      peso_alunos_geral: this.formPeso.value?.pesoAlunosSemestreGeral,
      peso_alunos_noturno: this.formPeso.value?.pesoAlunosSemestreNotuno,
      peso_alunos_integral: this.formPeso.value?.pesoAlunosSemestreIntegral,
      peso_aux_administrativos: this.formPeso.value?.pesoAuxiliaresAdministrativos,
      peso_tercerizados: this.formPeso.value?.pesoTercerizados,
      peso_docentes: this.formPeso.value?.pesoDocentes,
      peso_outro:this.formPeso.value?.pesoOutros,
      peso_evento:this.formPeso.value?.pesoEventos,
      data_inicio_periodo: this.formPeso.value?.dataInicioSemestre,
      data_fim_periodo: this.formPeso.value?.dataFimSemestre
    };


    this.metricasService.create(metricasParaSalvar).subscribe({
      next: (metricaSalva) => {
        console.log(metricaSalva);
        this.showToastMessage("Metrica Registrada com Sucesso", TipoAlerta.SUCESSO);
      },
      error: (err) => {
        this.showToastMessage("Não Foi Possivel Salvar Metrica", TipoAlerta.ERRO);
        console.error(err);
      }
    });
  }

  back(): void {

  }

  gerarRelatorio(): void {
    if (!this.formMetricas || this.formMetricas.invalid) {
      this.showToastMessage("Não há dados para gerar relatório", TipoAlerta.ERRO);
      return;
    }

    const metricas = this.formMetricas.value;
    const pesos = this.formPeso.value;
    
    // Montar HTML do relatório
    let html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório Nakagawa - ${this.datePipe.transform(pesos.dataInicioSemestre, 'dd/MM/yyyy')} a ${this.datePipe.transform(pesos.dataFimSemestre, 'dd/MM/yyyy')}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Arial', sans-serif;
            padding: 20px;
            color: #333;
            background: #f5f5f5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #1e40af;
            text-align: center;
            margin-bottom: 10px;
            font-size: 28px;
          }
          .periodo {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
          }
          .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
          }
          .section h2 {
            color: #1e40af;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 22px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            background-color: #3b82f6;
            color: white;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9fafb;
          }
          .pesos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 20px;
          }
          .peso-item {
            background: #eff6ff;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
          }
          .peso-item strong {
            color: #1e40af;
            display: block;
            margin-bottom: 5px;
          }
          .resumo {
            background: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .resumo h3 {
            color: #1e40af;
            margin-bottom: 15px;
          }
          .resumo-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; }
            .section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>📊 Relatório Calculadora Nakagawa</h1>
          <div class="periodo">
            Período: ${this.datePipe.transform(pesos.dataInicioSemestre, 'dd/MM/yyyy')} a ${this.datePipe.transform(pesos.dataFimSemestre, 'dd/MM/yyyy')}
          </div>
    `;

    // Seção de Pesos
    html += `
      <div class="section">
        <h2>⚖️ Pesos Configurados</h2>
        <div class="pesos">
          <div class="peso-item">
            <strong>Peso Alunos Geral:</strong> ${pesos.pesoAlunosSemestreGeral}
          </div>
          <div class="peso-item">
            <strong>Peso Alunos Integral:</strong> ${pesos.pesoAlunosSemestreIntegral}
          </div>
          <div class="peso-item">
            <strong>Peso Alunos Noturno:</strong> ${pesos.pesoAlunosSemestreNotuno}
          </div>
          <div class="peso-item">
            <strong>Peso Aux. Administrativos:</strong> ${pesos.pesoAuxiliaresAdministrativos}
          </div>
          <div class="peso-item">
            <strong>Peso Tercerizados:</strong> ${pesos.pesoTercerizados}
          </div>
          <div class="peso-item">
            <strong>Peso Docentes:</strong> ${pesos.pesoDocentes}
          </div>
          <div class="peso-item">
            <strong>Peso Outros:</strong> ${pesos.pesoOutros}
          </div>
          <div class="peso-item">
            <strong>Peso Eventos:</strong> ${pesos.pesoEventos}
          </div>
        </div>
      </div>
    `;

    // Seção Contas Sanepar
    if (metricas.contasSanepar && metricas.contasSanepar.length > 0) {
      html += `
        <div class="section">
          <h2>💧 Contas Sanepar</h2>
          <table>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Metros Cúbicos (m³)</th>
              </tr>
            </thead>
            <tbody>
      `;
      metricas.contasSanepar.forEach((conta: any) => {
        html += `
          <tr>
            <td>${this.datePipe.transform(conta.mes, 'dd/MM/yyyy')}</td>
            <td>${conta.metrosCubicos}</td>
          </tr>
        `;
      });
      const totalContas = metricas.contasSanepar.reduce((acc: number, c: any) => acc + (parseFloat(c.metrosCubicos) || 0), 0);
      html += `
            </tbody>
            <tfoot>
              <tr style="background-color: #dbeafe; font-weight: bold;">
                <td>Total</td>
                <td>${totalContas.toFixed(2)} m³</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `;
    }

    // Seção Alunos
    if (metricas.alunosSemestre && metricas.alunosSemestre.length > 0) {
      html += `
        <div class="section">
          <h2>🎓 Alunos por Semestre</h2>
          <table>
            <thead>
              <tr>
                <th>Semestre</th>
                <th>Geral</th>
                <th>Integral</th>
                <th>Noturno</th>
                <th>Início</th>
                <th>Fim</th>
              </tr>
            </thead>
            <tbody>
      `;
      metricas.alunosSemestre.forEach((aluno: any) => {
        html += `
          <tr>
            <td>${aluno.nomeSemestre}</td>
            <td>${aluno.alunosSemestreGeral}</td>
            <td>${aluno.alunosSemestreIntegral}</td>
            <td>${aluno.alunosSemestreNoturno}</td>
            <td>${this.datePipe.transform(aluno.dataInicioSemestre, 'dd/MM/yyyy')}</td>
            <td>${this.datePipe.transform(aluno.dataFimSemestre, 'dd/MM/yyyy')}</td>
          </tr>
        `;
      });
      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    // Seção Eventos
    if (metricas.eventos && metricas.eventos.length > 0) {
      html += `
        <div class="section">
          <h2>🎉 Eventos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome do Evento</th>
                <th>N° Estimado de Pessoas</th>
                <th>Data Início</th>
                <th>Data Fim</th>
              </tr>
            </thead>
            <tbody>
      `;
      metricas.eventos.forEach((evento: any) => {
        html += `
          <tr>
            <td>${evento.nomeEvento}</td>
            <td>${evento.numeroEstimadoPessoas}</td>
            <td>${this.datePipe.transform(evento.eventoDataInicio, 'dd/MM/yyyy')}</td>
            <td>${this.datePipe.transform(evento.eventoDataFim, 'dd/MM/yyyy')}</td>
          </tr>
        `;
      });
      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    // Seção Outros
    if (metricas.outros && metricas.outros.length > 0) {
      html += `
        <div class="section">
          <h2>👥 Outros Colaboradores</h2>
          <table>
            <thead>
              <tr>
                <th>Apelido</th>
                <th>Aux. Administrativos</th>
                <th>Tercerizados</th>
                <th>Docentes</th>
                <th>Período Início</th>
                <th>Período Fim</th>
              </tr>
            </thead>
            <tbody>
      `;
      metricas.outros.forEach((outro: any) => {
        html += `
          <tr>
            <td>${outro.apelido}</td>
            <td>${outro.auxiliaresAdministrativos || 0}</td>
            <td>${outro.tercerizados || 0}</td>
            <td>${outro.docentes || 0}</td>
            <td>${outro.periodoInicio ? this.datePipe.transform(outro.periodoInicio, 'dd/MM/yyyy') : '-'}</td>
            <td>${outro.periodoFim ? this.datePipe.transform(outro.periodoFim, 'dd/MM/yyyy') : '-'}</td>
          </tr>
        `;
      });
      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    // Resumo
    html += `
      <div class="resumo">
        <h3>📋 Resumo do Relatório</h3>
        <div class="resumo-item">
          <span><strong>Total de Contas Sanepar:</strong></span>
          <span>${metricas.contasSanepar?.length || 0}</span>
        </div>
        <div class="resumo-item">
          <span><strong>Total de Semestres:</strong></span>
          <span>${metricas.alunosSemestre?.length || 0}</span>
        </div>
        <div class="resumo-item">
          <span><strong>Total de Eventos:</strong></span>
          <span>${metricas.eventos?.length || 0}</span>
        </div>
        <div class="resumo-item">
          <span><strong>Total de Outros Registros:</strong></span>
          <span>${metricas.outros?.length || 0}</span>
        </div>
      </div>
    `;

    html += `
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    // Abrir em nova janela para impressão
    const janela = window.open('', '_blank');
    if (janela) {
      janela.document.write(html);
      janela.document.close();
    } else {
      this.showToastMessage("Por favor, permita pop-ups para gerar o relatório", TipoAlerta.ERRO);
    }
  }

  showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1500) {
    this.toastMensagem = mensagem;
    this.tipoAlerta = tipo;
    this.showToast = true;
    setTimeout(() => this.showToast = false, duration);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['dataInicio'] && this.dataInicio) || (changes['dataFim'] && this.dataFim)) {
      this.getAllDados(this.dataInicio, this.dataFim);
    }
  }

  // ---------GETTERS FORMULARIOS ---------

  get contasFormArray(): FormArray {
    return this.formMetricas.get('contasSanepar') as FormArray;
  }

  get eventosFormArray(): FormArray {
    return this.formMetricas.get('eventos') as FormArray;
  }

  get alunosFormArray(): FormArray {
    return this.formMetricas.get('alunosSemestre') as FormArray;
  }

  get outroFormArray(): FormArray {
    return this.formMetricas.get('outros') as FormArray;
  }

  // ---------- FORM BUILDERS ----------

  private createContasSaneparFormGroup(conta: IntarefaceContaSanepar): FormGroup {
    return this.formBuilder.group({
      id: [conta.id],
      mes: [this.datePipe.transform(conta.mes, 'yyyy-MM-dd'), Validators.required],
      metrosCubicos: [conta.metros_cubicos, Validators.required]
    });
  }

  private createEventosFormGroup(evento: InterfaceEvento): FormGroup {
    return this.formBuilder.group({
      id: [evento.id],
      nomeEvento: [evento.nome_evento, Validators.required],
      numeroEstimadoPessoas: [evento.numero_estimado_pessoas, Validators.required],
      eventoDataInicio: [this.datePipe.transform(evento.data_inicio, 'yyyy,MM-dd'), Validators.required],
      eventoDataFim: [this.datePipe.transform(evento.data_fim, 'yyyy-MM-dd'), Validators.required]
    })
  }

  private createAlunosFormGroup(aluno: InterfaceAlunosSemestres): FormGroup {
    return this.formBuilder.group({
      id: [aluno.id],
      alunosSemestreGeral: [aluno.quantidade_alunos_geral, Validators.required],
      alunosSemestreIntegral: [aluno.quantidade_alunos_integral, Validators.required],
      alunosSemestreNoturno: [aluno.quantidade_alunos_noturnos, Validators.required],
      dataInicioSemestre: [this.datePipe.transform(aluno.data_inicio_semestre, 'yyyy-MM-dd'), Validators.required],
      dataFimSemestre: [this.datePipe.transform(aluno.data_fim_semestre, 'yyyy-MM-dd'), Validators.required],
      nomeSemestre: [aluno.nome_semestre, Validators.required]
    });
  }

  private createOutrosFormGroup(outro: IntefaceOutros): FormGroup {
    return this.formBuilder.group({
      id: [outro.id],
      apelido: [outro.apelido, Validators.required],
      auxiliaresAdministrativos: [outro.auxiliares_administrativos ?? 0],
      tercerizados: [outro.tercerizados ?? 0],
      docentes: [outro.docentes ?? 0],
      periodoInicio: this.datePipe.transform(outro.periodo_inicio, "yyyy-MM-dd"),
      periodoFim: this.datePipe.transform(outro.periodo_fim, "yyyy-MM-dd")
    })
  };

  // ---------- SERVICES ----------

  private getAllDados(dataInicio: string, dataFim: string) {
    if (!dataInicio || !dataFim) {
      return;
    }

    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    this.getContasSanepar(inicio, fim);
    this.getEventos(inicio, fim);
    this.getAlunos(inicio, fim);
    this.getOutros(inicio, fim);
  }

  private getContasSanepar(inicio: Date, fim: Date) {
    this.contasSaneparService.getContasByIntervaloData(inicio, fim).subscribe(contas => {
      this.listaContaSanapear = contas;

      const formArray = this.contasFormArray;
      formArray.clear();

      this.listaContaSanapear.forEach(conta => {
        const grupo = this.createContasSaneparFormGroup(conta);
        formArray.push(grupo);
      })
    });
  }

  private getEventos(dataInicio: Date, dataFim: Date) {
    this.eventosService.getEventosByIntervaloData(dataInicio, dataFim).subscribe(eventos => {
      this.listaEventos = eventos;
      const formArray = this.eventosFormArray;
      formArray.clear();

      this.listaEventos.forEach(evento => {
        const group = this.createEventosFormGroup(evento);
        formArray.push(group);
      })
    })
  }

  private getAlunos(dataInicio: Date, dataFim: Date) {
    this.alunosService.getByIntervaloData(dataInicio, dataFim).subscribe(alunos => {
      this.listaAlunos = alunos;
      const formArray = this.alunosFormArray;
      formArray.clear();

      this.listaAlunos.forEach(aluno => {
        const group = this.createAlunosFormGroup(aluno);
        formArray.push(group);
      })
    })
  }

  private getOutros(dataInicio: Date, dataFim: Date) {
    this.outrosServices.getByIntervaloData(dataInicio, dataFim).subscribe(outros => {
      this.listaOutros = outros;
      const formArray = this.outroFormArray;
      formArray.clear();

      this.listaOutros.forEach(outro => {
        const group = this.createOutrosFormGroup(outro);
        formArray.push(group);
      })
    })
  }

}
