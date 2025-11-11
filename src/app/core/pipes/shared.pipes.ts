/**
 * Pipes personalizados para la aplicación RoadIt
 * Definiciones de pipes reutilizables para transformaciones comunes
 */

import { Pipe, PipeTransform } from '@angular/core';
import { ConversionHelperService } from '@services/conversion-helper.service';

@Pipe({
    name: 'price',
    standalone: true
})
export class PricePipe implements PipeTransform {
    constructor(private conversionHelper: ConversionHelperService) { }

    transform(value: number | string | null, currency: string = 'EUR', locale: string = 'es-ES'): string {
        const numValue = this.conversionHelper.toNumber(value);
        return this.conversionHelper.formatPrice(numValue, currency, locale);
    }
}

@Pipe({
    name: 'distance',
    standalone: true
})
export class DistancePipe implements PipeTransform {
    constructor(private conversionHelper: ConversionHelperService) { }

    transform(value: number | string | null): string {
        const meters = this.conversionHelper.toNumber(value);
        return this.conversionHelper.formatDistance(meters);
    }
}

@Pipe({
    name: 'duration',
    standalone: true
})
export class DurationPipe implements PipeTransform {
    constructor(private conversionHelper: ConversionHelperService) { }

    transform(value: number | string | null): string {
        const milliseconds = this.conversionHelper.toNumber(value);
        return this.conversionHelper.formatDuration(milliseconds);
    }
}

@Pipe({
    name: 'timeAgo',
    standalone: true
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: Date | string | null): string {
        const date = value instanceof Date ? value : new Date(value || '');

        if (isNaN(date.getTime())) return '';

        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) return 'Ahora';
        if (diffMinutes < 60) return `Hace ${diffMinutes}m`;
        if (diffHours < 24) return `Hace ${diffHours}h`;
        if (diffDays < 7) return `Hace ${diffDays}d`;

        return date.toLocaleDateString('es-ES');
    }
}

@Pipe({
    name: 'normalize',
    standalone: true
})
export class NormalizePipe implements PipeTransform {
    constructor(private conversionHelper: ConversionHelperService) { }

    transform(value: string | null): string {
        if (!value) return '';
        return this.conversionHelper.normalizeText(value);
    }
}

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string | null, limit: number = 50, suffix: string = '...'): string {
        if (!value) return '';
        if (value.length <= limit) return value;
        return value.substring(0, limit) + suffix;
    }
}

@Pipe({
    name: 'rating',
    standalone: true
})
export class RatingPipe implements PipeTransform {
    transform(value: number | string | null, maxStars: number = 5): string {
        const rating = typeof value === 'number' ? value : parseFloat(value || '0');
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        let stars = '★'.repeat(fullStars);
        if (hasHalfStar) stars += '☆';
        stars += '☆'.repeat(maxStars - fullStars - (hasHalfStar ? 1 : 0));

        return `${stars} (${rating.toFixed(1)})`;
    }
}

@Pipe({
    name: 'status',
    standalone: true
})
export class StatusPipe implements PipeTransform {
    private statusMap: Record<string, string> = {
        // Transport Status
        'PENDING': 'Pendiente',
        'CONFIRMED': 'Confirmado',
        'IN_PROGRESS': 'En progreso',
        'COMPLETED': 'Completado',
        'CANCELLED': 'Cancelado',

        // User Status
        'ACTIVE': 'Activo',
        'INACTIVE': 'Inactivo',
        'PENDING_VALIDATION': 'Pendiente validación',
        'VALIDATED': 'Validado',
        'REJECTED': 'Rechazado',

        // Invoice Status
        'PENDING_DRIVER': 'Pendiente conductor',
        'PENDING_PAYMENT': 'Pendiente pago',
        'PAID': 'Pagado',

        // Vehicle Status
        'AVAILABLE': 'Disponible',
        'MAINTENANCE': 'Mantenimiento',
        'OUT_OF_SERVICE': 'Fuera de servicio'
    };

    transform(value: string | null): string {
        if (!value) return '';
        return this.statusMap[value] || value;
    }
}

@Pipe({
    name: 'phoneFormat',
    standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
    transform(value: string | null): string {
        if (!value) return '';

        // Limpiar el número
        const cleaned = value.replace(/\D/g, '');

        // Formato español (+34 XXX XXX XXX)
        if (cleaned.length === 9 && cleaned.match(/^[6789]/)) {
            return `+34 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
        }

        // Si ya tiene código de país
        if (cleaned.length === 11 && cleaned.startsWith('34')) {
            const number = cleaned.substring(2);
            return `+34 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
        }

        return value;
    }
}

@Pipe({
    name: 'enumDisplay',
    standalone: true
})
export class EnumDisplayPipe implements PipeTransform {
    private displayMaps: Record<string, Record<string, string>> = {
        TransportPrincipalType: {
            'SIMPLE_MOVEMENT': 'Movimiento simple',
            'PICKUP_TO_FINAL_CUSTOMER': 'Recogida a cliente final',
            'DELIVERY_TO_FINAL_CUSTOMER': 'Entrega a cliente final',
            'PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER': 'Recogida y entrega a cliente final',
            'WITH_STOPOVER': 'Con parada'
        },
        VehicleType: {
            'CAR': 'Coche',
            'VAN': 'Furgoneta',
            'TRUCK': 'Camión',
            'MOTORCYCLE': 'Motocicleta'
        },
        FuelType: {
            'GASOLINE': 'Gasolina',
            'DIESEL': 'Diésel',
            'ELECTRIC': 'Eléctrico',
            'HYBRID': 'Híbrido'
        }
    };

    transform(value: string | null, enumType?: string): string {
        if (!value) return '';

        if (enumType && this.displayMaps[enumType]) {
            return this.displayMaps[enumType][value] || value;
        }

        // Fallback: convertir de SNAKE_CASE a formato legible
        return value
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}

// Exportación de todos los pipes para facilitar importación
export const SHARED_PIPES = [
    PricePipe,
    DistancePipe,
    DurationPipe,
    TimeAgoPipe,
    NormalizePipe,
    TruncatePipe,
    RatingPipe,
    StatusPipe,
    PhoneFormatPipe,
    EnumDisplayPipe
] as const;