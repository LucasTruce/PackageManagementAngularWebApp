import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesInfoComponent } from './packages-info.component';

describe('PackagesInfoComponent', () => {
  let component: PackagesInfoComponent;
  let fixture: ComponentFixture<PackagesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
