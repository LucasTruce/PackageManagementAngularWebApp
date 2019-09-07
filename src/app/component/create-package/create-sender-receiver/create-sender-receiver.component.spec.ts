import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSenderReceiverComponent } from './create-sender-receiver.component';

describe('CreateSenderReceiverComponent', () => {
  let component: CreateSenderReceiverComponent;
  let fixture: ComponentFixture<CreateSenderReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSenderReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSenderReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
