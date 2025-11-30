import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterfaceInfraestrutura } from '../../services/models/infraestrutura';
import { InfraestruturaService } from '../../services/database/infraestrutua.service';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../app/shared/shared.module/shared.module';
import { OnlyNumbersDirective } from '../../shared/components/directives/only-numbers.directive';

@Component({
  selector: 'app-infraestrutura',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, SharedModule, OnlyNumbersDirective],
  standalone: true,
  templateUrl: './infraestrutura.html',
  styleUrl: './infraestrutura.css'
})
export class Infraestrutura implements OnInit {

  formInfra!: FormGroup;
  objInfra!: InterfaceInfraestrutura | null;

  constructor(private router: Router, private infraService: InfraestruturaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formInfra = this.formBuilder.group({
      area_construida: ["", [Validators.required, Validators.min(1)]]
    });


    //xaxho 
    this.getInfraestutura().subscribe({
      next: (infra) => {
        this.objInfra = infra;
        if (infra) {
          this.formInfra.patchValue({
            area_construida: infra.area_construida
          });
        }
      },
      error: (err) => console.error("Erro ao buscar infraestrutura:", err)
    });
  }

  getInfraestutura(): Observable<InterfaceInfraestrutura | null> {
    return this.infraService.getFirst();
  }

  navigate(rota: string): void {
    if (!rota) {
      return;
    }
    this.router.navigate([`${rota}`]);
  }

  salvar(): void {
    if (this.formInfra.invalid) {
      return;
    } else {
      const data: InterfaceInfraestrutura = {
        area_construida: this.formInfra.value.area_construida
      };
      this.infraService.create(data).subscribe({
        next: (data) => {
          this.navigate('adm/dashboard-adm');
        },
        error: (err) => {
          console.error({ "ERRO_AO_SALVAR_INFRAESTRUTURA": err });
        },
      })
    }
  }
}