import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  isDark: boolean = false;

  ngOnInit(): void {
    // Detectar si el tema oscuro está activo
    this.isDark = document.documentElement.classList.contains('dark');
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    const root = document.documentElement;

    if (this.isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }
}
