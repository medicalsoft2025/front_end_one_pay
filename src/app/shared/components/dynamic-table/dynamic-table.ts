import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { heroDocumentArrowDown, heroTableCells, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { TableColumn, TableAction, TableEvent } from './dynamic-table.types';
import { ActionDropdownComponent } from '../action-dropdown/action-dropdown';
import { NgIconsModule, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, ActionDropdownComponent, NgIconsModule],
  providers: [provideIcons({ heroDocumentArrowDown, heroTableCells, heroMagnifyingGlass })],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class DynamicTableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() title: string = 'Tabla de datos';
  @Input() loading: boolean = false;
  @Input() pageSize: number = 10;
  @Input() data: any[] = [];

  @Output() actionTriggered = new EventEmitter<TableEvent>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.filteredData = [...(this.data || [])];
      this.currentPage = 1;
      this.updatePagination();
    }
    if (changes['pageSize']) {
      this.updatePagination();
    }
  }

  filteredData: any[] = [];
  displayedData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  sortBy: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  /* =======================
     PAGINACIÓN
  ======================= */

  updatePagination() {
    this.totalPages = Math.max(Math.ceil(this.filteredData.length / this.pageSize), 1);
    this.updateDisplayedData();
    this.cdr.markForCheck();
  }

  updateDisplayedData() {
    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = startIdx + this.pageSize;
    this.displayedData = this.filteredData.slice(startIdx, endIdx);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedData();
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  /* =======================
     SORT
  ======================= */

  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortBy === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column.key;
      this.sortDirection = 'asc';
    }

    const sortFn = (a: any, b: any) => {
      const aVal = a[column.key];
      const bVal = b[column.key];

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    };

    this.filteredData.sort(sortFn);

    this.updateDisplayedData();
  }

  /* =======================
     BUSQUEDA
  ======================= */

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter((row) => {
        return this.columns.some((col) => {
          const val = this.getCellValue(row, col);
          return String(val).toLowerCase().includes(searchTerm);
        });
      });
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  /* =======================
     CELDAS
  ======================= */

  getCellValue(row: any, column: TableColumn): string {
    const value = row[column.key];

    if (column.formatter) {
      return column.formatter(value, row);
    }

    switch (column.type) {
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '-';
      case 'currency':
        return value ? `$${Number(value).toFixed(2)}` : '$0.00';
      case 'boolean':
        return value ? 'Sí' : 'No';
      default:
        return value ?? '-';
    }
  }

  /* =======================
     ACCIONES
  ======================= */

  onActionClick(action: TableAction, row: any) {
    if (action.confirm) {
      if (confirm(`¿Estás seguro de que deseas ${action.label.toLowerCase()}?`)) {
        this.actionTriggered.emit({ action: action.id, data: row });
      }
    } else {
      this.actionTriggered.emit({ action: action.id, data: row });
    }
  }

  /* =======================
     EXPORTS
  ======================= */

  exportToPDF() {
    const doc = new jsPDF();
    doc.text(this.title, 15, 15);

    const tableData = this.data.map((row) =>
      this.columns.map((col) => this.getCellValue(row, col))
    );

    const headers = this.columns.map((col) => col.label);

    (doc as any).autoTable({
      head: [headers],
      body: tableData,
      startY: 25,
    });

    doc.save(`${this.title}.pdf`);
  }

  exportToExcel() {
    const headers = this.columns.map((col) => col.label);
    const rows = this.data.map((row) => this.columns.map((col) => this.getCellValue(row, col)));

    let csv = headers.join(',') + '\n';
    rows.forEach((r) => {
      csv += r.map((c) => `"${c}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.title}.csv`;
    link.click();
  }
}
