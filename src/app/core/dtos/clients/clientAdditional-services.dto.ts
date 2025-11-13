import { ClientCertification } from "./clientsCertifications.dto";
import { ClientDto } from "./clients.dto";
import { AdditionalServiceDto } from "@dtos/additional-services.dto";

export class ClientAdditionalServiceDto extends AdditionalServiceDto {
    override certification: ClientCertification | null = null;
    client: ClientDto | null = null;
    override is_common: boolean = false;
    legs: number[] = [];
}
