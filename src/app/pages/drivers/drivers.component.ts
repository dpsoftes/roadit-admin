import { 
  Component, 
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drivers',
  imports: [
    CommonModule
  ],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriversComponent {
  
}
