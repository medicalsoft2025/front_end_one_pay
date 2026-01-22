import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { ToastComponent } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBar, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('one_pay_front_end');
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNavbar =
        this.router.routerState.root.firstChild?.snapshot.data['showNavbar'] !== false;
    });
  }
}
