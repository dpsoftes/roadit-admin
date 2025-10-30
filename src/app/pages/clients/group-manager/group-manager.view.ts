import { Component, signal, input, output, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@i18n/translate.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsGroupEntity } from '@entities/clients.entities';
import { ClientsProvider } from '@providers';
import { SimpleDataDto } from '@dtos/simpleData.dto';
import { GlobalStore } from '@store/global.state';
import { RoleAdmin, UserRole } from '@enums/user.enum';

@Component({
  selector: 'group-manager-view',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './group-manager.view.html',
  styleUrl: './group-manager.view.scss'
})
export class GroupManagerView implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientProvider = inject(ClientsProvider);
  private readonly global = inject(GlobalStore);

  // Input signals
  availableAdmins = computed<SimpleDataDto[]>(() =>{
     var filter = this.global.usersAdmin().filter(admin => [RoleAdmin.KAM, RoleAdmin.SALES_MANAGER].some(role => admin.otherData['roles'].includes(role)));
     return filter.map(admin => { return { id: admin.id, name: admin.name }; });
  });

  currentGroup = signal<ClientsGroupEntity | null>(null);
  // Output signals
  groupCreated = output<any>();
  groupCancelled = output<void>();

  titleView = computed(() => {
    return this.currentGroup() && this.currentGroup()?.id()
      ? 'clients.edit-group-title'
      : 'clients.create-group-title"';
  });
  // Formulario reactivo
  groupForm: FormGroup = null!;

  constructor(private fb: FormBuilder) {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      assigned_admins: [[]]
    });

  }
  async ngOnInit() {
    let groupId = null;
    if (this.route.snapshot.paramMap.get('id')) {
      groupId = Number(this.route.snapshot.paramMap.get('id'));
    }
    if(groupId) {
      try{
        const groupData = await this.clientProvider.getGroupById(groupId);
        if(groupData){
          this.currentGroup.set(groupData);
        }else{
          this.currentGroup.set(new ClientsGroupEntity());
      }
      }catch(e){
        this.currentGroup.set(new ClientsGroupEntity());
      }
      
    }else{
      this.currentGroup.set(new ClientsGroupEntity());
    }
    this.groupForm = this.fb.group({
      name: [this.currentGroup()?.name(), Validators.required],
      country: [this.currentGroup()?.country(), Validators.required],
      assigned_admins: [this.currentGroup()?.assigned_admins()]
    });
    
  }

  get selectedAdmins() {
    const selectedIds = this.groupForm.get('assigned_admins')?.value || [];
    return this.availableAdmins().filter(admin =>
      selectedIds.includes(admin.id)
    );
  }

  async onSave() {
    if (this.groupForm.valid) {
      const formData = this.groupForm.value as any;
      this.groupCreated.emit(formData);
      this.currentGroup()?.copyFromDto(formData);
      var result = await this.clientProvider.saveGroup(this.currentGroup()?.toPatch(), this.currentGroup()?.id() );
      console.log("Grupo guardado:", result); 
      
    } else {
      console.log('Formulario inválido:', this.groupForm.errors);
      this.groupForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.groupForm.reset();
    this.groupCancelled.emit();
  }
}
