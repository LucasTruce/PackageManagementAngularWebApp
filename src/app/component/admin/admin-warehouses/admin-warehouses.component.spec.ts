import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWarehousesComponent } from './admin-warehouses.component';

describe('AdminWarehousesComponent', () => {
  let component: AdminWarehousesComponent;
  let fixture: ComponentFixture<AdminWarehousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWarehousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
