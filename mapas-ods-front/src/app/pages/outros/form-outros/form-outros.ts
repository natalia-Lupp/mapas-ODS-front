import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IntefaceOutros } from '../../../services/models/outros';
import { ActivatedRoute, Router } from '@angular/router';
import { OutrosService } from '../../../services/database/outros.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-outros',
  imports: [DatePipe,ReactiveFormsModule,CommonModule],
  templateUrl: './form-outros.html',
  styleUrls: ['./form-outros.css']
})
export class FormOutros implements OnInit {

  formOutro!: FormGroup;
  outroId?: string;
  outroModel?: IntefaceOutros;

  constructor(
    private router: Router,
    private outrosService: OutrosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formOutro = this.formBuilder.group({
      apelido: ["", Validators.required],
      auxiliaresAdministrativos: [""],
      tercerizados: [""],
      docentes: [""],
      periodoInicio: ["", Validators.required],
      periodoFim: ["", Validators.required]
    });

    this.outroId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.outroId) {
      this.getDadoOutro(this.outroId).subscribe({
        next: (data: IntefaceOutros) => {
          this.outroModel = data;
          this.formOutro.patchValue({
            apelido: data.apelido,
            auxiliaresAdministrativos: data.auxiliares_administrativos ?? 0,
            tercerizados: data.tercerizados ?? 0,
            docentes: data.docentes ?? 0,
            periodoInicio: new Date(data.periodo_inicio),
            periodoFim: new Date(data.periodo_fim)
          });
        }
      });
    }
  }

  private getDadoOutro(id: string): Observable<IntefaceOutros> {
    return this.outrosService.getById(id);
  }

  back(){}

  salvar(){}
}
