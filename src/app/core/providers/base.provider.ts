import { inject } from "@angular/core";
import { ApiService } from "@services";
import { StoreService } from "@store/store.service";

export class BaseProvider {
    readonly apiUrl = inject(ApiService);
    readonly storeService = inject(StoreService);

  
}