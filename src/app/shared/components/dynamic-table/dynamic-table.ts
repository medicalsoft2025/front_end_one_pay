import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { TableColumn, TableAction, TableEvent } from './dynamic-table.types';
import { ActionDropdownComponent } from '../action-dropdown/action-dropdown';


@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, ActionDropdownComponent],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss',
})
export class DynamicTableComponent implements OnInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() title: string = 'Tabla de datos';
  @Input() loading: boolean = false;
  @Input() pageSize: number = 10;

  @Output() actionTriggered = new EventEmitter<TableEvent>();

  displayedData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  sortBy: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges() {
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = startIdx + this.pageSize;
    this.displayedData = this.data.slice(startIdx, endIdx);
  }

  getCellValue(row: any, column: TableColumn): string {
    const value = row[column.key];

    if (column.formatter) {
      return column.formatter(value, row);
    }

    switch (column.type) {
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '-';
      case 'currency':
        return value ? `$${parseFloat(value).toFixed(2)}` : '$0.00';
      case 'boolean':
        return value ? 'Sí' : 'No';
      default:
        return value !== null && value !== undefined ? String(value) : '-';
    }
  }

  onSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortBy === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column.key;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      const aVal = a[column.key];
      const bVal = b[column.key];

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.updatePagination();
  }

  onActionClick(action: TableAction, row: any) {
    if (action.confirm) {
      if (confirm(`¿Estás seguro de que deseas ${action.label.toLowerCase()}?`)) {
        this.actionTriggered.emit({ action: action.id, data: row });
      }
    } else {
      this.actionTriggered.emit({ action: action.id, data: row });
    }
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

  exportToPDF() {
    const doc = new jsPDF();
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.getWidth();
    const pageHeight = pageSize.getHeight();
    const margin = 15;

    // Título
    doc.setFontSize(16);
    doc.text(this.title, margin, margin);

    // Datos de la tabla
    const tableData = this.data.map((row) => {
      return this.columns.map((col) => this.getCellValue(row, col));
    });

    const headers = this.columns.map((col) => col.label);

    (doc as any).autoTable({
      head: [headers],
      body: tableData,
      startY: margin + 10,
      margin: margin,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 9,
        cellPadding: 3,
      },
      headerStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // Pie de página
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Página ${i} de ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    const fileName = `${this.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }

  exportToExcel() {
    const headers = this.columns.map((col) => col.label);
    const rows = this.data.map((row) => {
      return this.columns.map((col) => this.getCellValue(row, col));
    });

    // Crear CSV
    let csv = headers.join(',') + '\n';
    rows.forEach((row) => {
      csv += row.map((cell) => `"${cell}"`).join(',') + '\n';
    });

    // Descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${this.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
