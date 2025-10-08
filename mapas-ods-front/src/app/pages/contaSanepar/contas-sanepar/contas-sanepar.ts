import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ContaSaneparService } from '../../../services/database/contaSanepar.service';
import { IntarefaceContaSanepar } from '../../../services/models/contaSanepar';
import { TipoAlerta } from '../../../shared/components/toast/toast.enum';
import { Toast } from '../../../shared/components/toast/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contas-sanepar',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './contas-sanepar.html',
  styleUrls: ['./contas-sanepar.css']
})
export class ContasSanepar implements OnInit {
  showToast = false;
  toastMensagem = '';
  tipoAlertaToast: TipoAlerta = TipoAlerta.SUCESSO;
  listaContas: IntarefaceContaSanepar[] = [];

  constructor(private contasSaneparService: ContaSaneparService, private router: Router) { }

  ngOnInit(): void {
    this.getContasSanepar();
  }

  cadastrarLeitura(): void {
    this.router.navigate(["cadastrar-leitura-sanepar"]);
  }

  private getContasSanepar() {
    this.contasSaneparService.getAll().subscribe({
      next: (data) => {
        this.listaContas = data;
        this.showToastMessage('Dados carregados com sucesso', TipoAlerta.SUCESSO);
      },
      error: (err) => {
        console.error('Erro ao buscar contas:', err);
        this.showToastMessage('Erro ao carregar dados', TipoAlerta.ERRO);
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