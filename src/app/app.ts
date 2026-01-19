import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./shared/components/nav-bar/nav-bar";
import { ToastComponent } from "./shared/components/toast/toast";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('one_pay_front_end');
}
