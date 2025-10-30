import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-create-transport-2',
  imports: [
    ButtonsComponent,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './create-transport-2.html',
  styleUrl: './create-transport-2.scss'
})
export class CreateTransport2 {
  transportData = signal<any>(null);
  transportType = signal<string>('');
  userData = signal<any>(null);
  billingCenters = signal<any[]>([]);

  constructor(private route: ActivatedRoute, private router: Router) {
      this.route.paramMap.subscribe(params => {
        this.transportType.set(params.get('type') ?? '');
    });
  }
  onBack() {
    this.router.navigate(['/transports/create']);
  }

  onAddPickup() {
    console.log('Adding pickup');
  }
  onImportCsv() {
    console.log('Importing CSV');
  }
  
}
