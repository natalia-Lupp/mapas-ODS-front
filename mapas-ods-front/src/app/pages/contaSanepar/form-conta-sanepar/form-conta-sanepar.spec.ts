import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContaSanepar } from './form-conta-sanepar';

describe('FormContaSanepar', () => {
  let component: FormContaSanepar;
  let fixture: ComponentFixture<FormContaSanepar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContaSanepar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContaSanepar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
