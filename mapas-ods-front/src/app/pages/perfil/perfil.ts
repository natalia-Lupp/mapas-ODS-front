import { Component } from '@angular/core'; // Removido OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module/shared.module';
import { PerfilService } from '../../services/perfil.service';
import { PerfilModel } from '../../services/models/perfil';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
// Removido 'implements OnInit'
export class Perfil { 
  perfil: PerfilModel = {
    nome: '',
    email: '',
    unidade: '',
    descricao: '',
    imagem: ''
  };

  unidades = ['Guarapuava', 'Curitiba', 'Pato Branco', 'Campo Mourão'];

  constructor(private perfilService: PerfilService) {
    // 1. O construtor chama o método assíncrono.
    this.perfilService.carregarPerfil()
      .then(perfilCarregado => {
        // 2. Quando a Promise resolve, o perfil é atualizado.
        if (perfilCarregado) {
          this.perfil = perfilCarregado;
        }
      })
      .catch(err => {
         console.error('Erro ao carregar perfil no construtor:', err);
         // O 'perfil' continuará com os valores vazios.
      });
  }

  async salvar() {
    try {

      await this.perfilService.salvarPerfil(this.perfil);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar perfil.');
    }
  }

  voltar() {
    window.history.back();
  }
}