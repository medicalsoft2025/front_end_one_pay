import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAction } from '../dynamic-table/dynamic-table.types';

@Component({
  selector: 'app-action-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-dropdown.html',
  styleUrl: './action-dropdown.scss',
})
export class ActionDropdownComponent {
  @Input() actions: TableAction[] = [];
  @Input() row: any;

  @Output() actionSelected = new EventEmitter<{ action: TableAction; row: any }>();

  isOpen = false;
  Boolean!: (value: string | undefined, index: number, array: (string | undefined)[]) => value is any;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  onActionClick(action: TableAction) {
    this.actionSelected.emit({ action, row: this.row });
    this.closeDropdown();
  }

  getVisibleActions(): TableAction[] {
    return this.actions.filter((action) => {
      if (!action.visible) return true;
      return action.visible(this.row);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }

  constructor(private elementRef: ElementRef) {}
}
