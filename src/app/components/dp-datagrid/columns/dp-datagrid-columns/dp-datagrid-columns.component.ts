import { Component, input } from '@angular/core';

@Component({
  selector: 'dp-datagrid-columns',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class DpDatagridColumnsComponent {
  headerBackground = input<string>();
  headerColor = input<string>();
  headerFontSize = input<string>();
  headerFontWeight = input<string>();
  headerFontFamily = input<string>();
}
