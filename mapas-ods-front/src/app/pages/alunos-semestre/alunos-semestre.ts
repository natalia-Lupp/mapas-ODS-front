import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunosServices } from '../../services/database/alunos.service';
import { InterfaceAlunosSemestres } from '../../services/models/alunosSemestre';
import { CommonModule } from '@angular/common';
import { TipoAlerta } from '../../shared/components/toast/toast.enum';
import { Toast } from '../../shared/components/toast/toast';
import { SharedModule } from '../../shared/shared.module/shared.module';

@Component({
  selector: 'app-alunos-semestre',
  standalone: true,
  imports: [CommonModule, Toast, SharedModule],
  templateUrl: './alunos-semestre.html',
  styleUrls: ['./alunos-semestre.css']
})
export class AlunosSemestre implements OnInit {

  alunosSemestres: InterfaceAlunosSemestres[] = [];
  showToast = false;
  toastMensagem = "";
  tipoAlertaToast = TipoAlerta.SUCESSO;
  alunosSemestreId: string | undefined = "";

  constructor(
    private router: Router, private alunosSemestreService: AlunosServices) { }

  ngOnInit(): void {
    this.getAlunosSemestres();
  }

  private getAlunosSemestres() {
    this.alunosSemestreService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        return this.alunosSemestres = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  cadastrar(): void {
    this.router.navigate(["cadastrar-aluno-semestre"]);
  }

  atualizar(id?: string): void {
    this.router.navigate([`atualizar-aluno-semestre/${id}`]);
  }

  deletar(id?: string): void {
    if (!id) {
      this.showToastMessage("Erro ao tentar deletar", TipoAlerta.ERRO);
      return;
    }
    this.alunosSemestreService.delete(id).subscribe({
      next: () => {
        this.showToastMessage("Registro Deletado com sucesso", TipoAlerta.SUCESSO);
        this.getAlunosSemestres();
        return;
      },
      error: (err) => {
        this.showToastMessage("Erro ao tentar deletar", TipoAlerta.ERRO);
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
