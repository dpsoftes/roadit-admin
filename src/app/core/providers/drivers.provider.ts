import { inject, Injectable } from "@angular/core";
import { DriverDto } from "@dtos/driver.dto";
import { ApiService } from "@services/api.service";
import { EndPoints } from "@services/EndPoints";

@Injectable({ providedIn: 'root' })
export class DriversProvider {


  private readonly api = inject(ApiService);


  async getDrivers(page: number = 1, page_size: number = 99999): Promise<DriverDto[] | null> {
    try {
      return (await this.api.get<any>({ url: EndPoints.getDrivers, queryParams: { page, page_size } }))["results"];
    } catch (error) {
      console.error('Error al obtener admins:', error);
      return null;
    }
  }
}
