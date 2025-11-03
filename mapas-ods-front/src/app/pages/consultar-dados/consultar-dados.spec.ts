import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDados } from './consultar-dados';

describe('ConsultarDados', () => {
  let component: ConsultarDados;
  let fixture: ComponentFixture<ConsultarDados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarDados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarDados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
