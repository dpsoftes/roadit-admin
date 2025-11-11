import { inject, Injectable } from "@angular/core";
import { DriverDto } from "@dtos/driver.dto";
import { TransportHistoryListItemDto, TransportHistoryListParamsDto } from "@dtos/transports/transport.dto";
import { ApiService } from "@services/api.service";
import { EndPoints } from "@services/EndPoints";
import { Helpers } from "@utils/helpers";

@Injectable({ providedIn: 'root' })
export class TransportProvider {
  private readonly api = inject(ApiService);
    async loadHistory(params: TransportHistoryListParamsDto) : Promise<{ list: TransportHistoryListItemDto[], totalRecords: number } | null> {
        try {
            params.page = params.page || 1;
            params.page_size = params.page_size || 10000000;
            const result: any = await this.api.get<any>({url: EndPoints.getTransportHistory,  queryParams: params });
            
            return {
                list: result.results as TransportHistoryListItemDto[],
                totalRecords: result.count
            };

        } catch (error) {
            return null;
        }        
    }

}
