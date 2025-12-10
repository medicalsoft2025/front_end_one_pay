import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionDropdownComponent } from './action-dropdown';
import { TableAction } from '../dynamic-table/dynamic-table.types';
import { vi } from 'vitest';

describe('ActionDropdownComponent', () => {
  let component: ActionDropdownComponent;
  let fixture: ComponentFixture<ActionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDropdownComponent);
    component = fixture.componentInstance;

    component.actions = [
      { id: 'edit', label: 'Editar', icon: '✏️' },
      { id: 'delete', label: 'Eliminar', icon: '🗑️', confirm: true },
    ];

    component.row = { id: 1, name: 'Test' };

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe abrir y cerrar el dropdown', () => {
    expect(component.isOpen).toBeFalsy();
    component.toggleDropdown();
    expect(component.isOpen).toBeTruthy();
    component.toggleDropdown();
    expect(component.isOpen).toBeFalsy();
  });

  it('debe emitir evento cuando se selecciona una acción', () => {
    const emitSpy = vi.spyOn(component.actionSelected, 'emit');
    const action = component.actions[0];

    component.onActionClick(action);

    expect(emitSpy).toHaveBeenCalledWith({
      action: action,
      row: component.row,
    });
  });

  it('debe cerrar el dropdown después de seleccionar una acción', () => {
    component.isOpen = true;
    const action = component.actions[0];

    component.onActionClick(action);

    expect(component.isOpen).toBeFalsy();
  });

  it('debe obtener solo las acciones visibles', () => {
    component.actions = [
      { id: 'edit', label: 'Editar', icon: '✏️' },
      {
        id: 'approve',
        label: 'Aprobar',
        icon: '✅',
        visible: (row) => row.status === 'pending',
      },
    ];

    component.row = { id: 1, status: 'approved' };

    const visibleActions = component.getVisibleActions();
    expect(visibleActions.length).toBe(1);
    expect(visibleActions[0].id).toBe('edit');
  });

  it('debe mostrar acciones visibles cuando cumplen la condición', () => {
    component.actions = [
      {
        id: 'approve',
        label: 'Aprobar',
        icon: '✅',
        visible: (row) => row.status === 'pending',
      },
    ];

    component.row = { id: 1, status: 'pending' };

    const visibleActions = component.getVisibleActions();
    expect(visibleActions.length).toBe(1);
    expect(visibleActions[0].id).toBe('approve');
  });
});
