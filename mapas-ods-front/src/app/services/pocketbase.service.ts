import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { BASE_URLS } from './conts';

@Injectable({
  providedIn: 'root'
})

// ignorar alguns comentarios da ia que qd fui corrigir pra ver se tinha erro ela colocou uns e ñ ficou ruim
export class PocketBaseService {
  pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(BASE_URLS.URL_POCKETBASE);

    //Recupera o auth do localStorage ao iniciar
    const storedAuth = localStorage.getItem('pb_auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        // Tenta carregar a sessão salva
        this.pb.authStore.save(parsed.token, parsed.model);
      } catch (err) {
        console.warn('Erro ao carregar sessão do localStorage:', err);
      }
    }

    // 🧠 Sempre que o estado mudar (login/logout ou token refresh), salva no localStorage
    this.pb.authStore.onChange(() => {
      const data = {
        token: this.pb.authStore.token,
        model: this.pb.authStore.model
      };
      localStorage.setItem('pb_auth', JSON.stringify(data));
    });
  }

  async login(email: string, pwd: string): Promise<string> {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, pwd);
      // NOTE: Não é mais necessário salvar no localStorage aqui,
      // pois o pb.authStore.onChange() já fará isso automaticamente após o sucesso.
      return authData.token;
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      this.pb.authStore.clear();
      localStorage.removeItem('pb_auth');
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  isAuthenticated(): boolean {
    return this.pb.authStore.isValid;
  }

  getUser(): any {
    return this.pb.authStore.model;
  }
}