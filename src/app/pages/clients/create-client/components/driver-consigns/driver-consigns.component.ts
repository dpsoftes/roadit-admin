import { Component, inject } from '@angular/core';
import { TextEditorComponent } from '@components/text-editor/text-editor.component';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { ClientStore } from '@store/clients.state';

@Component({
  selector: 'app-driver-consigns',
  imports: [
    TextEditorComponent,
    MatCardModule,
    TranslatePipe,
    ButtonsComponent
  ],
  templateUrl: './driver-consigns.component.html',
  styleUrl: './driver-consigns.component.scss'
})
export class DriverConsignsComponent {
  store = inject(ClientStore);
  client = this.store.client;

  saveChanges(){
    this.store.updateState({client: this.client()})
    this.store.saveGralData();
  }
}
