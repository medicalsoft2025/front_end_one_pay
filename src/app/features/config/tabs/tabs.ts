import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { heroUser, heroShieldCheck } from '@ng-icons/heroicons/outline';

interface TabConfig {
  label: string;
  key: string;
  icon: string;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, NgIconsModule],
  providers: [provideIcons({ heroUser, heroShieldCheck })],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
})
export class Tabs {
  @Input() tabs: TabConfig[] = [];
  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabKey: string) {
    this.tabChange.emit(tabKey);
  }
}
