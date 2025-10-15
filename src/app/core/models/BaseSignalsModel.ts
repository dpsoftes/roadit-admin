import { signal, Signal } from '@angular/core';

export abstract class BaseSignalsModel<TProps, TModel> {
  /**
   * Crea una nueva instancia del modelo, combinando el estado actual con updates.
   * Debe ser implementado por la subclase para devolver la instancia correcta.
   */
  abstract copyWith(updates: Partial<TProps>): TModel;

  /**
   * Convierte el modelo a un objeto plano (sin signals).
   * Debe ser implementado por la subclase.
   */
  abstract toJson(): TProps;

  /**
   * Crea una instancia del modelo a partir de un objeto plano.
   * Debe ser implementado por la subclase.
   */
  static fromJson<TProps, TModel>(this: new (data: Partial<TProps>) => TModel, json: TProps): TModel {
    return new this(json);
  }
}
