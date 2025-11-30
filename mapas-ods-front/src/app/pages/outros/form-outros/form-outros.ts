import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IntefaceOutros } from '../../../services/models/outros';
import { ActivatedRoute, Router } from '@angular/router';
import { OutrosService } from '../../../services/database/outros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module/shared.module';
import { Toast } from '../../../shared/components/toast/toast';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';
import { OnlyNumbersDirective } from '../../../shared/components/directives/only-numbers.directive';

@Component({
  selector: 'app-form-outros',
  imports: [ReactiveFormsModule, CommonModule, SharedModule, Toast, OnlyNumbersDirective],
  templateUrl: './form-outros.html',
  styleUrls: ['./form-outros.css'],
  providers: [DatePipe]
})
export class FormOutros implements OnInit {

  formOutro!: FormGroup;
  outroId?: string;
  outroModel?: IntefaceOutros;

  // 🔥 Variáveis do Toast
  toastVisivel = false;
  toastMensagem = "";
toastTipo: TipoAlerta = TipoAlerta.SUCESSO; // mais um toast que quebrou e só avisou qd ta nos 42 do segundo tempo


  constructor(
    private router: Router,
    private outrosService: OutrosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.formOutro = this.formBuilder.group({
      apelido: ["", Validators.required],
      auxiliaresAdministrativos: [""],
      tercerizados: [""],
      docentes: [""],
      periodoInicio: ["", Validators.required],
      periodoFim: ["", Validators.required]
    });

    this.outroId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.outroId) {
      this.getDadoOutro(this.outroId).subscribe({
        next: (data: IntefaceOutros) => {
          this.outroModel = data;
          this.formOutro.patchValue({
            apelido: data.apelido,
            auxiliaresAdministrativos: data.auxiliares_administrativos ?? 0,
            tercerizados: data.tercerizados ?? 0,
            docentes: data.docentes ?? 0,
            periodoInicio: this.datePipe.transform(data.periodo_inicio, "yyyy-MM-dd"),
            periodoFim: this.datePipe.transform(data.periodo_fim, "yyyy-MM-dd")
          });
        }
      });
    }
  }

  private getDadoOutro(id: string): Observable<IntefaceOutros> {
    return this.outrosService.getById(id);
  }

  back(): void {
    this.router.navigate(["adm/funcionarios"]);
  }

  // Método para exibir Toast
  private mostrarToast(mensagem: string, tipo: TipoAlerta = TipoAlerta.SUCESSO) {
  this.toastMensagem = mensagem;
  this.toastTipo = tipo;
  this.toastVisivel = true;

  setTimeout(() => {
    this.toastVisivel = false;
  }, 3000);
}

  salvar(): void {
    if (this.formOutro.invalid) {
      this.formOutro.markAllAsTouched();
      return;
    }

    const outro: IntefaceOutros = {
      apelido: this.formOutro.value.apelido,
      auxiliares_administrativos: this.formOutro.value.auxiliaresAdministrativos ?? 0,
      tercerizados: this.formOutro.value.tercerizados ?? 0,
      docentes: this.formOutro.value.docentes ?? 0,
      periodo_inicio: this.formOutro.value.periodoInicio,
      periodo_fim: this.formOutro.value.periodoFim,
    };

    if (!this.outroId) {
      // Criar
      this.outrosService.create(outro).subscribe({
        next: () => {
     this.mostrarToast("Registro criado com sucesso!", TipoAlerta.SUCESSO);
          setTimeout(() => this.back(), 1500);
        },
        error: (err) => {
      this.mostrarToast("Erro ao criar registro!", TipoAlerta.ERRO);
          console.error(err);
        }
      });

    } else {
      // Atualizar
      this.outrosService.update(this.outroId, outro).subscribe({
        next: () => {
          this.mostrarToast("Registro criado com sucesso!", TipoAlerta.SUCESSO);
          setTimeout(() => this.back(), 1500);
        },
        error: (err) => {
          this.mostrarToast("Erro ao criar registro!", TipoAlerta.ERRO);
          console.error(err);
        }
      });
    }
  }
}
