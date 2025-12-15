import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTenant } from './config-tenant';

describe('ConfigTenant', () => {
  let component: ConfigTenant;
  let fixture: ComponentFixture<ConfigTenant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigTenant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigTenant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
