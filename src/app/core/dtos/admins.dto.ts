// DTOs para el proceso de administración (admins)

// Crear Admin
export class AdminRequestDto {
  username!: string;
  email!: string;
  phone?: string | null;
  name?: string | null;
  last_name?: string | null;
  image?: File | null;
  is_active?: boolean;
  roles?: string[];
  departments?: string[];
  password?: string;
  password_confirmation?: string;
}

// Actualización parcial de Admin (usa las mismas propiedades que AdminRequestDto)
export class AdminRequestPatchedDto {
  username?: string;
  email?: string;
  phone?: string | null;
  name?: string | null;
  last_name?: string | null;
  image?: File | null;
  is_active?: boolean;
  roles?: string[];
  departments?: string[];
  password?: string;
  password_confirmation?: string;
}

// Respuesta de Admin (detalle)
export class AdminDto {
  id!: number;
  username!: string;
  email!: string;
  phone?: string | null;
  name?: string | null;
  last_name?: string | null;
  image?: File | null;
  is_active?: boolean;
  roles?: string[];
  departments?: string[];
}

// Resumen de Admin (para listados)
export class AdminSummaryDto {
  id!: number;
  email!: string;
  name?: string | null;
  last_name?: string | null;
}

// Paginación de Admins
export class PaginatedAdminListDto {
  count!: number;
  next?: string | null;
  previous?: string | null;
  results!: AdminDto[];
}