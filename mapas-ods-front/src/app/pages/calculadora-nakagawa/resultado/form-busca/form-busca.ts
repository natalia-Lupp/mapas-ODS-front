import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Resumo } from '../resumo/resumo';

@Component({
  selector: 'app-form-busca',
  standalone: true,
  imports: [ReactiveFormsModule, Resumo],
  templateUrl: './form-busca.html',
  styleUrls: ['./form-busca.css']
})
export class FormBusca implements OnInit {

  formData!: FormGroup;

  constructor(private fB: FormBuilder) { }

  ngOnInit(): void {
    this.formData = this.fB.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]
    });
  }
}
