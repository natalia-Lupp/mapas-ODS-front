import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Infraestrutura } from './infraestrutura';

describe('Infraestrutura', () => {
  let component: Infraestrutura;
  let fixture: ComponentFixture<Infraestrutura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Infraestrutura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Infraestrutura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
