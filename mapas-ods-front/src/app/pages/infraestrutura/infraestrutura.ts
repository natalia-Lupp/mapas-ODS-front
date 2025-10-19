import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterfaceInfraestrutura } from '../../services/models/infraestrutura';
import { InfraestruturaService } from '../../services/database/infraestrutua.service';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-infraestrutura',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './infraestrutura.html',
  styleUrl: './infraestrutura.css'
})
export class Infraestrutura implements OnInit {

  formInfra!: FormGroup;

  constructor(private router: Router, private infraService: InfraestruturaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formInfra = this.formBuilder.group({
      area_construida: ["", [Validators.required, Validators.min(1)]]
    })
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
      console.error("12313132");
      return;
    } else {
      const data: InterfaceInfraestrutura = {
        area_construida: this.formInfra.value.area_construida
      };
      this.infraService.create(data)
    }
  }
}
