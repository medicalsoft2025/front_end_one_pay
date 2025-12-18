import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCustomer } from './modal-customer';

describe('ModalCustomer', () => {
  let component: ModalCustomer;
  let fixture: ComponentFixture<ModalCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCustomer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
