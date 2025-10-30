import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-transport',
  imports: [
    ButtonsComponent,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './create-transport.html',
  styleUrl: './create-transport.scss'
})
export class CreateTransport {
  private router = inject(Router);

  selectedTransportType = signal<string>('');
  onBack() {
    this.router.navigate(['/transports/assignment']);
  }
  onTransportType(type: string) {
    this.selectedTransportType.set(type);
  }
  onContinue() {
    console.log('Continuing to next step');
    this.router.navigate([`/transports/create/${this.selectedTransportType()}`]);
  } 
  onCancel() {
    this.router.navigate(['/transports/assignment']);
  }
}
