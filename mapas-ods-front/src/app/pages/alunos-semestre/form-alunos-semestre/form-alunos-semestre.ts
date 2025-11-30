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

  constructor(
    private router: Router,
    private alunosService: AlunosServices,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
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
        });
      },
      error: (err) => console.log(err)
    });
  }

  salvar() {
    if (!this.formAlunosSemestre.valid) {
      this.showToastMessage("Verifique os dados", TipoAlerta.AVISO);
      return;
    }

    const alunosSemestreData: InterfaceAlunosSemestres = {
      quantidade_alunos_geral: this.formAlunosSemestre.value.alunosSemestreGeral,
      quantidade_alunos_integral: this.formAlunosSemestre.value.alunosSemestreIntegral,
      quantidade_alunos_noturnos: this.formAlunosSemestre.value.alunosSemestreNoturno,
      nome_semestre: this.formAlunosSemestre.value.nomeSemestre,
      data_inicio_semestre: this.formAlunosSemestre.value.dataInicioSemestre,
      data_fim_semestre: this.formAlunosSemestre.value.dataFimSemestre
    };

    // 🔥 SE FOR CADASTRO
    if (!this.alunosSemestreId) {
      this.alunosService.create(alunosSemestreData).subscribe({
        next: () => {
          this.showToastMessage("Dados Salvos com Sucesso", TipoAlerta.SUCESSO);

          setTimeout(() => {
            this.router.navigate(["/adm/alunos-semestre"]);
          }, 900);
        },
        error: () => {
          this.showToastMessage("Erro Ao Salvar Dados", TipoAlerta.ERRO);
        }
      });
      return;
    }

    // 🔥 SE FOR ATUALIZAÇÃO
    this.alunosService.update(this.alunosSemestreId, alunosSemestreData).subscribe({
      next: () => {
        this.showToastMessage("Dados Atualizados com Sucesso", TipoAlerta.SUCESSO);

        setTimeout(() => {
          this.router.navigate(["/adm/alunos-semestre"]);
        }, 900);
      },
      error: () => {
        this.showToastMessage("Erro Ao Atualizar Dados", TipoAlerta.ERRO);
      }
    });
  }

  back(): void {
    this.router.navigate(['/adm/alunos-semestre']);
  }

  private showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1200) {
    this.toastMensagem = mensagem;
    this.tipoAlertaToast = tipo;
    this.showToast = true;

    setTimeout(() => (this.showToast = false), duration);
  }
}
