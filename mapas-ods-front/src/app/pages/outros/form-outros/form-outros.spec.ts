import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOutros } from './form-outros';

describe('FormOutros', () => {
  let component: FormOutros;
  let fixture: ComponentFixture<FormOutros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOutros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOutros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
