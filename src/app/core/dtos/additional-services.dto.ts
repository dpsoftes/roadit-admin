import { TransportStatus } from "@enums/transport.enum";
import { Certification } from "./transports/transports.dto.old";
import { CertificationsDto } from "./certifications.dto";
import { ClientCertification } from "./clients/clientsCertifications.dto";

export class AdditionalServiceDto {
    id: number = 0;

    certification: CertificationsDto | ClientCertification | null = null;
    state: boolean = true;
    default_selected: boolean = false;
    name: string = "";
    description: string = "";
    is_appointment_management: boolean = false;
    client_price: string = "0.00";
    driver_payment: string = "0.00";
    visible_by_driver: boolean = true;
    transport_status: TransportStatus = TransportStatus.PENDING;
    applyment_moment: string = "ALL";
    requires_certification: boolean = false;
    requires_image: boolean = false;
    requires_location: boolean = false;
    is_common: boolean = true;
    charging_time: number = 0;
}
