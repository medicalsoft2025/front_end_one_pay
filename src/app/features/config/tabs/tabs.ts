import { Component } from '@angular/core';
import { ProfileTabComponent } from './profile/profile-tab';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser, heroBell, heroShieldCheck } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [ProfileTabComponent, NgIconComponent],
  providers: [provideIcons({ heroUser, heroShieldCheck, heroBell })],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {}
