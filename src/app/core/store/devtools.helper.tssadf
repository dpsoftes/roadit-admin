/**
 * Redux DevTools Helper para NgRx Signals
 * Permite visualizar el estado del store en Chrome DevTools
 */

interface DevToolsExtension {
  connect(): DevToolsConnection;
}

interface DevToolsConnection {
  send(action: string, state: any): void;
  subscribe(listener: (message: any) => void): void;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: DevToolsExtension;
  }
}

export class DevToolsHelper {
  private static devtoolsConnection: DevToolsConnection | null = null;
  
  static initDevTools(storeName: string = 'NgRx Signals Store') {
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
      this.devtoolsConnection = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
      console.log('🔧 Redux DevTools conectado para:', storeName);
    }
  }
  
  static logAction(action: string, state: any) {
    if (this.devtoolsConnection) {
      this.devtoolsConnection.send(action, state);
    }
    
    // También log en consola para debugging
    console.group(`🔄 Store Action: ${action}`);
    console.log('State:', state);
    console.groupEnd();
  }
}