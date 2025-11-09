import { inject, Injectable } from "@angular/core";
import { DriverDto } from "@dtos/driver.dto";
import { ApiService } from "@services/api.service";
import { EndPoints } from "@services/EndPoints";

//INTERFAZ PARA RESPUESTA PAGINADA
export interface PaginatedDriversResponse {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: DriverDto[];
}

@Injectable({ providedIn: 'root' })
export class DriversProvider {

  private readonly api = inject(ApiService);

  /**
   * OBTENER CONDUCTORES CON SOPORTE PARA FILTRADO, BUSQUEDA, ORDENAMIENTO Y PAGINACION
   * @param queryParams - OBJETO CON TODOS LOS PARAMETROS DE CONSULTA
   * @returns RESPUESTA PAGINADA CON CONDUCTORES Y TOTAL
   * TODO: MOVER INTERFACE
   */
  async getDrivers(queryParams: Record<string, any> = {}): Promise<PaginatedDriversResponse | null> {
    try {
      //ESTABLECER VALORES POR DEFECTO SI NO SE PROPORCIONAN
      const params = {
        page: 1,
        page_size: 10,
        ...queryParams
      };

      //REALIZAR LA PETICION AL BACKEND
      return await this.api.get<PaginatedDriversResponse>({
        url: EndPoints.getDrivers,
        queryParams: params
      });
    } catch (error) {
      console.error('Error al obtener conductores:', error);
      return null;
    }
  }
}
