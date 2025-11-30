import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { BASE_URLS } from './conts';

@Injectable({
  providedIn: 'root'
})

export class PocketBaseService {
  pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(BASE_URLS.URL_POCKETBASE);

    this.pb.authStore.onChange(() => {
      const data = {
        token: this.pb.authStore.token,
        model: this.pb.authStore.model
      };
      localStorage.setItem('pb_auth', JSON.stringify(data));
    });
  }
  
loadSession(): Promise<void> {
  return new Promise((resolve) => {
    
    const storedAuth = localStorage.getItem('pb_auth');
    console.log('1. APP_INITIALIZER: Iniciando loadSession. Token no localStorage?', !!storedAuth); // Verifica se tem token

    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        // Tenta carregar a sessão salva
        this.pb.authStore.save(parsed.token, parsed.model);
        
        // 🚨 NOVO LOG: Verifica o estado imediatamente após salvar
        console.log('2. PocketBase: Auth carregada. Token VÁLIDO?', this.pb.authStore.isValid); 

      } catch (err) {
        console.warn('Erro ao carregar sessão do localStorage:', err);
      }
    }
    
    // 🚨 Log antes de resolver (finalizar a espera)
    console.log('3. loadSession resolvido. Próximo passo: Router.'); 
    resolve(); 
  });
}

  async login(email: string, pwd: string): Promise<string> {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, pwd);
      // O pb.authStore.onChange() cuidará de salvar no localStorage
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