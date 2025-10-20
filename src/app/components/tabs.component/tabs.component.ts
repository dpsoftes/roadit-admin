import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@i18n/translate.pipe';

@Component({
  selector: 'app-tabs',
  imports: [
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  tabs = input<string[]>([]);
  activeTab = input<string>('general');
  activeTabChange = output<string>();

  onTabChange(tab: string) {
    this.activeTabChange.emit(tab);
  }

}
