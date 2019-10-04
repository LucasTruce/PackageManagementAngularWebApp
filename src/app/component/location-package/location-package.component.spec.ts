import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPackageComponent } from './location-package.component';

describe('LocationPackageComponent', () => {
  let component: LocationPackageComponent;
  let fixture: ComponentFixture<LocationPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
