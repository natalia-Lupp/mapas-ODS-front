import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunosServices } from '../../../services/database/alunos.service';
import { InterfaceAlunosSemestres } from '../../../services/models/alunosSemestre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';

@Component({
  selector: 'app-alunos-semestre',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './form-alunos-semestre.html',
  styleUrl: './form-alunos-semestre.css'
})
export class FormAlunosSemestre implements OnInit {

  alunosSemestres: InterfaceAlunosSemestres[] = [];
  formAlunosSemestre!: FormGroup;
  showToast = false;
  toastMensagem = "";
  tipoAlertaToast = TipoAlerta.SUCESSO;

  constructor(private router: Router, private alunosService: AlunosServices, private formBuilder: FormBuilder) {
    this.formAlunosSemestre = this.formBuilder.group({
      alunosSemestreGeral: ["", Validators.required],
      alunosSemestreIntegral: ["", Validators.required],
      alunosSemestreNoturno: ["", Validators.required],
      dataInicioSemestre: ["", Validators.required],
      dataFimSemestre: ["", Validators.required],
      nomeSemestre: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllAlunosSemestres();
  }

  salvar() {
    if (!this.formAlunosSemestre.valid) {
      this.showToastMessage("Verifique os dados", TipoAlerta.AVISO);
      return;
    }
    let alunosSemestreData: InterfaceAlunosSemestres = {
      quantidade_alunos_geral: this.formAlunosSemestre.value.alunosSemestreGeral,
      quantidade_alunos_integral: this.formAlunosSemestre.value.alunosSemestreIntegral,
      quantidade_alunos_noturnos: this.formAlunosSemestre.value.alunosSemestreNoturno,
      nome_semestre: this.formAlunosSemestre.value.nomeSemestre,
      data_inicio_semestre: this.formAlunosSemestre.value.dataInicioSemestre,
      data_fim_semestre: this.formAlunosSemestre.value.dataFimSemestre
    };

    this.alunosService.create(alunosSemestreData).subscribe({
      next: (data) => {
        this.showToastMessage("Dados Salvos com Sucesso", TipoAlerta.SUCESSO);
      },
      error: (err) => {
        console.error(err);
        this.showToastMessage("Erro Ao Salvar Dados", TipoAlerta.AVISO);
      }
    })
  }

  back() { }

  getAllAlunosSemestres() {
    return this.alunosService.getAll().subscribe({
      next: (data) => {
        this.alunosSemestres = data;
      },
      error: (err) => {
        console.error({ ERRO_GET_ALL_ALUNOS_SEMESTRE: err })
      }
    })
  }

  private showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1000) {
    this.toastMensagem = mensagem;
    this.tipoAlertaToast = tipo;
    this.showToast = true;
    setTimeout(() => this.showToast = false, duration);
  }
}
