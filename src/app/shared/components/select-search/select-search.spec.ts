import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSearch } from './select-search';

describe('SelectSearch', () => {
  let component: SelectSearch;
  let fixture: ComponentFixture<SelectSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
