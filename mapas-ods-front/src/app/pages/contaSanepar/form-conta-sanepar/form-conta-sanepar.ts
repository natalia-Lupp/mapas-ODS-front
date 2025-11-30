import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContaSaneparService } from '../../../services/database/contaSanepar.service';
import { IntarefaceContaSanepar } from '../../../services/models/contaSanepar';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';
import { SharedModule } from '../../../shared/shared.module/shared.module';

@Component({
  selector: 'app-form-conta-sanepar',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './form-conta-sanepar.html',
  styleUrl: './form-conta-sanepar.css',
  providers: [DatePipe] // necessário para usar DatePipe no standalone
})
export class FormContaSanepar implements OnInit {

  contaSaneparForm: FormGroup;
  showToast = false;
  toastMensagem = "";
  tipoAlertaToast: TipoAlerta = TipoAlerta.SUCESSO;
  contaSaneparId?: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private contaSaneparService: ContaSaneparService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.contaSaneparForm = new FormGroup({
      mes: new FormControl("", [Validators.required]),
      metrosCubicos: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.contaSaneparId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.contaSaneparId) {
      this.contaSaneparService.getById(this.contaSaneparId).subscribe({
        next: (contaSanepar) => {
          this.contaSaneparForm.patchValue({
            mes: this.datePipe.transform(contaSanepar.mes, 'yyyy-MM-dd'),
            metrosCubicos: contaSanepar.metros_cubicos
          });
        },
        error: (err) => {
          console.error('Erro ao carregar conta:', err);
          this.showToastMessage('Erro ao carregar dados', TipoAlerta.ERRO);
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/adm/contas-sanepar']);
  }

  salvar(): void {
    if (this.contaSaneparForm.invalid) {
      this.showToastMessage("Verifique os Dados", TipoAlerta.ERRO, 2000);
      return;
    }

    const data: IntarefaceContaSanepar = {
  mes: new Date(this.contaSaneparForm.value.mes), // agora ta salvando no banco
  metros_cubicos: this.contaSaneparForm.value.metrosCubicos
};

console.log('Dados a enviar:', data); // opcional para debug

    if (this.contaSaneparId) {
      this.contaSaneparService.update(this.contaSaneparId, data).subscribe({
        next: () => {
          this.showToastMessage("Conta atualizada com sucesso!", TipoAlerta.SUCESSO);
          this.router.navigate(['/adm/contas-sanepar']);
        },
        error: (err) => {
          console.error(err);
          this.showToastMessage("Erro ao atualizar conta", TipoAlerta.ERRO);
        }
      });
    } else {
      this.contaSaneparService.create(data).subscribe({
        next: () => {
          this.showToastMessage("Conta registrada com sucesso!", TipoAlerta.SUCESSO);
          this.contaSaneparForm.reset();
          this.router.navigate(['/adm/contas-sanepar']);
        },
        error: (err) => {
          console.error(err);
          this.showToastMessage("Erro ao registrar conta", TipoAlerta.ERRO);
        }
      });
    }
  }

  showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1000) {
    this.toastMensagem = mensagem;
    this.tipoAlertaToast = tipo;
    this.showToast = true;
    setTimeout(() => this.showToast = false, duration);
  }
}
