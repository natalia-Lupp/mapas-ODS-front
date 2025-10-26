import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContaSaneparService } from '../../../services/database/contaSanepar.service';
import { IntarefaceContaSanepar } from '../../../services/models/contaSanepar';
import { EventosService } from '../../../services/database/eventos.service';
import { InterfaceEvento } from '../../../services/models/evento';
import { InterfaceAlunosSemestres } from '../../../services/models/alunosSemestre';
import { AlunosServices } from '../../../services/database/alunos.service';
import { OutrosService } from '../../../services/database/outros.service';
import { IntefaceOutros } from '../../../services/models/outros';

@Component({
  selector: 'app-tabela-nakagawa',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tabela-nakagawa.html',
  styleUrls: ['./tabela-nakagawa.css'],
  providers: [DatePipe]
})
export class TabelaNakagawa implements OnChanges, OnInit {
  @Input() dataInicio!: string;
  @Input() dataFim!: string;

  listaContaSanapear: IntarefaceContaSanepar[] = [];
  listaEventos: InterfaceEvento[] = [];
  listaAlunos: InterfaceAlunosSemestres[] = [];
  listaOutros: IntefaceOutros[] = [];
  formMetricas!: FormGroup;
  formArrayTabela!: FormArray;

  constructor(private contasSaneparService: ContaSaneparService, private eventosService: EventosService, private alunosService: AlunosServices, private outrosServices: OutrosService, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.formMetricas = this.formBuilder.group({
      contasSanepar: this.formBuilder.array([]),
      eventos: this.formBuilder.array([]),
      alunosSemestre: this.formBuilder.array([]),
      outros: this.formBuilder.array([])
    });
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
      mes: [this.datePipe.transform(conta.mes, 'yyyy-MM-dd'), Validators.required],
      metrosCubicos: [conta.metros_cubicos, Validators.required]
    });
  }

  private createEventosFormGroup(evento: InterfaceEvento): FormGroup {
    return this.formBuilder.group({
      nomeEvento: [evento.nome_evento, Validators.required],
      numeroEstimadoPessoas: [evento.numero_estimado_pessoas, Validators.required],
      eventoDataInicio: [this.datePipe.transform(evento.data_inicio, 'yyyy,MM-dd'), Validators.required],
      eventoDataFim: [this.datePipe.transform(evento.data_fim, 'yyyy-MM-dd'), Validators.required]
    })
  }

  private createAlunosFormGroup(aluno: InterfaceAlunosSemestres): FormGroup {
    return this.formBuilder.group({
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
