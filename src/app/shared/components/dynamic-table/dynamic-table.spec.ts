import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTableComponent } from './dynamic-table';
import { TableColumn, TableAction } from './dynamic-table.types';
import { vi } from 'vitest';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;

    // Configurar datos de prueba
    component.columns = [
      { key: 'name', label: 'Nombre', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'amount', label: 'Monto', type: 'currency' },
    ];

    component.data = [
      { id: 1, name: 'Juan', email: 'juan@example.com', amount: 1000 },
      { id: 2, name: 'María', email: 'maria@example.com', amount: 2000 },
      { id: 3, name: 'Pedro', email: 'pedro@example.com', amount: 1500 },
    ];

    component.actions = [
      { id: 'edit', label: 'Editar' },
      { id: 'delete', label: 'Eliminar', confirm: true },
    ];

    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar las columnas correctamente', () => {
    expect(component.columns.length).toBe(3);
    expect(component.columns[0].label).toBe('Nombre');
  });

  it('debe cargar los datos correctamente', () => {
    expect(component.data.length).toBe(3);
  });

  it('debe formatear moneda correctamente', () => {
    const column: TableColumn = { key: 'amount', label: 'Monto', type: 'currency' };
    const row = { amount: 1000 };
    const formatted = component.getCellValue(row, column);
    expect(formatted).toBe('$1000.00');
  });

  it('debe ejecutar acción cuando se hace clic', () => {
    const emitSpy = vi.spyOn(component.actionTriggered, 'emit');
    const action: TableAction = { id: 'edit', label: 'Editar' };
    const row = { id: 1, name: 'Juan' };

    component.onActionClick(action, row);

    expect(emitSpy).toHaveBeenCalledWith({
      action: 'edit',
      data: row,
    });
  });

  it('debe ordenar datos correctamente', () => {
    const column: TableColumn = { key: 'name', label: 'Nombre', sortable: true };
    component.onSort(column);

    expect(component.sortBy).toBe('name');
    expect(component.sortDirection).toBe('asc');
  });

  it('debe cambiar dirección de ordenamiento', () => {
    const column: TableColumn = { key: 'name', label: 'Nombre', sortable: true };
    component.onSort(column);
    component.onSort(column);

    expect(component.sortDirection).toBe('desc');
  });

  it('debe paginar datos correctamente', () => {
    component.pageSize = 2;
    component.updatePagination();

    expect(component.totalPages).toBe(2);
    expect(component.displayedData.length).toBe(2);
  });

  it('debe navegar a siguiente página', () => {
    component.pageSize = 2;
    component.updatePagination();
    component.nextPage();

    expect(component.currentPage).toBe(2);
  });

  it('debe navegar a página anterior', () => {
    component.pageSize = 2;
    component.updatePagination();
    component.currentPage = 2;
    component.previousPage();

    expect(component.currentPage).toBe(1);
  });

  it('debe mostrar mensaje cuando no hay datos', () => {
    component.data = [];
    component.updatePagination();

    expect(component.displayedData.length).toBe(0);
  });

  it('debe formatear fechas correctamente', () => {
    const column: TableColumn = { key: 'date', label: 'Fecha', type: 'date' };
    const row = { date: '2024-12-09' };
    const formatted = component.getCellValue(row, column);
    expect(formatted).toBeTruthy();
    expect(formatted).not.toBe('-');
  });

  it('debe formatear booleanos correctamente', () => {
    const column: TableColumn = { key: 'active', label: 'Activo', type: 'boolean' };
    expect(component.getCellValue({ active: true }, column)).toBe('Sí');
    expect(component.getCellValue({ active: false }, column)).toBe('No');
  });
});
