import { Signal, signal, WritableSignal } from '@angular/core';

/**
 * Clase base para todas las entidades que usan signals.
 * Automatiza la conversión entre DTOs y Entities evitando código repetitivo.
 */
export abstract class BaseEntity<TDto> {
    /**
     * Convierte un DTO a una Entity automáticamente.
     * Detecta el tipo de dato y aplica la conversión correspondiente.
     */
    protected populateFromDto(dto: Partial<TDto>): void {
        for (const key in dto) {
            if (!dto.hasOwnProperty(key)) continue;

            const value = dto[key];
            const entityProp = (this as any)[key];

            // Si la propiedad no existe en la entidad, la ignoramos
            if (!entityProp) continue;

            // Si es un signal (WritableSignal)
            if (this.isSignal(entityProp)) {
                this.setSignalValue(entityProp, value, key);
            }
        }
    }

    /**
     * Convierte la Entity a un DTO.
     */
    toDto(): TDto {
        const dto: any = {};
        
        for (const key in this) {
            if (!this.hasOwnProperty(key)) continue;

            const value = (this as any)[key];

            // Si es un signal
            if (this.isSignal(value)) {
                const signalValue = value();
                dto[key] = this.convertToDtoValue(signalValue);
            }
        }

        return dto as TDto;
    }

    /**
     * Actualiza la entidad desde un DTO parcial.
     */
    copyFromDto(dto: Partial<TDto>): void {
        for (const key in dto) {
            if (!dto.hasOwnProperty(key)) continue;

            const value = dto[key];
            const entityProp = (this as any)[key];

            if (!entityProp || !this.isSignal(entityProp)) continue;

            if (value !== undefined) {
                this.setSignalValue(entityProp, value, key);
            }
        }
    }

    /**
     * Genera un objeto con solo las propiedades modificadas.
     */
    toPatch<T = Partial<TDto>>(): T {
        const defaults = this.createDefaultInstance();
        const patch: any = {};

        for (const key in this) {
            if (!this.hasOwnProperty(key)) continue;

            const value = (this as any)[key];
            const defaultValue = (defaults as any)[key];

            if (!this.isSignal(value)) continue;

            const currentValue = value();
            const defaultVal = defaultValue ? defaultValue() : undefined;

            if (!this.valuesAreEqual(currentValue, defaultVal)) {
                patch[key] = this.convertToDtoValue(currentValue);
            }
        }

        return patch as T;
    }

    /**
     * Verifica si un objeto es un Signal.
     */
    private isSignal(obj: any): obj is WritableSignal<any> {
        return obj && typeof obj === 'function' && 'set' in obj && 'update' in obj;
    }

    /**
     * Establece el valor de un signal según el tipo de dato.
     */
    private setSignalValue(signalProp: WritableSignal<any>, value: any, key: string): void {
        if (value === null || value === undefined) {
            signalProp.set(value);
            return;
        }

        // Si el valor es un objeto plano (DTO) y necesita conversión a Entity
        if (this.isPlainObject(value) && this.hasFromDtoMethod(value)) {
            const currentValue = signalProp();
            if (currentValue && typeof currentValue.constructor?.fromDto === 'function') {
                signalProp.set(currentValue.constructor.fromDto(value));
                return;
            }
        }

        // Si es un array de objetos que necesitan conversión
        if (Array.isArray(value) && value.length > 0 && this.isPlainObject(value[0])) {
            const currentValue = signalProp();
            if (Array.isArray(currentValue) && currentValue.length > 0) {
                const firstItem = currentValue[0];
                if (firstItem && typeof firstItem.constructor?.fromDto === 'function') {
                    signalProp.set(value.map((item: any) => firstItem.constructor.fromDto(item)));
                    return;
                }
            }
        }

        // Valor simple
        signalProp.set(value);
    }

    /**
     * Convierte un valor de Entity a DTO.
     */
    private convertToDtoValue(value: any): any {
        if (value === null || value === undefined) {
            return value;
        }

        // Si tiene método toDto (es una Entity anidada)
        if (value && typeof value.toDto === 'function') {
            return value.toDto();
        }

        // Si es un array de Entities
        if (Array.isArray(value) && value.length > 0 && typeof value[0]?.toDto === 'function') {
            return value.map(item => item.toDto());
        }

        return value;
    }

    /**
     * Compara dos valores para ver si son iguales.
     */
    private valuesAreEqual(a: any, b: any): boolean {
        if (a === b) return true;
        if (a == null || b == null) return a === b;
        
        // Para objetos y arrays, comparar JSON
        if (typeof a === 'object' || Array.isArray(a)) {
            return JSON.stringify(a) === JSON.stringify(b);
        }

        return false;
    }

    /**
     * Verifica si un valor es un objeto plano (no Array, Date, etc.)
     */
    private isPlainObject(obj: any): boolean {
        return obj && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date);
    }

    /**
     * Verifica si un objeto tiene estructura de DTO (tiene propiedades conocidas)
     */
    private hasFromDtoMethod(obj: any): boolean {
        // Esto es una heurística simple, podrías mejorarlo
        return this.isPlainObject(obj);
    }

    /**
     * Crea una instancia por defecto de la entidad.
     * Debe ser implementado por las clases hijas.
     */
    protected abstract createDefaultInstance(): this;
}
