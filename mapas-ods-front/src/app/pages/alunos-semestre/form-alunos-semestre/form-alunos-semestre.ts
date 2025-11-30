import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosServices } from '../../../services/database/alunos.service';
import { InterfaceAlunosSemestres } from '../../../services/models/alunosSemestre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';
import { Toast } from '../../../shared/components/toast/toast';
import { SharedModule } from '../../../shared/shared.module/shared.module';

@Component({
  selector: 'app-alunos-semestre',
  imports: [CommonModule, ReactiveFormsModule, Toast, SharedModule],
  standalone: true,
  templateUrl: './form-alunos-semestre.html',
  styleUrl: './form-alunos-semestre.css',
  providers: [DatePipe]
})
export class FormAlunosSemestre implements OnInit {

  alunosSemestres: InterfaceAlunosSemestres[] = [];
  formAlunosSemestre!: FormGroup;
  showToast = false;
  toastMensagem = "";
  tipoAlertaToast = TipoAlerta.SUCESSO;
  alunosSemestreId: string | undefined = "";


  constructor(private router: Router, private alunosService: AlunosServices, private formBuilder: FormBuilder, private route: ActivatedRoute, private datePipe: DatePipe) {
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
    this.alunosSemestreId = this.route.snapshot.paramMap.get("id") ?? undefined;
    if (this.alunosSemestreId) {
      this.getAlunoSemestre(this.alunosSemestreId);
    } else {
      this.getAllAlunosSemestres();
    }
  }

  private getAlunoSemestre(id: string) {
    this.alunosService.getById(id).subscribe({
      next: (data: InterfaceAlunosSemestres) => {
        this.formAlunosSemestre.patchValue({
          alunosSemestreGeral: data.quantidade_alunos_geral,
          alunosSemestreIntegral: data.quantidade_alunos_integral,
          alunosSemestreNoturno: data.quantidade_alunos_noturnos,
          dataInicioSemestre: this.datePipe.transform(data.data_inicio_semestre, "yyyy-MM-dd"),
          dataFimSemestre: this.datePipe.transform(data.data_fim_semestre, "yyyy-MM-dd"),
          nomeSemestre: data.nome_semestre
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  salvar() {
    if (!this.alunosSemestreId) {
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
    if (this.alunosSemestreId) {
      if (!this.formAlunosSemestre.valid) {
        this.showToastMessage("Verifique os dados Antes de Atualizar", TipoAlerta.ERRO);
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

      this.alunosService.update(this.alunosSemestreId, alunosSemestreData).subscribe({
        next: (data) => {
          this.showToastMessage("Dados Atualizados com Sucesso", TipoAlerta.SUCESSO);
        },
        error: (err) => {
          console.error(err);
          this.showToastMessage("Erro Ao Atualizar Dados", TipoAlerta.ERRO);
        }
      })
    }
  }

  back(): void {
    this.router.navigate(['adm/alunos-semestre']);
  }

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
