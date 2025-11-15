import { signal } from '@angular/core';
import { BaseEntity } from './base.entity';
import { ClientAdditionalServiceDto } from '@dtos/clients/clientAdditional-services.dto';
import { ClientsGralEntity } from './clients.entities';
import { ClientCertificationEntity } from './clients.entities';
import { TransportStatus } from '@enums/transport.enum';

/**
 * Ejemplo de uso de BaseEntity
 */
export class ClientAdditionalServiceEntityExample extends BaseEntity<ClientAdditionalServiceDto> {
    // Solo declaras las propiedades con sus valores iniciales
    id = signal<number>(0);
    client = signal<ClientsGralEntity | null>(null);
    certification = signal<ClientCertificationEntity | null>(null);
    state = signal<boolean>(true);
    default_selected = signal<boolean>(false);
    name = signal<string>("");
    description = signal<string>("");
    is_appointment_management = signal<boolean>(false);
    client_price = signal<string>("0.00");
    driver_payment = signal<string>("0.00");
    visible_by_driver = signal<boolean>(true);
    transport_status = signal<TransportStatus>(TransportStatus.PENDING);
    applyment_moment = signal<string>("ALL");
    requires_certification = signal<boolean>(false);
    requires_image = signal<boolean>(false);
    requires_location = signal<boolean>(false);
    is_common = signal<boolean>(false);
    charging_time = signal<number>(0);
    legs = signal<number[]>([]);

    // El método fromDto se simplifica enormemente
    static fromDto(dto: ClientAdditionalServiceDto): ClientAdditionalServiceEntityExample {
        const entity = new ClientAdditionalServiceEntityExample();
        
        // Conversión automática de propiedades simples
        entity.populateFromDto(dto);
        
        // Solo necesitas manejar las conversiones especiales manualmente
        if (dto.client) {
            entity.client.set(ClientsGralEntity.fromDto(dto.client));
        }
        if (dto.certification) {
            entity.certification.set(ClientCertificationEntity.fromDto(dto.certification));
        }
        
        return entity;
    }

    // toDto es heredado automáticamente, pero puedes sobrescribirlo si necesitas lógica especial
    override toDto(): ClientAdditionalServiceDto {
        const dto = super.toDto();
        
        // Lógica especial si es necesario
        if (this.client()) {
            dto.client = this.client()!.toDto();
        }
        if (this.certification()) {
            dto.certification = this.certification()!.toDto();
        }
        
        return dto;
    }

    // copyFromDto es heredado automáticamente
    // override copyFromDto si necesitas lógica especial

    // toPatch es heredado automáticamente
    // override toPatch si necesitas lógica especial

    protected createDefaultInstance(): this {
        return new ClientAdditionalServiceEntityExample() as this;
    }
}
