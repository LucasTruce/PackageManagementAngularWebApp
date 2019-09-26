import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeLoginComponent } from './admin-change-login.component';

describe('AdminChangeLoginComponent', () => {
  let component: AdminChangeLoginComponent;
  let fixture: ComponentFixture<AdminChangeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
