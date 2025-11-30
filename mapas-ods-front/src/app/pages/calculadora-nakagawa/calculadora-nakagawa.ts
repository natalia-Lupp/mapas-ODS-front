import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabelaNakagawa } from './tabela-nakagawa/tabela-nakagawa';
import { SharedModule } from '../../shared/shared.module/shared.module';
@Component({
  selector: 'app-calculadora-nakagawa',
  imports: [CommonModule, ReactiveFormsModule, TabelaNakagawa, SharedModule],
  templateUrl: './calculadora-nakagawa.html',
  styleUrl: './calculadora-nakagawa.css'
})
export class CalculadoraNakagawa implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  formPeso!: FormGroup;

  ngOnInit(): void {
    this.formPeso = this.formBuilder.group({
      dataInicioSemestre: ["", Validators.required],
      dataFimSemestre: ["", Validators.required]
    })
  }

}
