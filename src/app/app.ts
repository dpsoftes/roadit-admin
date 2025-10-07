import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importar DBGrid desde shared
import { 
  DbGridComponent, 
  DbGridColumnComponent, 
  GridRowSelectEvent, 
  GridPageChangeEvent 
} from '@components';
import { StoreService } from '@store/store.service';
import { LoginComponent } from './pages/login/login.component';
// Actualiza las importaciones según el tipo:
// import { ApiService } from '@services/api.service';
// import { LoginResponseDto } from '@dtos/loginResponse.dto';
// import { CustomPipe } from '@pipes/custom.pipe';
// import { GlobalStore } from '@store/global';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Datos mock simples (40 usuarios)
  store = inject(StoreService);

  constructor() {
    
  }

  
}
