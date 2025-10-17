import { Injectable, inject } from '@angular/core';
import { ApiService } from '@services/api.service';
import { EndPoints } from '@services/EndPoints';
import { AdminRequestDto, AdminRequestPatchedDto, AdminDto, PaginatedAdminListDto } from '../dtos/admins.dto';
import { Helpers } from '@utils/helpers';

@Injectable({ providedIn: 'root' })
export class AdminProvider {
  private readonly api = inject(ApiService);

  async getAdmins(page: number = 1, page_size: number = 100000, params?: any): Promise<PaginatedAdminListDto | null> {
    try {
      const queryParams = { page, page_size, ...(params || {}) };
      return await this.api.get<PaginatedAdminListDto>({ url: EndPoints.getAdmins, queryParams });
    } catch (error) {
      console.error('Error al obtener admins:', error);
      return null;
    }
  }

  async createAdmin(dto: AdminRequestDto): Promise<AdminDto | null> {
    try {
      return await this.api.post<AdminDto>({ url: EndPoints.createAdmin, body: dto });
    } catch (error) {
      console.error('Error al crear admin:', error);
      return null;
    }
  }

  async getAdmin(adminId: number): Promise<AdminDto | null> {
    try {
      return await this.api.get<AdminDto>({ url: EndPoints.getAdmin, queryParams: { adminId } });
    } catch (error) {
      console.error('Error al obtener admin:', error);
      return null;
    }
  }

  async updateAdmin(adminId: number, dto: AdminRequestPatchedDto): Promise<AdminDto | null> {
    try {
      const { image, ...rest } = dto;

      return await this.api.patch<AdminDto>({ url: EndPoints.updateAdmin, queryParams: { adminId }, formParams: {...rest}, fileParams: {image: image!} });
    } catch (error) {
      console.error('Error al actualizar admin:', error);
      return null;
    }
  }

  async deleteAdmin(adminId: number): Promise<boolean> {
    try {
      await this.api.delete({ url: EndPoints.deleteAdmin, queryParams: { adminId } });
      return true;
    } catch (error) {
      console.error('Error al eliminar admin:', error);
      return false;
    }
  }

  async exportAdminsCSV(): Promise<Blob | null> {
    try {
      // Si necesitas headers especiales para CSV, agrégalos aquí
      return await this.api.get<Blob>({ url: EndPoints.exportAdminsCSV });
    } catch (error) {
      console.error('Error al exportar admins CSV:', error);
      return null;
    }
  }
}
