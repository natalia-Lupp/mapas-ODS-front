import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUSer } from './sidebar-user';

describe('Sidenav', () => {
  let component: SidebarUSer;
  let fixture: ComponentFixture<SidebarUSer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarUSer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUSer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
