import {  CertificationsDto } from "@dtos/certifications.dto";

export class ClientCertification extends CertificationsDto {
    
    client: number = 0; // ID del cliente asociado
    max_tries_per_week: number = 0; // Intentos máximos por semana
}

export const ClientCertificationFromTemplate = (template: CertificationsDto) => {
    const clientCert = new ClientCertification();
        clientCert.title = template.title
        clientCert.description = template.description
        clientCert.max_tries_per_week = template.default_max_tries
        clientCert.allow_new_drivers = template.allow_new_drivers
        clientCert.exam = template.exam
    return clientCert;

}