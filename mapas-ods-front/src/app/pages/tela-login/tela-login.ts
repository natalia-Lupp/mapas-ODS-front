import { Component } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from '../../shared/components/button/button';
import { Toast } from '../../shared/components/toast/toast';
import { TipoAlerta } from '../../shared/components/toast/toast.enum';
import { PocketBaseService } from '../../services/pocketbase.service';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Logo, Button, Toast],
  templateUrl: './tela-login.html',
  styleUrls: ['./tela-login.css']
})
export class TelaLogin {
  form: FormGroup;
  showToast = false;
  TipoAlerta = TipoAlerta;

  constructor(
    private fb: FormBuilder,
    private pbService: PocketBaseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.showToast = false;

      try {
        // 🔹 Agora login() retorna apenas o token (string)
        const token = await this.pbService.login(
          this.form.value.login,
          this.form.value.senha
        );

        // 🔹 Salva o token no AuthService
        this.authService.setToken(token);

        // 🔹 Redireciona para o dashboard
        this.router.navigate(['/dashboard-adm']);
      } catch (error) {
        console.error('Erro no login:', error);
        this.showToast = true;
        setTimeout(() => (this.showToast = false), 2000);
      }

    } else {
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 1000);
    }
  }
}
