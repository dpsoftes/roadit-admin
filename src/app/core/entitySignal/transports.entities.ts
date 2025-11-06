import { signal, Signal } from '@angular/core';
import {
    TransportsRetrieveResponse,
    AdditionalService,
    Leg,
    Vehicle,
    LegDocument,
    Certification,
    Exam,
    ExamQuestion,
    ExamOption,
    Client,
    QuestionType,
    PhaseEnum
} from '@dtos/transports/transports.dto';
import { TransportAddress } from '@dtos/transports/transport-address.dto';
import { TransportAddressEntity } from './transport-address.entities';
import { TransportPrincipalType, TransportStatus, LegPointType } from '@enums/transport.enum';
import { FuelType } from '@enums/vehicle.enum';
import { VehicleSize } from '@enums/vehicle.enum';
import { Helpers } from '@utils/helpers';

/**
 * EntitySignal para Vehicle
 */
export class VehicleEntity {
    brand = signal<string>("");
    created_date = signal<Date | null>(null);
    fuel_type = signal<FuelType>(FuelType.GASOLINE);
    id = signal<number>(0);
    image = signal<string | null>(null);
    insurance_date_end = signal<Date | null>(null);
    insurance_date_start = signal<Date | null>(null);
    license_plate = signal<string>("");
    model = signal<string>("");
    modified_date = signal<Date | null>(null);
    size = signal<VehicleSize>(VehicleSize.SMALL);

    static fromDto(dto: Vehicle): VehicleEntity {
        const entity = new VehicleEntity();
        entity.brand.set(dto.brand ?? "");
        entity.created_date.set(dto.created_date ?? null);
        entity.fuel_type.set(dto.fuel_type ?? FuelType.GASOLINE);
        entity.id.set(dto.id ?? 0);
        entity.image.set(dto.image ?? null);
        entity.insurance_date_end.set(dto.insurance_date_end ?? null);
        entity.insurance_date_start.set(dto.insurance_date_start ?? null);
        entity.license_plate.set(dto.license_plate ?? "");
        entity.model.set(dto.model ?? "");
        entity.modified_date.set(dto.modified_date ?? null);
        entity.size.set(dto.size ?? VehicleSize.SMALL);
        return entity;
    }

    toDto(): Vehicle {
        const dto = new Vehicle();
        dto.brand = this.brand();
        dto.created_date = this.created_date();
        dto.fuel_type = this.fuel_type();
        dto.id = this.id();
        dto.image = this.image();
        dto.insurance_date_end = this.insurance_date_end();
        dto.insurance_date_start = this.insurance_date_start();
        dto.license_plate = this.license_plate();
        dto.model = this.model();
        dto.modified_date = this.modified_date();
        dto.size = this.size();
        return dto;
    }

    copyFromDto(dto: Partial<Vehicle>): void {
        if (!Helpers.isEmpty(dto.brand)) this.brand.set(dto.brand!);
        if (dto.created_date != undefined) this.created_date.set(dto.created_date);
        if (dto.fuel_type != undefined) this.fuel_type.set(dto.fuel_type);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.image != undefined) this.image.set(dto.image);
        if (dto.insurance_date_end != undefined) this.insurance_date_end.set(dto.insurance_date_end);
        if (dto.insurance_date_start != undefined) this.insurance_date_start.set(dto.insurance_date_start);
        if (!Helpers.isEmpty(dto.license_plate)) this.license_plate.set(dto.license_plate!);
        if (!Helpers.isEmpty(dto.model)) this.model.set(dto.model!);
        if (dto.modified_date != undefined) this.modified_date.set(dto.modified_date);
        if (dto.size != undefined) this.size.set(dto.size);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new VehicleEntity();
        const patch: Partial<T> = {};
        if (this.brand() !== defaults.brand()) (patch as any).brand = this.brand();
        if (this.created_date() !== defaults.created_date()) (patch as any).created_date = this.created_date();
        if (this.fuel_type() !== defaults.fuel_type()) (patch as any).fuel_type = this.fuel_type();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.image() !== defaults.image()) (patch as any).image = this.image();
        if (this.insurance_date_end() !== defaults.insurance_date_end()) (patch as any).insurance_date_end = this.insurance_date_end();
        if (this.insurance_date_start() !== defaults.insurance_date_start()) (patch as any).insurance_date_start = this.insurance_date_start();
        if (this.license_plate() !== defaults.license_plate()) (patch as any).license_plate = this.license_plate();
        if (this.model() !== defaults.model()) (patch as any).model = this.model();
        if (this.modified_date() !== defaults.modified_date()) (patch as any).modified_date = this.modified_date();
        if (this.size() !== defaults.size()) (patch as any).size = this.size();
        return patch;
    }
}

/**
 * EntitySignal para ExamOption
 */
export class ExamOptionEntity {
    id = signal<number>(0);
    is_correct = signal<boolean>(false);
    title = signal<string>("");

    static fromDto(dto: ExamOption): ExamOptionEntity {
        const entity = new ExamOptionEntity();
        entity.id.set(dto.id ?? 0);
        entity.is_correct.set(dto.is_correct ?? false);
        entity.title.set(dto.title ?? "");
        return entity;
    }

    toDto(): ExamOption {
        const dto = new ExamOption();
        dto.id = this.id();
        dto.is_correct = this.is_correct();
        dto.title = this.title();
        return dto;
    }

    copyFromDto(dto: Partial<ExamOption>): void {
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.is_correct != undefined) this.is_correct.set(dto.is_correct);
        if (!Helpers.isEmpty(dto.title)) this.title.set(dto.title!);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new ExamOptionEntity();
        const patch: Partial<T> = {};
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.is_correct() !== defaults.is_correct()) (patch as any).is_correct = this.is_correct();
        if (this.title() !== defaults.title()) (patch as any).title = this.title();
        return patch;
    }
}

/**
 * EntitySignal para ExamQuestion
 */
export class ExamQuestionEntity {
    id = signal<number>(0);
    options = signal<ExamOptionEntity[]>([]);
    order = signal<number>(0);
    required = signal<boolean>(false);
    requires_manual_review = signal<boolean>(false);
    title = signal<string>("");
    type = signal<QuestionType>(QuestionType.Single);

    static fromDto(dto: ExamQuestion): ExamQuestionEntity {
        const entity = new ExamQuestionEntity();
        entity.id.set(dto.id ?? 0);
        entity.options.set((dto.options || []).map(opt => ExamOptionEntity.fromDto(opt)));
        entity.order.set(dto.order ?? 0);
        entity.required.set(dto.required ?? false);
        entity.requires_manual_review.set(dto.requires_manual_review ?? false);
        entity.title.set(dto.title ?? "");
        entity.type.set(dto.type ?? QuestionType.Single);
        return entity;
    }

    toDto(): ExamQuestion {
        const dto = new ExamQuestion();
        dto.id = this.id();
        dto.options = this.options().map(opt => opt.toDto());
        dto.order = this.order();
        dto.required = this.required();
        dto.requires_manual_review = this.requires_manual_review();
        dto.title = this.title();
        dto.type = this.type();
        return dto;
    }

    copyFromDto(dto: Partial<ExamQuestion>): void {
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.options != undefined) this.options.set(dto.options.map(opt => ExamOptionEntity.fromDto(opt)));
        if (dto.order != undefined) this.order.set(dto.order);
        if (dto.required != undefined) this.required.set(dto.required);
        if (dto.requires_manual_review != undefined) this.requires_manual_review.set(dto.requires_manual_review);
        if (!Helpers.isEmpty(dto.title)) this.title.set(dto.title!);
        if (dto.type != undefined) this.type.set(dto.type);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new ExamQuestionEntity();
        const patch: Partial<T> = {};
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (JSON.stringify(this.options()) !== JSON.stringify(defaults.options())) (patch as any).options = this.options().map(opt => opt.toDto());
        if (this.order() !== defaults.order()) (patch as any).order = this.order();
        if (this.required() !== defaults.required()) (patch as any).required = this.required();
        if (this.requires_manual_review() !== defaults.requires_manual_review()) (patch as any).requires_manual_review = this.requires_manual_review();
        if (this.title() !== defaults.title()) (patch as any).title = this.title();
        if (this.type() !== defaults.type()) (patch as any).type = this.type();
        return patch;
    }
}

/**
 * EntitySignal para Exam
 */
export class ExamEntity {
    id = signal<number>(0);
    max_tries_per_week = signal<number | undefined>(undefined);
    questions = signal<ExamQuestionEntity[]>([]);
    title = signal<string>("");

    static fromDto(dto: Exam): ExamEntity {
        const entity = new ExamEntity();
        entity.id.set(dto.id ?? 0);
        entity.max_tries_per_week.set(dto.max_tries_per_week);
        entity.questions.set((dto.questions || []).map(q => ExamQuestionEntity.fromDto(q)));
        entity.title.set(dto.title ?? "");
        return entity;
    }

    toDto(): Exam {
        const dto = new Exam();
        dto.id = this.id();
        dto.max_tries_per_week = this.max_tries_per_week();
        dto.questions = this.questions().map(q => q.toDto());
        dto.title = this.title();
        return dto;
    }

    copyFromDto(dto: Partial<Exam>): void {
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.max_tries_per_week != undefined) this.max_tries_per_week.set(dto.max_tries_per_week);
        if (dto.questions != undefined) this.questions.set(dto.questions.map(q => ExamQuestionEntity.fromDto(q)));
        if (!Helpers.isEmpty(dto.title)) this.title.set(dto.title!);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new ExamEntity();
        const patch: Partial<T> = {};
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.max_tries_per_week() !== defaults.max_tries_per_week()) (patch as any).max_tries_per_week = this.max_tries_per_week();
        if (JSON.stringify(this.questions()) !== JSON.stringify(defaults.questions())) (patch as any).questions = this.questions().map(q => q.toDto());
        if (this.title() !== defaults.title()) (patch as any).title = this.title();
        return patch;
    }
}

/**
 * EntitySignal para Certification
 */
export class CertificationEntity {
    allow_new_drivers = signal<boolean | undefined>(undefined);
    client = signal<number>(0);
    created_date = signal<Date | null>(null);
    description = signal<string | null | undefined>(undefined);
    exam = signal<ExamEntity | undefined>(undefined);
    id = signal<number>(0);
    max_tries_per_week = signal<number | undefined>(undefined);
    modified_date = signal<Date | null>(null);
    title = signal<string>("");

    static fromDto(dto: Certification): CertificationEntity {
        const entity = new CertificationEntity();
        entity.allow_new_drivers.set(dto.allow_new_drivers);
        entity.client.set(dto.client ?? 0);
        entity.created_date.set(dto.created_date ?? null);
        entity.description.set(dto.description);
        entity.exam.set(dto.exam ? ExamEntity.fromDto(dto.exam) : undefined);
        entity.id.set(dto.id ?? 0);
        entity.max_tries_per_week.set(dto.max_tries_per_week);
        entity.modified_date.set(dto.modified_date ?? null);
        entity.title.set(dto.title ?? "");
        return entity;
    }

    toDto(): Certification {
        const dto = new Certification();
        dto.allow_new_drivers = this.allow_new_drivers();
        dto.client = this.client();
        dto.created_date = this.created_date();
        dto.description = this.description();
        dto.exam = this.exam()?.toDto();
        dto.id = this.id();
        dto.max_tries_per_week = this.max_tries_per_week();
        dto.modified_date = this.modified_date();
        dto.title = this.title();
        return dto;
    }

    copyFromDto(dto: Partial<Certification>): void {
        if (dto.allow_new_drivers != undefined) this.allow_new_drivers.set(dto.allow_new_drivers);
        if (dto.client != undefined) this.client.set(dto.client);
        if (dto.created_date != undefined) this.created_date.set(dto.created_date);
        if (dto.description != undefined) this.description.set(dto.description);
        if (dto.exam != undefined) this.exam.set(dto.exam ? ExamEntity.fromDto(dto.exam) : undefined);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.max_tries_per_week != undefined) this.max_tries_per_week.set(dto.max_tries_per_week);
        if (dto.modified_date != undefined) this.modified_date.set(dto.modified_date);
        if (!Helpers.isEmpty(dto.title)) this.title.set(dto.title!);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new CertificationEntity();
        const patch: Partial<T> = {};
        if (this.allow_new_drivers() !== defaults.allow_new_drivers()) (patch as any).allow_new_drivers = this.allow_new_drivers();
        if (this.client() !== defaults.client()) (patch as any).client = this.client();
        if (this.created_date() !== defaults.created_date()) (patch as any).created_date = this.created_date();
        if (this.description() !== defaults.description()) (patch as any).description = this.description();
        if (this.exam() !== defaults.exam()) (patch as any).exam = this.exam()?.toDto();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.max_tries_per_week() !== defaults.max_tries_per_week()) (patch as any).max_tries_per_week = this.max_tries_per_week();
        if (this.modified_date() !== defaults.modified_date()) (patch as any).modified_date = this.modified_date();
        if (this.title() !== defaults.title()) (patch as any).title = this.title();
        return patch;
    }
}

/**
 * EntitySignal para AdditionalService
 */
export class AdditionalServiceEntity {
    certification = signal<CertificationEntity>(new CertificationEntity());
    client = signal<Client>({} as Client);
    charging_time = signal<number | undefined>(undefined);
    client_price = signal<string | undefined>(undefined);
    default_selected = signal<boolean | undefined>(undefined);
    description = signal<string | null | undefined>(undefined);
    driver_payment = signal<string | undefined>(undefined);
    id = signal<number>(0);
    is_appointment_management = signal<boolean | undefined>(undefined);
    is_common = signal<boolean | undefined>(undefined);
    leg_point_type = signal<LegPointType | undefined>(undefined);
    legs = signal<number[] | undefined>(undefined);
    name = signal<string>("");
    requires_certification = signal<boolean | undefined>(undefined);
    requires_image = signal<boolean | undefined>(undefined);
    requires_location = signal<boolean | undefined>(undefined);
    state = signal<boolean | undefined>(undefined);
    transport_status = signal<TransportStatus | undefined>(undefined);
    visible_by_driver = signal<boolean | undefined>(undefined);

    static fromDto(dto: AdditionalService): AdditionalServiceEntity {
        const entity = new AdditionalServiceEntity();
        entity.certification.set(dto.certification ? CertificationEntity.fromDto(dto.certification) : new CertificationEntity());
        entity.client.set(dto.client || {} as Client);
        entity.charging_time.set(dto.charging_time);
        entity.client_price.set(dto.client_price);
        entity.default_selected.set(dto.default_selected);
        entity.description.set(dto.description);
        entity.driver_payment.set(dto.driver_payment);
        entity.id.set(dto.id ?? 0);
        entity.is_appointment_management.set(dto.is_appointment_management);
        entity.is_common.set(dto.is_common);
        entity.leg_point_type.set(dto.leg_point_type);
        entity.legs.set(dto.legs);
        entity.name.set(dto.name ?? "");
        entity.requires_certification.set(dto.requires_certification);
        entity.requires_image.set(dto.requires_image);
        entity.requires_location.set(dto.requires_location);
        entity.state.set(dto.state);
        entity.transport_status.set(dto.transport_status);
        entity.visible_by_driver.set(dto.visible_by_driver);
        return entity;
    }

    toDto(): AdditionalService {
        const dto = new AdditionalService();
        dto.certification = this.certification().toDto();
        dto.client = this.client();
        dto.charging_time = this.charging_time();
        dto.client_price = this.client_price();
        dto.default_selected = this.default_selected();
        dto.description = this.description();
        dto.driver_payment = this.driver_payment();
        dto.id = this.id();
        dto.is_appointment_management = this.is_appointment_management();
        dto.is_common = this.is_common();
        dto.leg_point_type = this.leg_point_type();
        dto.legs = this.legs();
        dto.name = this.name();
        dto.requires_certification = this.requires_certification();
        dto.requires_image = this.requires_image();
        dto.requires_location = this.requires_location();
        dto.state = this.state();
        dto.transport_status = this.transport_status();
        dto.visible_by_driver = this.visible_by_driver();
        return dto;
    }

    copyFromDto(dto: Partial<AdditionalService>): void {
        if (dto.certification != undefined) this.certification.set(dto.certification ? CertificationEntity.fromDto(dto.certification) : new CertificationEntity());
        if (dto.client != undefined) this.client.set(dto.client);
        if (dto.charging_time != undefined) this.charging_time.set(dto.charging_time);
        if (!Helpers.isEmpty(dto.client_price)) this.client_price.set(dto.client_price);
        if (dto.default_selected != undefined) this.default_selected.set(dto.default_selected);
        if (dto.description != undefined) this.description.set(dto.description);
        if (!Helpers.isEmpty(dto.driver_payment)) this.driver_payment.set(dto.driver_payment);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.is_appointment_management != undefined) this.is_appointment_management.set(dto.is_appointment_management);
        if (dto.is_common != undefined) this.is_common.set(dto.is_common);
        if (dto.leg_point_type != undefined) this.leg_point_type.set(dto.leg_point_type);
        if (dto.legs != undefined) this.legs.set(dto.legs);
        if (!Helpers.isEmpty(dto.name)) this.name.set(dto.name!);
        if (dto.requires_certification != undefined) this.requires_certification.set(dto.requires_certification);
        if (dto.requires_image != undefined) this.requires_image.set(dto.requires_image);
        if (dto.requires_location != undefined) this.requires_location.set(dto.requires_location);
        if (dto.state != undefined) this.state.set(dto.state);
        if (dto.transport_status != undefined) this.transport_status.set(dto.transport_status);
        if (dto.visible_by_driver != undefined) this.visible_by_driver.set(dto.visible_by_driver);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new AdditionalServiceEntity();
        const patch: Partial<T> = {};
        if (this.certification() !== defaults.certification()) (patch as any).certification = this.certification().toDto();
        if (this.charging_time() !== defaults.charging_time()) (patch as any).charging_time = this.charging_time();
        if (this.client_price() !== defaults.client_price()) (patch as any).client_price = this.client_price();
        if (this.default_selected() !== defaults.default_selected()) (patch as any).default_selected = this.default_selected();
        if (this.description() !== defaults.description()) (patch as any).description = this.description();
        if (this.driver_payment() !== defaults.driver_payment()) (patch as any).driver_payment = this.driver_payment();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.is_appointment_management() !== defaults.is_appointment_management()) (patch as any).is_appointment_management = this.is_appointment_management();
        if (this.is_common() !== defaults.is_common()) (patch as any).is_common = this.is_common();
        if (this.leg_point_type() !== defaults.leg_point_type()) (patch as any).leg_point_type = this.leg_point_type();
        if (JSON.stringify(this.legs()) !== JSON.stringify(defaults.legs())) (patch as any).legs = this.legs();
        if (this.name() !== defaults.name()) (patch as any).name = this.name();
        if (this.requires_certification() !== defaults.requires_certification()) (patch as any).requires_certification = this.requires_certification();
        if (this.requires_image() !== defaults.requires_image()) (patch as any).requires_image = this.requires_image();
        if (this.requires_location() !== defaults.requires_location()) (patch as any).requires_location = this.requires_location();
        if (this.state() !== defaults.state()) (patch as any).state = this.state();
        if (this.transport_status() !== defaults.transport_status()) (patch as any).transport_status = this.transport_status();
        if (this.visible_by_driver() !== defaults.visible_by_driver()) (patch as any).visible_by_driver = this.visible_by_driver();
        return patch;
    }
}

/**
 * EntitySignal para LegDocument
 */
export class LegDocumentEntity {
    comment = signal<string | undefined>(undefined);
    created_date = signal<Date | null>(null);
    document_template_id = signal<number>(0);
    file_sent = signal<string>("");
    file_template = signal<string>("");
    id = signal<number>(0);
    modified_date = signal<Date | null>(null);
    phase = signal<PhaseEnum>(PhaseEnum.Departure);
    title = signal<string>("");

    static fromDto(dto: LegDocument): LegDocumentEntity {
        const entity = new LegDocumentEntity();
        entity.comment.set(dto.comment);
        entity.created_date.set(dto.created_date ?? null);
        entity.document_template_id.set(dto.document_template_id ?? 0);
        entity.file_sent.set(dto.file_sent ?? "");
        entity.file_template.set(dto.file_template ?? "");
        entity.id.set(dto.id ?? 0);
        entity.modified_date.set(dto.modified_date ?? null);
        entity.phase.set(dto.phase ?? PhaseEnum.Departure);
        entity.title.set(dto.title ?? "");
        return entity;
    }

    toDto(): LegDocument {
        const dto = new LegDocument();
        dto.comment = this.comment();
        dto.created_date = this.created_date();
        dto.document_template_id = this.document_template_id();
        dto.file_sent = this.file_sent();
        dto.file_template = this.file_template();
        dto.id = this.id();
        dto.modified_date = this.modified_date();
        dto.phase = this.phase();
        dto.title = this.title();
        return dto;
    }

    copyFromDto(dto: Partial<LegDocument>): void {
        if (!Helpers.isEmpty(dto.comment)) this.comment.set(dto.comment);
        if (dto.created_date != undefined) this.created_date.set(dto.created_date);
        if (dto.document_template_id != undefined) this.document_template_id.set(dto.document_template_id);
        if (!Helpers.isEmpty(dto.file_sent)) this.file_sent.set(dto.file_sent!);
        if (!Helpers.isEmpty(dto.file_template)) this.file_template.set(dto.file_template!);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.modified_date != undefined) this.modified_date.set(dto.modified_date);
        if (dto.phase != undefined) this.phase.set(dto.phase);
        if (!Helpers.isEmpty(dto.title)) this.title.set(dto.title!);
    }

    toPatch<T>(): Partial<T> {
        const defaults = new LegDocumentEntity();
        const patch: Partial<T> = {};
        if (this.comment() !== defaults.comment()) (patch as any).comment = this.comment();
        if (this.created_date() !== defaults.created_date()) (patch as any).created_date = this.created_date();
        if (this.document_template_id() !== defaults.document_template_id()) (patch as any).document_template_id = this.document_template_id();
        if (this.file_sent() !== defaults.file_sent()) (patch as any).file_sent = this.file_sent();
        if (this.file_template() !== defaults.file_template()) (patch as any).file_template = this.file_template();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.modified_date() !== defaults.modified_date()) (patch as any).modified_date = this.modified_date();
        if (this.phase() !== defaults.phase()) (patch as any).phase = this.phase();
        if (this.title() !== defaults.title()) (patch as any).title = this.title();
        return patch;
    }
}

/**
 * EntitySignal para Leg
 */
export class LegEntity {
    additional_services = signal<AdditionalServiceEntity[]>([]);
    connection_type = signal<string>("");
    destination_address = signal<TransportAddressEntity>(new TransportAddressEntity());
    documents = signal<LegDocumentEntity[]>([]);
    duration = signal<number | null | undefined>(undefined);
    expected_arrival_from = signal<Date | null | undefined>(undefined);
    expected_arrival_to = signal<Date | null | undefined>(undefined);
    expected_departure_from = signal<Date | null | undefined>(undefined);
    expected_departure_to = signal<Date | null | undefined>(undefined);
    has_ferry = signal<boolean | undefined>(undefined);
    id = signal<number>(0);
    kilometers = signal<string | null | undefined>(undefined);
    order = signal<number | undefined>(undefined);
    origin_address = signal<TransportAddressEntity>(new TransportAddressEntity());
    vehicle = signal<VehicleEntity>(new VehicleEntity());

    static fromDto(dto: Leg): LegEntity {
        const entity = new LegEntity();
        entity.additional_services.set((dto.additional_services || []).map(s => AdditionalServiceEntity.fromDto(s)));
        entity.connection_type.set(dto.connection_type ?? "");
        entity.destination_address.set(dto.destination_address ? TransportAddressEntity.fromDto(dto.destination_address) : new TransportAddressEntity());
        entity.documents.set((dto.documents || []).map(d => LegDocumentEntity.fromDto(d)));
        entity.duration.set(dto.duration);
        entity.expected_arrival_from.set(dto.expected_arrival_from);
        entity.expected_arrival_to.set(dto.expected_arrival_to);
        entity.expected_departure_from.set(dto.expected_departure_from);
        entity.expected_departure_to.set(dto.expected_departure_to);
        entity.has_ferry.set(dto.has_ferry);
        entity.id.set(dto.id ?? 0);
        entity.kilometers.set(dto.kilometers);
        entity.order.set(dto.order);
        entity.origin_address.set(dto.origin_address ? TransportAddressEntity.fromDto(dto.origin_address) : new TransportAddressEntity());
        entity.vehicle.set(dto.vehicle ? VehicleEntity.fromDto(dto.vehicle) : new VehicleEntity());
        return entity;
    }

    toDto(): Leg {
        const dto = new Leg();
        dto.additional_services = this.additional_services().map(s => s.toDto());
        dto.connection_type = this.connection_type();
        dto.destination_address = this.destination_address().toDto();
        dto.documents = this.documents().map(d => d.toDto());
        dto.duration = this.duration();
        dto.expected_arrival_from = this.expected_arrival_from();
        dto.expected_arrival_to = this.expected_arrival_to();
        dto.expected_departure_from = this.expected_departure_from();
        dto.expected_departure_to = this.expected_departure_to();
        dto.has_ferry = this.has_ferry();
        dto.id = this.id();
        dto.kilometers = this.kilometers();
        dto.order = this.order();
        dto.origin_address = this.origin_address().toDto();
        dto.vehicle = this.vehicle().toDto();
        return dto;
    }

    copyFromDto(dto: Partial<Leg>): void {
        if (dto.additional_services != undefined) this.additional_services.set(dto.additional_services.map(s => AdditionalServiceEntity.fromDto(s)));
        if (!Helpers.isEmpty(dto.connection_type)) this.connection_type.set(dto.connection_type!);
        if (dto.destination_address != undefined) this.destination_address.set(dto.destination_address ? TransportAddressEntity.fromDto(dto.destination_address) : new TransportAddressEntity());
        if (dto.documents != undefined) this.documents.set(dto.documents.map(d => LegDocumentEntity.fromDto(d)));
        if (dto.duration != undefined) this.duration.set(dto.duration);
        if (dto.expected_arrival_from != undefined) this.expected_arrival_from.set(dto.expected_arrival_from);
        if (dto.expected_arrival_to != undefined) this.expected_arrival_to.set(dto.expected_arrival_to);
        if (dto.expected_departure_from != undefined) this.expected_departure_from.set(dto.expected_departure_from);
        if (dto.expected_departure_to != undefined) this.expected_departure_to.set(dto.expected_departure_to);
        if (dto.has_ferry != undefined) this.has_ferry.set(dto.has_ferry);
        if (dto.id != undefined) this.id.set(dto.id);
        if (dto.kilometers != undefined) this.kilometers.set(dto.kilometers);
        if (dto.order != undefined) this.order.set(dto.order);
        if (dto.origin_address != undefined) this.origin_address.set(dto.origin_address ? TransportAddressEntity.fromDto(dto.origin_address) : new TransportAddressEntity());
        if (dto.vehicle != undefined) this.vehicle.set(dto.vehicle ? VehicleEntity.fromDto(dto.vehicle) : new VehicleEntity());
    }

    toPatch<T>(): Partial<T> {
        const defaults = new LegEntity();
        const patch: Partial<T> = {};
        if (JSON.stringify(this.additional_services()) !== JSON.stringify(defaults.additional_services())) (patch as any).additional_services = this.additional_services().map(s => s.toDto());
        if (this.connection_type() !== defaults.connection_type()) (patch as any).connection_type = this.connection_type();
        if (this.destination_address() !== defaults.destination_address()) (patch as any).destination_address = this.destination_address().toDto();
        if (JSON.stringify(this.documents()) !== JSON.stringify(defaults.documents())) (patch as any).documents = this.documents().map(d => d.toDto());
        if (this.duration() !== defaults.duration()) (patch as any).duration = this.duration();
        if (this.expected_arrival_from() !== defaults.expected_arrival_from()) (patch as any).expected_arrival_from = this.expected_arrival_from();
        if (this.expected_arrival_to() !== defaults.expected_arrival_to()) (patch as any).expected_arrival_to = this.expected_arrival_to();
        if (this.expected_departure_from() !== defaults.expected_departure_from()) (patch as any).expected_departure_from = this.expected_departure_from();
        if (this.expected_departure_to() !== defaults.expected_departure_to()) (patch as any).expected_departure_to = this.expected_departure_to();
        if (this.has_ferry() !== defaults.has_ferry()) (patch as any).has_ferry = this.has_ferry();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.kilometers() !== defaults.kilometers()) (patch as any).kilometers = this.kilometers();
        if (this.order() !== defaults.order()) (patch as any).order = this.order();
        if (this.origin_address() !== defaults.origin_address()) (patch as any).origin_address = this.origin_address().toDto();
        if (this.vehicle() !== defaults.vehicle()) (patch as any).vehicle = this.vehicle().toDto();
        return patch;
    }
}

/**
 * EntitySignal para TransportsRetrieveResponse
 */
export class TransportsRetrieveResponseEntity {
    additional_services = signal<AdditionalServiceEntity[]>([]);
    admin_id = signal<number>(0);
    admin_name = signal<string>("");
    appointment_management = signal<boolean | undefined>(undefined);
    cancelled = signal<boolean | undefined>(undefined);
    cancelled_comment = signal<string | undefined>(undefined);
    cancelled_reason = signal<null | undefined>(undefined);
    client_id = signal<number>(0);
    client_name = signal<string>("");
    comment = signal<string | undefined>(undefined);
    created_date = signal<Date | null>(null);
    driver_id = signal<number | null>(null);
    driver_name = signal<string | null>(null);
    duration = signal<number | null | undefined>(undefined);
    emails = signal<string[] | undefined>(undefined);
    group_number = signal<number | null | undefined>(undefined);
    has_ferry = signal<boolean | undefined>(undefined);
    id = signal<number>(0);
    invoiced = signal<boolean | undefined>(undefined);
    is_blocked = signal<boolean | undefined>(undefined);
    is_express = signal<boolean | undefined>(undefined);
    kilometers = signal<string | null | undefined>(undefined);
    legs = signal<LegEntity[]>([]);
    modified_date = signal<Date | null>(null);
    phone = signal<string | undefined>(undefined);
    reference_number = signal<string | null | undefined>(undefined);
    reservation_number = signal<string | null | undefined>(undefined);
    show_timeline = signal<boolean>(false);
    tags = signal<number[]>([]);
    timeline = signal<string | null>(null);
    countries = signal<string[]>([]);
    transport_principal_type = signal<TransportPrincipalType>(TransportPrincipalType.SIMPLE_MOVEMENT);
    transport_status = signal<TransportStatus | undefined>(undefined);
    transport_type = signal<string | null>(null);
    vehicle = signal<VehicleEntity>(new VehicleEntity());

    static fromDto(dto: TransportsRetrieveResponse): TransportsRetrieveResponseEntity {
        const entity = new TransportsRetrieveResponseEntity();
        entity.additional_services.set((dto.additional_services || []).map(s => AdditionalServiceEntity.fromDto(s)));
        entity.admin_id.set(dto.admin_id ?? 0);
        entity.admin_name.set(dto.admin_name ?? "");
        entity.appointment_management.set(dto.appointment_management);
        entity.cancelled.set(dto.cancelled);
        entity.cancelled_comment.set(dto.cancelled_comment);
        entity.cancelled_reason.set(dto.cancelled_reason);
        entity.client_id.set(dto.client_id ?? 0);
        entity.client_name.set(dto.client_name ?? "");
        entity.comment.set(dto.comment);
        entity.created_date.set(dto.created_date ?? null);
        entity.driver_id.set(dto.driver_id ?? null);
        entity.driver_name.set(dto.driver_name ?? null);
        entity.duration.set(dto.duration);
        entity.emails.set(dto.emails);
        entity.group_number.set(dto.group_number);
        entity.has_ferry.set(dto.has_ferry);
        entity.id.set(dto.id ?? 0);
        entity.invoiced.set(dto.invoiced);
        entity.is_blocked.set(dto.is_blocked);
        entity.is_express.set(dto.is_express);
        entity.kilometers.set(dto.kilometers);
        entity.legs.set((dto.legs || []).map(l => LegEntity.fromDto(l)));
        entity.modified_date.set(dto.modified_date ?? null);
        entity.phone.set(dto.phone);
        entity.reference_number.set(dto.reference_number);
        entity.reservation_number.set(dto.reservation_number);
        entity.show_timeline.set(dto.show_timeline ?? false);
        entity.tags.set(dto.tags || []);
        entity.timeline.set(dto.timeline ?? null);
        entity.countries.set(dto.countries || []);
        entity.transport_principal_type.set(dto.transport_principal_type ?? TransportPrincipalType.SIMPLE_MOVEMENT);
        entity.transport_status.set(dto.transport_status);
        entity.transport_type.set(dto.transport_type ?? null);
        entity.vehicle.set(dto.vehicle ? VehicleEntity.fromDto(dto.vehicle) : new VehicleEntity());
        return entity;
    }

    toDto(): TransportsRetrieveResponse {
        const dto = new TransportsRetrieveResponse();
        dto.additional_services = this.additional_services().map(s => s.toDto());
        dto.admin_id = this.admin_id();
        dto.admin_name = this.admin_name();
        dto.appointment_management = this.appointment_management();
        dto.cancelled = this.cancelled();
        dto.cancelled_comment = this.cancelled_comment();
        dto.cancelled_reason = this.cancelled_reason();
        dto.client_id = this.client_id();
        dto.client_name = this.client_name();
        dto.comment = this.comment();
        dto.created_date = this.created_date();
        dto.driver_id = this.driver_id();
        dto.driver_name = this.driver_name();
        dto.duration = this.duration();
        dto.emails = this.emails();
        dto.group_number = this.group_number();
        dto.has_ferry = this.has_ferry();
        dto.id = this.id();
        dto.invoiced = this.invoiced();
        dto.is_blocked = this.is_blocked();
        dto.is_express = this.is_express();
        dto.kilometers = this.kilometers();
        dto.legs = this.legs().map(l => l.toDto());
        dto.modified_date = this.modified_date();
        dto.phone = this.phone();
        dto.reference_number = this.reference_number();
        dto.reservation_number = this.reservation_number();
        dto.show_timeline = this.show_timeline();
        dto.tags = this.tags();
        dto.timeline = this.timeline();
        dto.countries = this.countries();
        dto.transport_principal_type = this.transport_principal_type();
        dto.transport_status = this.transport_status();
        dto.transport_type = this.transport_type();
        dto.vehicle = this.vehicle().toDto();
        return dto;
    }

    copyFromDto(dto: Partial<TransportsRetrieveResponse>): void {
        if (!Helpers.isEmpty(dto.additional_services)) this.additional_services.set(dto.additional_services!.map(s => AdditionalServiceEntity.fromDto(s)));
        if (!Helpers.isEmptyOrZero(dto.admin_id)) this.admin_id.set(dto.admin_id!);
        if (!Helpers.isEmpty(dto.admin_name)) this.admin_name.set(dto.admin_name!);
        if (dto.appointment_management != undefined) this.appointment_management.set(dto.appointment_management);
        if (dto.cancelled != undefined) this.cancelled.set(dto.cancelled);
        if (!Helpers.isEmpty(dto.cancelled_comment)) this.cancelled_comment.set(dto.cancelled_comment);
        if (dto.cancelled_reason != undefined) this.cancelled_reason.set(dto.cancelled_reason);
        if (!Helpers.isEmptyOrZero(dto.client_id)) this.client_id.set(dto.client_id!);
        if (!Helpers.isEmpty(dto.client_name)) this.client_name.set(dto.client_name!);
        if (!Helpers.isEmpty(dto.comment)) this.comment.set(dto.comment);
        if (dto.created_date != undefined) this.created_date.set(dto.created_date);
        if (dto.driver_id != undefined) this.driver_id.set(dto.driver_id);
        if (dto.driver_name != undefined) this.driver_name.set(dto.driver_name);
        if (dto.duration != undefined) this.duration.set(dto.duration);
        if (dto.emails != undefined) this.emails.set(dto.emails);
        if (dto.group_number != undefined) this.group_number.set(dto.group_number);
        if (dto.has_ferry != undefined) this.has_ferry.set(dto.has_ferry);
        if (!Helpers.isEmptyOrZero(dto.id)) this.id.set(dto.id!);
        if (dto.invoiced != undefined) this.invoiced.set(dto.invoiced);
        if (dto.is_blocked != undefined) this.is_blocked.set(dto.is_blocked);
        if (dto.is_express != undefined) this.is_express.set(dto.is_express);
        if (dto.kilometers != undefined) this.kilometers.set(dto.kilometers);
        if (!Helpers.isEmpty(dto.legs)) this.legs.set(dto.legs!.map(l => LegEntity.fromDto(l)));
        if (dto.modified_date != undefined) this.modified_date.set(dto.modified_date);
        if (!Helpers.isEmpty(dto.phone)) this.phone.set(dto.phone);
        if (dto.reference_number != undefined) this.reference_number.set(dto.reference_number);
        if (dto.reservation_number != undefined) this.reservation_number.set(dto.reservation_number);
        if (dto.show_timeline != undefined) this.show_timeline.set(dto.show_timeline);
        if (!Helpers.isEmpty(dto.tags)) this.tags.set(dto.tags!);
        if (dto.timeline != undefined) this.timeline.set(dto.timeline);
        if (!Helpers.isEmpty(dto.countries)) this.countries.set(dto.countries!);
        if (dto.transport_principal_type != undefined) this.transport_principal_type.set(dto.transport_principal_type);
        if (dto.transport_status != undefined) this.transport_status.set(dto.transport_status);
        if (dto.transport_type != undefined) this.transport_type.set(dto.transport_type);
        if (dto.vehicle != undefined) this.vehicle.set(dto.vehicle ? VehicleEntity.fromDto(dto.vehicle) : new VehicleEntity());
    }

    toPatch<T>(): Partial<T> {
        const defaults = new TransportsRetrieveResponseEntity();
        const patch: Partial<T> = {};
        if (JSON.stringify(this.additional_services()) !== JSON.stringify(defaults.additional_services())) (patch as any).additional_services = this.additional_services().map(s => s.toDto());
        if (this.admin_id() !== defaults.admin_id()) (patch as any).admin_id = this.admin_id();
        if (this.admin_name() !== defaults.admin_name()) (patch as any).admin_name = this.admin_name();
        if (this.appointment_management() !== defaults.appointment_management()) (patch as any).appointment_management = this.appointment_management();
        if (this.cancelled() !== defaults.cancelled()) (patch as any).cancelled = this.cancelled();
        if (this.cancelled_comment() !== defaults.cancelled_comment()) (patch as any).cancelled_comment = this.cancelled_comment();
        if (this.cancelled_reason() !== defaults.cancelled_reason()) (patch as any).cancelled_reason = this.cancelled_reason();
        if (this.client_id() !== defaults.client_id()) (patch as any).client_id = this.client_id();
        if (this.client_name() !== defaults.client_name()) (patch as any).client_name = this.client_name();
        if (this.comment() !== defaults.comment()) (patch as any).comment = this.comment();
        if (this.created_date() !== defaults.created_date()) (patch as any).created_date = this.created_date();
        if (this.driver_id() !== defaults.driver_id()) (patch as any).driver_id = this.driver_id();
        if (this.driver_name() !== defaults.driver_name()) (patch as any).driver_name = this.driver_name();
        if (this.duration() !== defaults.duration()) (patch as any).duration = this.duration();
        if (this.emails() !== defaults.emails()) (patch as any).emails = this.emails();
        if (this.group_number() !== defaults.group_number()) (patch as any).group_number = this.group_number();
        if (this.has_ferry() !== defaults.has_ferry()) (patch as any).has_ferry = this.has_ferry();
        if (this.id() !== defaults.id()) (patch as any).id = this.id();
        if (this.invoiced() !== defaults.invoiced()) (patch as any).invoiced = this.invoiced();
        if (this.is_blocked() !== defaults.is_blocked()) (patch as any).is_blocked = this.is_blocked();
        if (this.is_express() !== defaults.is_express()) (patch as any).is_express = this.is_express();
        if (this.kilometers() !== defaults.kilometers()) (patch as any).kilometers = this.kilometers();
        if (JSON.stringify(this.legs()) !== JSON.stringify(defaults.legs())) (patch as any).legs = this.legs().map(l => l.toDto());
        if (this.modified_date() !== defaults.modified_date()) (patch as any).modified_date = this.modified_date();
        if (this.phone() !== defaults.phone()) (patch as any).phone = this.phone();
        if (this.reference_number() !== defaults.reference_number()) (patch as any).reference_number = this.reference_number();
        if (this.reservation_number() !== defaults.reservation_number()) (patch as any).reservation_number = this.reservation_number();
        if (this.show_timeline() !== defaults.show_timeline()) (patch as any).show_timeline = this.show_timeline();
        if (JSON.stringify(this.tags()) !== JSON.stringify(defaults.tags())) (patch as any).tags = this.tags();
        if (this.timeline() !== defaults.timeline()) (patch as any).timeline = this.timeline();
        if (JSON.stringify(this.countries()) !== JSON.stringify(defaults.countries())) (patch as any).countries = this.countries();
        if (this.transport_principal_type() !== defaults.transport_principal_type()) (patch as any).transport_principal_type = this.transport_principal_type();
        if (this.transport_status() !== defaults.transport_status()) (patch as any).transport_status = this.transport_status();
        if (this.transport_type() !== defaults.transport_type()) (patch as any).transport_type = this.transport_type();
        if (this.vehicle() !== defaults.vehicle()) (patch as any).vehicle = this.vehicle().toDto();
        return patch;
    }
}

