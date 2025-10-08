import { Component, signal } from '@angular/core';
import { last } from 'rxjs';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    TranslatePipe,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  // Variables para filtros
  showFilters = false;
  selectedRole = '';
  selectedStatus = '';
  selectedDepartment = '';

  usersArray = signal([
    {
      id: 1,
      name: 'Luis',
      lastname: 'García',
      email: 'luis.garcia@example.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      department: 'IT',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 2,
      name: 'María',
      lastname: 'Fernández',
      email: 'maria.fernandez@example.com',
      role: 'USER',
      status: 'ACTIVE',
      department: 'Comercial',
      photo: 'assets/images/sample_user_icon.png'
    },
    {
      id: 3,
      name: 'Carlos',
      lastname: 'Ruiz',
      email: 'carlos.ruiz@example.com',
      role: 'DRIVER',
      status: 'INACTIVE',
      department: 'Marketing',
      photo: 'assets/images/sample_user_icon.png'
    }
  ]);
  
  displayedColumns = ['select','photo', 'name', 'lastname', 'email','role','status','department', 'actions'];
  selection = new SelectionModel<any>(true, []);
  
  searchPlaceholder = '';
  
  isAllSelected(): boolean {
    const selected = this.selection.selected.length;
    const total = this.usersArray().length;
    return selected === total && total > 0;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.usersArray());
    }
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id ?? ''}`;
  }

  edit(element:any){
    alert("Edit user");
  }
  delete(element:any){
    alert("Delete user");
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  // clearFilters(): void {
  //   this.selectedRole = '';
  //   this.selectedStatus = '';
  //   this.selectedDepartment = '';
  // }

  // applyFilters(): void {
  //   console.log('Aplicando filtros:', {
  //     role: this.selectedRole,
  //     status: this.selectedStatus,
  //     department: this.selectedDepartment
  //   });
  // }
}
