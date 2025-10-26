import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventosService } from '../../services/database/eventos.service';
import { InterfaceEvento } from '../../services/models/evento';
import { TipoAlerta } from '../../shared/components/toast/toast.enum';
import { Toast } from '../../shared/components/toast/toast';

@Component({
  selector: 'app-eventos',
  imports: [CommonModule, Toast],
  standalone: true,
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class Eventos implements OnInit {
  showToast = false;
  toastMessagem = "";
  tipoAlertaToast: TipoAlerta = TipoAlerta.SUCESSO;
  listaEventos: InterfaceEvento[] = [];

  constructor(private router: Router, private eventoService: EventosService) { }

  ngOnInit(): void {
    this.getEventos();
  }

  cadastrar(): void {
    this.router.navigate(["cadastrar-evento"]);
  }


  private getEventos() {
    this.eventoService.getAll().subscribe({
      next: (data) => {
        this.listaEventos = data;
        console.log(this.listaEventos);
        this.showToastMessage("Dados carregados com sucesso", TipoAlerta.SUCESSO);
      },
      error: (err) => {
        console.error("erro ao carregar Dados", err);
        this.showToastMessage('Erro ao carregar dados', TipoAlerta.ERRO);
      }
    })
  }

  atualizarEvento(idEvento?: string): void {
    if (!idEvento) {
      this.showToastMessage('Erro ao atualizar evento', TipoAlerta.ERRO);
      return;
    }
    this.router.navigate(['gerenciar-evento', idEvento]);
  }

  deletarEvento(idEvento?: string) {
    if (!idEvento) {
      this.showToastMessage('Erro ao deletar evento', TipoAlerta.ERRO);
      return;
    }
    this.eventoService.delete(idEvento).subscribe({
      next: () => {
        this.showToastMessage("Evento Deletado com sucesso", TipoAlerta.SUCESSO);
        this.getEventos();
      },
      error: (err) => {
        console.log("erro ao deletar evento", err);
        this.showToastMessage('Erro ao deletar evento', TipoAlerta.ERRO);
      }
    })
  }

  showToastMessage(mensagem: string, tipo: TipoAlerta, duration = 1000) {
    this.toastMessagem = mensagem;
    this.tipoAlertaToast = tipo;
    this.showToast = true;
    setTimeout(() => this.showToast = false, duration);
  }
}
