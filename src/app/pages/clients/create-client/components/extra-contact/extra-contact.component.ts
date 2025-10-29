import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@i18n/translate.pipe';
import { TextEditorComponent } from '@components/text-editor/text-editor.component';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { ClientStore } from '@store/clients.state';

@Component({
  selector: 'app-extra-contact',
  imports: [
    CommonModule,
    MatCardModule,  
    TranslatePipe,
    TextEditorComponent,
    ButtonsComponent,
  ],
  templateUrl: './extra-contact.component.html',
  styleUrl: './extra-contact.component.scss'
})
export class ExtraContactComponent {
/*   extra_contact_content = signal<string>('');
  extra_contact_content_2 = signal<string>(''); */
  store = inject(ClientStore);
  client = this.store.client;

  saveChanges(){
    this.client().html_contact_page1
    this.client().html_contact_page2
    this.store.updateState({client: this.client()})
    this.store.saveGralData();
  }
}

