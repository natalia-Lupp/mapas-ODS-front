import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tabela-nakagawa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast,],
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
      nomeCustomizado: new FormControl("",[Validators.required]),
      contasSanepar: this.formBuilder.array([]),
      eventos: this.formBuilder.array([]),
      alunosSemestre: this.formBuilder.array([]),
      outros: this.formBuilder.array([]),
    });
  }


  async salvar(): Promise<void> {

    const metricas = this.formMetricas.value;
    const totalLitros = await this.getTotalContasSanepar();
    const outrosObj: {
      somaAuxAdministrativos: number;
      somaTercerizados: number;
      somaDocentes: number;
    } | number = await this.getTotalOutros();
    const totalPessoasEventos = await this.getTotalPessoasEventos();
    const totalAlunos: {
      somatoriaAlunosGeral: number;
      somatoriaAlunosIntegral: number;
      somatoriaAlunosNoturnos: number;
    } | number = await this.getTotalAlunosSemestre();

    //xaxho 
    const metricasParaSalvar: InterfaceMetricas = {
      nome_customizado:metricas.nomeCustomizado,
      contas_sanepars: metricas.contasSanepar.map((c: any) => c.id),
      eventos: metricas.eventos.map((e: any) => e.id),
      outros: metricas.outros.map((o: any) => o.id),
      alunos_semestres: metricas.alunosSemestre.map((a: any) => a.id),
      id_infra: "4ax9ctltmd4mj34", //valor sempre fixo tem que ajustar isso por horas vai assim mesmo
      data_inicio_periodo: this.formPeso.value?.dataInicioSemestre,
      data_fim_periodo: this.formPeso.value?.dataFimSemestre,
      consumo_total_agua: totalLitros,
      total_pessoas_eventos: totalPessoasEventos ?? 0,
      total_auxiliares_administrativos: outrosObj.somaAuxAdministrativos,
      total_tercerizados: outrosObj.somaTercerizados,
      total_docentes: outrosObj.somaDocentes,
      total_alunos_geral: totalAlunos.somatoriaAlunosGeral,
      total_alunos_integral: totalAlunos.somatoriaAlunosIntegral,
      total_alunos_noturnos: totalAlunos.somatoriaAlunosNoturnos
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


  // --------- SOMATORIAS --------

  private async getTotalContasSanepar(): Promise<number> {
    try {
      const ids = this.formMetricas
        .get('contasSanepar')!
        .value
        .map((c: any) => c.id);

      return await firstValueFrom(this.metricasService.somaContasSanepar(ids));
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  private async getTotalPessoasEventos(): Promise<number> {
    try {
      const ids = this.formMetricas
        .get('eventos')!
        .value
        .map((e: any) => e.id);

      return await firstValueFrom(this.metricasService.somaEventos(ids));
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  private async getTotalOutros(): Promise<{somaAuxAdministrativos: number;somaTercerizados: number;somaDocentes: number;}> {
    try {
      const ids = this.formMetricas
        .get('outros')!
        .value
        .map((o: any) => o.id);

      return await firstValueFrom(this.metricasService.somaOutros(ids));
    } catch (e) {
      console.error(e);
      return {
        somaAuxAdministrativos: 0,
        somaTercerizados: 0,
        somaDocentes: 0
      };
    }
  }

  private async getTotalAlunosSemestre(): Promise<{somatoriaAlunosGeral: number;somatoriaAlunosIntegral: number;somatoriaAlunosNoturnos: number; }> {
    try {
      const ids = this.formMetricas
        .get('alunosSemestre')!
        .value
        .map((a: any) => a.id);

      return await firstValueFrom(this.metricasService.somaAlunos(ids));
    } catch (e) {
      console.error(e);
      return {
        somatoriaAlunosGeral: 0,
        somatoriaAlunosIntegral: 0,
        somatoriaAlunosNoturnos: 0
      };
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
