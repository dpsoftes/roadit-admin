import { ExamQuestionType } from "@enums/additional.enum";

export class ExamOption {
    id?: number = 0; // Identificador
    title: string = ""; // Título de la opción
    is_correct: boolean = false; // Indica si es la respuesta correcta
}


export class ExamQuestion {
    id?: number = 0; // Identificador
    title: string = ""; // Enunciado de la pregunta
    type: ExamQuestionType = ExamQuestionType.SINGLE; // Tipo de respuesta esperada
    required: boolean = true; // Indica si la respuesta es obligatoria
    order: number = 0; // Orden de la pregunta
    requires_manual_review: boolean = false; // Indica si requiere revisión manual (ej. si type fuera TEXT)
    options: ExamOption[] = []; // Opciones de respuesta
}

export class CertificationExam {
    id?: number = 0; // Identificador
    title: string = ""; // Título del examen
    max_tries_per_week: number = 0; // Intentos máximos por semana
    questions: ExamQuestion[] = []; // Lista de preguntas
}

export class CertificationsDto {
    id?: number = 0; // Identificador
    title: string = ""; // Título de la certificación
    description: string = ""; // Descripción de la certificación
    default_max_tries: number = 0; // Intentos máximos por semana
    allow_new_drivers: boolean = false; // Permitir a nuevos conductores realizar el examen
    exam: CertificationExam = new CertificationExam(); // Examen asociado
}