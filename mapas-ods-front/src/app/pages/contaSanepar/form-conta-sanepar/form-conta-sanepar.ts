import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IntarefaceContaSanepar } from '../../../services/models/contaSanepar';
import { ContaSaneparService } from '../../../services/database/contaSanepar.service';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';
import { Toast } from '../../../shared/components/toast/toast';

@Component({
  selector: 'app-form-conta-sanepar',
  standalone: true,
  imports: [ReactiveFormsModule, Toast],
  templateUrl: './form-conta-sanepar.html',
  styleUrl: './form-conta-sanepar.css'
})

export class FormContaSanepar implements OnInit {

  contaSaneparForm: FormGroup;
  showToast = false;
  toastMensagem = "";
  tipoAlertaToast: TipoAlerta = TipoAlerta.SUCESSO;

  constructor(private http: HttpClient, private router: Router, private contaSaneparService: ContaSaneparService) {
    this.contaSaneparForm = new FormGroup({
      mes: new FormControl("", [Validators.required]),
      metrosCubicos: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {

  };

  back(): void {
    this.router.navigate(['/contas-sanepar']);
  }

  //TODO ajustar para aparecer o TOAST de erro
  store() {
    if (this.contaSaneparForm.invalid) {
      this.showToastMessage("Verifique os Dados", TipoAlerta.ERRO, 2000);
      return;
    }
    const data: IntarefaceContaSanepar = {
      mes: this.contaSaneparForm.value.mes,
      metros_cubicos: this.contaSaneparForm.value.metrosCubicos,
    }

    this.contaSaneparService.create(data).subscribe({
      next: () => {
        this.showToastMessage("Conta registrada com sucesso!", TipoAlerta.SUCESSO);
        this.contaSaneparForm.reset();
        this.router.navigate(['/contas-sanepar']);
      },
      error: (err) => {
        console.error(err);
        this.showToastMessage("Erro ao registrar conta", TipoAlerta.ERRO);
      }
    });
  }

  showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1000) {
    this.toastMensagem = mensagem;
    this.tipoAlertaToast = tipo;
    this.showToast = true;

    setTimeout(() => this.showToast = false, duration);
  }


}
