import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-users',
  imports: [TranslatePipe],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

}
