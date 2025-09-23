import { Component } from '@angular/core';
import { Logo } from '../shared/components/logo/logo';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from '../shared/components/button/button';
import { Toast } from '../shared/components/toast/toast';
import { TipoAlerta } from '../shared/components/toast/toast.enum';
import { PocketBaseService } from '../services/pocketbase.service';

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

  // <-- expõe o enum para o template
  TipoAlerta = TipoAlerta;

  constructor(private fb: FormBuilder,private pbService: PocketBaseService) {

    this.form = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit():void {
    if (this.form.valid) {
      this.showToast = false;
      this.pbService.login(this.form.value.login,this.form.value.senha);
    } else {
      this.showToast = true;
      setTimeout(() => this.showToast = false, 1000);
    }
  }
}
