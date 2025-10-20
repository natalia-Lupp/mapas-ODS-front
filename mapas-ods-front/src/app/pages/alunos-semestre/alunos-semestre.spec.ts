import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosSemestre } from './alunos-semestre';

describe('AlunosSemestre', () => {
  let component: AlunosSemestre;
  let fixture: ComponentFixture<AlunosSemestre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunosSemestre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosSemestre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
