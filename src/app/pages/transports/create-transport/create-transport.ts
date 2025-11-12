import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TransportPrincipalType } from '@enums/transport.enum';
import { GlobalStore } from '@store/global.state';
import { RoleAdmin } from '@enums/user.enum';
import { SimpleDataDto } from '@dtos/simpleData.dto';

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
  private global = inject(GlobalStore);

  selectedTransportType = signal<TransportPrincipalType | ''>('');
  selectedManager = signal<number | null>(null);
  selectedClientGroup = signal<number | null>(null);
  
  TransportPrincipalType = TransportPrincipalType;
  
  managers = computed<SimpleDataDto[]>(() => {
    return this.global.usersAdmin().filter(admin => 
      [RoleAdmin.SALES_MANAGER, RoleAdmin.OPERATIONS_MANAGER].some(role => 
        admin.otherData?.['roles']?.includes(role)
      )
    ).map(admin => ({ id: admin.id, name: admin.name }));
  });
  
  clientGroups = computed<SimpleDataDto[]>(() => {
    return this.global.groups();
  });
  
  onBack() {
    this.router.navigate(['/transports/assignment']);
  }
  
  onTransportType(type: TransportPrincipalType) {
    this.selectedTransportType.set(type);
  }
  
  onContinue() {
    const type = this.selectedTransportType();
    if (type) {
      console.log('Continuing to next step');
      this.router.navigate([`/transports/create/${type}`]);
    }
  } 
  
  onCancel() {
    this.router.navigate(['/transports/assignment']);
  }
}
