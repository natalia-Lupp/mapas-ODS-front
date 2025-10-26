import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabelaNakagawa } from './tabela-nakagawa/tabela-nakagawa';
@Component({
  selector: 'app-calculadora-nakagawa',
  imports: [CommonModule,ReactiveFormsModule,TabelaNakagawa],
  templateUrl: './calculadora-nakagawa.html',
  styleUrl: './calculadora-nakagawa.css'
})
export class CalculadoraNakagawa implements OnInit {

  constructor(private formBuilder: FormBuilder){}

  //NOME é da formaula que esse japa usou
  formPeso!: FormGroup;

  ngOnInit(): void {
    this.formPeso = this.formBuilder.group({
      pesoAlunosSemestreGeral: ["", Validators.required],
      pesoAlunosSemestreIntegral: ["", Validators.required],
      pesoAlunosSemestreNotuno: ["", Validators.required],
      pesoAuxiliaresAdministrativos:["",Validators.required],
      pesoTercerizados:["",Validators.required],
      pesoDocentes:["",Validators.required],
      dataInicioSemestre:["",Validators.required],
      dataFimSemestre:["",Validators.required]
    })
  }

}
