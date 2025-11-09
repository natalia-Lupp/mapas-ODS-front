import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventosService } from '../../../services/database/eventos.service';
import { InterfaceEvento } from '../../../services/models/evento';
import { Toast } from '../../../shared/components/toast/toast';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';
import { SharedModule } from '../../../../app/shared/shared.module/shared.module';

@Component({
  selector: 'app-form-eventos',
  imports: [ReactiveFormsModule, Toast, SharedModule],
  standalone: true,
  templateUrl: './form-eventos.html',
  styleUrl: './form-eventos.css',
  providers: [DatePipe]
})
export class FormEventos implements OnInit {

  eventoForm: FormGroup;
  showToast = false;
  toastMensagem = "";
  tipoAlerta: TipoAlerta = TipoAlerta.SUCESSO;
  eventoId?: string;

  constructor(private http: HttpClient, private eventoService: EventosService, private router: Router, private route: ActivatedRoute, private dataPipe: DatePipe) {
    this.eventoForm = new FormGroup({
      nome_evento: new FormControl("", [Validators.required, Validators.minLength(3)]),
      numero_estimado_pessoas: new FormControl("", [Validators.required]),
      data_inicio: new FormControl("", [Validators.required]),
      data_fim: new FormControl("", [Validators.required]),
      descricao_evento: new FormControl("")
    });
  }


  private validarData(): boolean {
    const dataInicio = new Date(this.eventoForm.value.data_inicio);
    const dataFim = new Date(this.eventoForm.value.data_fim);

    if (dataFim < dataInicio) {
      return false;
    }
    return true;
  }

  back(): void {
    this.router.navigate(['eventos']);
  }

  salvar(): void {

    if (!this.eventoForm || !this.validarData()) {
      this.showToast = true;
      this.showToastMessage('Verifique os dados informados', TipoAlerta.ERRO);
      return;
    };

    const data: InterfaceEvento = {
      nome_evento: this.eventoForm.value.nome_evento,
      numero_estimado_pessoas: this.eventoForm.value.numero_estimado_pessoas,
      data_inicio: this.eventoForm.value.data_inicio,
      data_fim: this.eventoForm.value.data_fim,
      descricao_evento: this.eventoForm.value.descricao_evento
    }

    this.eventoService.create(data).subscribe({
      next: () => {
        this.showToast = true;
        this.showToastMessage("Evento Cadastrado Com Sucesso", TipoAlerta.SUCESSO, 1500);
        this.router.navigate(["eventos"]);
      },
      error: (err) => {
        this.showToast = true;
        console.error(err);
        this.showToastMessage('Não foi Possivel Salvar Evento', TipoAlerta.ERRO);
      }
    })
  }

  showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1500) {
    this.toastMensagem = mensagem;
    this.tipoAlerta = tipo;
    this.showToast = true;
    setTimeout(() => this.showToast = false, duration);
  }


  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get("id") ?? undefined;

    if (this.eventoId) {
      this.eventoService.getById(this.eventoId).subscribe({
        next: (evento) => {
          this.eventoForm.patchValue({
            nome_evento: evento.nome_evento,
            numero_estimado_pessoas: evento.numero_estimado_pessoas,
            data_inicio: this.dataPipe.transform(evento.data_inicio, "yyyy-MM-dd"),
            data_fim: this.dataPipe.transform(evento.data_fim, "yyyy-MM-dd"),
            descricao_evento: evento.descricao_evento
          })
        }
      })
    }
  }
}
