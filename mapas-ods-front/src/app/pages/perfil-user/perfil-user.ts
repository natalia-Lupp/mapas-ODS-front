import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module/shared.module';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './perfil-user.html',
  styleUrls: ['./perfil-user.css']
})
export class PerfilUser {
  perfil = {
    nome: '',
    email: '',
    unidade: '',
    descricao: ''
  };

  unidades = ['Guarapuava', 'Curitiba', 'Pato Branco', 'Campo Mourão'];

  salvar() {
    console.log('Dados salvos:', this.perfil);
  }

  voltar() {
    window.history.back();
  }
}
