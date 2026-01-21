import { Component, Input, Output, EventEmitter, forwardRef, HostListener, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
  logo?: string | null;
}

@Component({
  selector: 'app-select-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-search.html',
  styleUrl: './select-search.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSearchComponent),
      multi: true
    }
  ]
})
export class SelectSearchComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() options: SelectOption[] = [];
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';

  @Output() selectionChange = new EventEmitter<any>();

  isOpen: boolean = false;
  searchTerm: string = '';
  filteredOptions: SelectOption[] = [];
  selectedOption: SelectOption | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.filteredOptions = this.options;
      if (this.selectedOption) {
        const found = this.options.find(opt => opt.value === this.selectedOption?.value);
        if (found) this.selectedOption = found;
      }
    }
  }

  toggleDropdown() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
      this.filteredOptions = this.options;
    } else {
      this.onTouched();
    }
  }

  selectOption(option: SelectOption) {
    this.selectedOption = option;
    this.onChange(option.value);
    this.selectionChange.emit(option.value);
    this.isOpen = false;
  }

  clearSelection(event: Event) {
    event.stopPropagation();
    this.selectedOption = null;
    this.onChange(null);
    this.selectionChange.emit(null);
  }

  filterOptions() {
    if (!this.searchTerm) {
      this.filteredOptions = this.options;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredOptions = this.options.filter(opt =>
        opt.label.toLowerCase().includes(term)
      );
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      const found = this.options.find(opt => opt.value === value);
      this.selectedOption = found || null;
    } else {
      this.selectedOption = null;
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.onTouched();
    }
  }
}
