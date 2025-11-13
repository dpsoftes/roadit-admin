import { Component, effect, inject, input, OnDestroy, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { ClientStore } from '@store/clients.state';
import { ClientCertification } from '@dtos/clients/clientsCertifications.dto';
import { ClientCertificationEntity } from '@entities/clients.entities';
import { Helpers } from '@utils/helpers';


@Component({
  selector: 'app-certification',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    TranslatePipe,
    ButtonsComponent  
  ],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss'
})
export class CertificationComponent implements OnDestroy{

  store = inject(ClientStore);
  curAction = input.required< 'nothing' | 'edit' | 'create'>();
  save = output<ClientCertification>();
  certification = ClientCertificationEntity.fromDto(this.store.currentCertification());
  max_tries_per_week_is_empty = signal<boolean>(false);
  certificationStoreChange = effect(() => {
    this.certification.copyFromDto(this.store.currentCertification());
  });
  
  ngOnDestroy(): void {
    this.certificationStoreChange.destroy();
  }

 
  onSave(): void {
    if(Helpers.isEmptyOrZero(this.certification.max_tries_per_week())){
      this.max_tries_per_week_is_empty.set(true);
      return;
    }else{
      this.max_tries_per_week_is_empty.set(false);
    }
    this.save.emit(this.certification.toDto());
  }
}
