import { CertificationStatus } from '../enums/additional.enum';
import { TransportPrincipalType } from '../enums/transport.enum';
import { BaseEntity } from './base.dto';

export class CertificationDto extends BaseEntity {
    title: string;
    status: CertificationStatus;
    transport_principal_type: TransportPrincipalType;
    driver: string; // UUID
    exam: number | null;

    constructor(data: any = {}) {
        super(data);
        this.title = data.title || '';
        this.status = data.status;
        this.transport_principal_type = data.transport_principal_type;
        this.driver = data.driver || '';
        this.exam = data.exam;
    }

    static fromJson(json: any): CertificationDto {
        return new CertificationDto(json);
    }

    override toJson(): any {
        return {
            ...super.toJson(),
            title: this.title,
            status: this.status,
            transport_principal_type: this.transport_principal_type,
            driver: this.driver,
            exam: this.exam
        };
    }

    copyWith(updates: Partial<CertificationDto>): CertificationDto {
        return new CertificationDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ManualCertificationDto {
    driver: string; // UUID
    title: string;
    transport_principal_type: TransportPrincipalType;
    exam?: number | null;
    status?: CertificationStatus.MANUAL;

    constructor(data: any = {}) {
        this.driver = data.driver || '';
        this.title = data.title || '';
        this.transport_principal_type = data.transport_principal_type;
        this.exam = data.exam;
        this.status = data.status;
    }

    static fromJson(json: any): ManualCertificationDto {
        return new ManualCertificationDto(json);
    }

    toJson(): any {
        return {
            driver: this.driver,
            title: this.title,
            transport_principal_type: this.transport_principal_type,
            exam: this.exam,
            status: this.status
        };
    }

    copyWith(updates: Partial<ManualCertificationDto>): ManualCertificationDto {
        return new ManualCertificationDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ExamItemDto {
    exam_id: number;
    exam_title: string;
    scope: 'CLIENT' | 'SERVICE';
    service_id?: number | null;
    has_passed: boolean;
    certification_id?: number | null;
    status?: CertificationStatus | null;

    constructor(data: any = {}) {
        this.exam_id = data.exam_id || 0;
        this.exam_title = data.exam_title || '';
        this.scope = data.scope;
        this.service_id = data.service_id;
        this.has_passed = data.has_passed || false;
        this.certification_id = data.certification_id;
        this.status = data.status;
    }

    static fromJson(json: any): ExamItemDto {
        return new ExamItemDto(json);
    }

    toJson(): any {
        return {
            exam_id: this.exam_id,
            exam_title: this.exam_title,
            scope: this.scope,
            service_id: this.service_id,
            has_passed: this.has_passed,
            certification_id: this.certification_id,
            status: this.status
        };
    }

    copyWith(updates: Partial<ExamItemDto>): ExamItemDto {
        return new ExamItemDto({
            ...this.toJson(),
            ...updates
        });
    }
}

export class ClientCertificationDto {
    client_id: number;
    client_name: string;
    total_exams: number;
    passed_count: number;
    missing_count: number;
    items: ExamItemDto[];

    constructor(data: any = {}) {
        this.client_id = data.client_id || 0;
        this.client_name = data.client_name || '';
        this.total_exams = data.total_exams || 0;
        this.passed_count = data.passed_count || 0;
        this.missing_count = data.missing_count || 0;
        this.items = (data.items || []).map((item: any) => ExamItemDto.fromJson(item));
    }

    static fromJson(json: any): ClientCertificationDto {
        return new ClientCertificationDto(json);
    }

    toJson(): any {
        return {
            client_id: this.client_id,
            client_name: this.client_name,
            total_exams: this.total_exams,
            passed_count: this.passed_count,
            missing_count: this.missing_count,
            items: this.items.map(item => item.toJson())
        };
    }

    copyWith(updates: Partial<ClientCertificationDto>): ClientCertificationDto {
        return new ClientCertificationDto({
            ...this.toJson(),
            ...updates
        });
    }
}


