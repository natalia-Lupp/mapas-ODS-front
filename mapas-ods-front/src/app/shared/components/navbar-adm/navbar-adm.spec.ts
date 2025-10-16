import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdm } from './navbar-adm';

describe('NavbarAdm', () => {
  let component: NavbarAdm;
  let fixture: ComponentFixture<NavbarAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAdm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
