import { withMethods, patchState } from '@ngrx/signals';
import { BaseSignalsModel } from '../models/BaseSignalsModel';

export function withSignalStoreBase<StateType>() {
  return withMethods((store) => ({
    patch(stateUpdate: Partial<StateType>) {
      patchState(store, stateUpdate);
    },
    setFromSignal<T extends BaseSignalsModel<any, any>>(data: T) {
      // IMPORTANTE: El acceso a store['state']() depende de la implementación interna de signalStore en @ngrx/signals.
      // Actualmente, signalStore siempre expone este método interno para obtener el snapshot del estado,
      // pero no está garantizado por el tipado público. Si el core de @ngrx/signals cambia, este acceso podría romperse.
      // No depende de cómo definas tus stores ni de tus acciones, solo de la librería.
      const modelName = data?.constructor?.name.replace('SignalsModel', '');
      const stateKeys = Object.keys(store['state']());
      const matchKey = stateKeys.find(
        key => key.toLowerCase() === modelName.toLowerCase() || key.toLowerCase() === `${modelName.toLowerCase()}profile` // para casos como adminProfile
      );
      if (matchKey) {
        patchState(store, { [matchKey]: data.toJson() });
      }
      // Si no hay coincidencia, no hace nada
    },
    // Puedes agregar más métodos comunes aquí
  }));
}
