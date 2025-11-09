import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject } from 'rxjs';
import { PerfilModel } from '../services/models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private pb = new PocketBase('http://127.0.0.1:8090');
  private perfilSubject = new BehaviorSubject<PerfilModel | null>(null);
  perfil$ = this.perfilSubject.asObservable();

  constructor() {
    this.carregarPerfil();
  }

  async carregarPerfil(): Promise<PerfilModel | null> {
    try {
      const perfil = await this.pb.collection('perfis').getFirstListItem('');
      this.perfilSubject.next(perfil as unknown as PerfilModel);
      return perfil as unknown as PerfilModel;
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      return null;
    }
  }

  async salvarPerfil(dados: PerfilModel): Promise<PerfilModel> {
    try {
      let perfil = this.perfilSubject.value;

      if (perfil && perfil.id) {
        perfil = await this.pb.collection('perfis').update(perfil.id, dados) as unknown as PerfilModel;
      } else {
        perfil = await this.pb.collection('perfis').create(dados) as unknown as PerfilModel;
      }

      this.perfilSubject.next(perfil);
      return perfil;
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      throw error;
    }
  }
}
