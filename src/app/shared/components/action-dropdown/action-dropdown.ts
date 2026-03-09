import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAction } from '../dynamic-table/dynamic-table.types';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCog6Tooth, heroStar, heroPencil, heroTrash, heroEye, heroCheck, heroXMark, heroEllipsisVertical, heroShieldCheck } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-action-dropdown',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({
    heroCog6Tooth,
    heroStar,
    heroPencil,
    heroTrash,
    heroEye,
    heroCheck,
    heroXMark,
    heroEllipsisVertical,
    heroShieldCheck,
    // Alias para compatibilidad con configuraciones antiguas
    eye: heroEye,
    edit: heroPencil,
    trash: heroTrash,
    shield: heroShieldCheck
  })],
  templateUrl: './action-dropdown.html',
  styleUrl: './action-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionDropdownComponent {
  @Input() actions: TableAction[] | null = [];
  @Input() row: unknown;

  @Output() actionSelected = new EventEmitter<{
    action: TableAction;
    row: unknown;
  }>();

  isOpen = false;
  dropdownStyle: any = {};

  constructor(private elementRef: ElementRef) {}

  /* ---------------- UI ---------------- */

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.calculatePosition();
    }
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  closeDropdown(): void {
    this.isOpen = false;
  }

  calculatePosition() {
    const button = this.elementRef.nativeElement.querySelector('.action-dropdown-toggle');
    if (!button) return;

    const rect = button.getBoundingClientRect();

    this.dropdownStyle = {
      position: 'fixed',
      top: `${rect.bottom + 4}px`, 
      right: `${window.innerWidth - rect.right}px`,
      left: 'auto',
    };
  }

  /* ---------------- Actions ---------------- */

  onActionClick(action: TableAction): void {
    this.actionSelected.emit({ action, row: this.row });
    this.closeDropdown();
  }

  get visibleActions(): TableAction[] {
    if (!Array.isArray(this.actions)) {
      return [];
    }

    return this.actions.filter(action => {
      if (typeof action.visible === 'function') {
        return action.visible(this.row);
      }
      return action.visible !== false;
    });
  }

  getActionClasses(action: TableAction): string[] {
    const classes: string[] = [`action-${action.id}`];

    if (typeof action.class === 'string' && action.class.trim()) {
      classes.push(action.class);
    }

    return classes;
  }

  /* ---------------- UX ---------------- */

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}
