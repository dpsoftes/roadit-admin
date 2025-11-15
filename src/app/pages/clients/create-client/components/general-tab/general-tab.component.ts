import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation, input, output, inject, OnInit, computed, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslatePipe } from '@i18n/translate.pipe';
import { ImageDropComponent } from '@components/index';
import { ButtonsComponent } from '@components/buttons.component/buttons.component';
import { ClientStore } from '@store/clients.state';
import { ClientsGralEntity } from '@entities/clients.entities';
import { billingTypeDescriptions, clientOriginDescriptions, clientTypeDescriptions } from '@enums/client.enum';
import { GlobalStore } from '@store/global.state';
import { ClientsProvider } from '@providers';
import { SimpleDataDto } from '@dtos/simpleData.dto';
import { Helpers } from '@utils/helpers';

@Component({
  selector: 'app-general-tab-component',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    MatCheckboxModule,
    ImageDropComponent,
    ButtonsComponent
  ],
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralTabComponent  implements OnInit{

  store = inject(ClientStore);
  global = inject(GlobalStore)
  errors = this.store.errors;
  logoUrl = this.store.logoSrc;
  clientProvider = inject(ClientsProvider);
  client = ClientsGralEntity.fromDto(this.store.client());
  billingTypeArray = Object.entries(billingTypeDescriptions).map(([key, value]) => ({ key, value }));
  clientsTypeArray = Object.entries(clientTypeDescriptions).map(([key, value]) => ({ key, value }));
  originsArray = Object.entries(clientOriginDescriptions).map(([key, value]) => ({ key, value }));
  groups = this.global.groups;
  
  clients = signal<SimpleDataDto[]>([]);
  clientGroups = input<any[]>([]);
  managersInput = input<any[]>([]);

  errorsItems = computed(() => {
    let err:any = {};
    for(let e of this.errors()){
      err[e] = true;
    }
    return err;
  });

  formDataChange = output<any>();

  parseInt = parseInt;


  constructor() { 
    effect(() => {
      this.client.copyFromDto(this.store.client());
    });

  }


  ngOnInit(): void {
   this.loadClientsByGroup();
  }


  onImageAccepted(event: { base64: string, file: File }): void {
    if(event.file){
      this.store.updateState({ curImage: event.file });
    }
  }
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const allowed = ["JPG", "JPEG", "GIF", "PNG"];
    const maxKb = 800;
    const result = await Helpers.validateAndReadFile(file, allowed, maxKb);
    if (!result.valid) {
      Helpers.Instance.showToast(result.error || 'Archivo no válido', 'ERROR');
      // Aquí podrías mostrar un snackbar, toast, etc.
      return;
    }
    this.store.updateState({curImage: file});
  }
 
  async onGroupChage(groupId: number ){
    this.client.client_group.set(groupId)
    this.loadClientsByGroup();
  }
  async loadClientsByGroup(){
    const clients = await this.clientProvider.getClients({client_group: this.client.client_group()});
      if(clients && clients.length > 0){
        this.clients.set(clients.map(c => ({ id: c.id, name: c.name })));
      }else{
        this.clients.set([]);
      }
  }
  onSave(): void {
    const dto = this.client.toPatch();
    const errors = this.store.validGralData(dto);
    if(errors.length == 0){
      this.store.saveGralData();
    }
  }

  onCancel(): void {

    console.log('cancel')
  }

  departments = signal<string[]>(['IT', 'HR', 'Finance', 'Operations', 'Marketing']);
}
