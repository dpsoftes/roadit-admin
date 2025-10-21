import { Component } from '@angular/core';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { certsCreatedTableConfig } from './certsCreatedTableConfig';
import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';
import { certsAssignedTableConfig } from './certsAssignedTableConfig';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';

interface Cert {
  title: string;
  description: string;
  url: string;
  questions: string[];
}

@Component({
  selector: 'app-certs',
  imports: [
    DynamicTableComponent,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    ButtonsComponent
  ],
  templateUrl: './certs.component.html',
  styleUrl: './certs.component.scss'
})
export class CertsComponent {

  certsCreatedTableConfig: TableConfig = certsCreatedTableConfig;
  certsAssignedTableConfig: TableConfig = certsAssignedTableConfig;

}
