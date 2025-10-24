import { Component, Input, OnInit } from '@angular/core';
import { IntarefaceContaSanepar } from '../../../services/models/contaSanepar';
import { ContaSaneparService } from '../../../services/database/contaSanepar.service';

@Component({
  selector: 'app-tabela-nakagawa',
  standalone: true,
  templateUrl: './tabela-nakagawa.html',
  styleUrls: ['./tabela-nakagawa.css']
})
export class TabelaNakagawa implements OnInit {
  @Input() dataInicio!: string;
  @Input() dataFim!: string;

  contasSanepar: IntarefaceContaSanepar[] = [];

  constructor(private contasSaneparService: ContaSaneparService) {}

  ngOnInit() {
    this.getContasSanepar();
  }

  private getContasSanepar() {
    if (!this.dataInicio || !this.dataFim) return;

    const inicio = new Date(this.dataInicio);
    const fim = new Date(this.dataFim);

    this.contasSaneparService
      .getContasByIntervaloData(inicio, fim)
      .subscribe(contas => {
        this.contasSanepar = contas;
        console.log('Contas filtradas:', contas);
      });
  }
}
