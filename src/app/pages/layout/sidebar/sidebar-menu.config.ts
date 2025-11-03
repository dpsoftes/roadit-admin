import { MenuItem } from './sidebar.types';

/**
 * Configuración del menú del sidebar
 * Estructura basada en el diseño exacto de Figma
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'home',
    label: 'navigation.dashboard',
    route: '/dashboard'
  },
  {
    icon: 'sentiment_satisfied',
    label: 'navigation.users',
    route: '/users'
  },
  {
    icon: 'work',
    label: 'navigation.clients',
    route: '/clients',
    submenus: [
      {
        icon: 'groups',
        label: 'navigation.client_group',
        route: '/clients/group'
      },
      {
        icon: 'groups',
        label: 'navigation.clients_list',
        route: '/clients/list'
      }
    ]
  },
  {
    icon: 'sentiment_satisfied',
    label: 'navigation.client_entity_users',
    route: '/clients/users'
  },
  {
    icon: 'custom',
    iconType: 'png',
    iconPath: 'assets/icons/steering-wheel.png',
    label: 'navigation.drivers',
    route: '/drivers'
  },
  {
    icon: 'directions_car',
    label: 'navigation.transports',
    submenus: [
      {
        icon: 'add_circle',
        label: 'navigation.create_transport',
        route: '/transports/create'
      },
      {
        icon: 'custom',
        iconType: 'png',
        iconPath: 'assets/icons/steering-wheel.png',
        label: 'navigation.transport_assignment',
        route: '/transports/assignment'
      },
      {
        icon: 'history',
        label: 'navigation.transport_history',
        route: '/transports/history'
      }
    ]
  },
  {
    icon: 'assignment',
    label: 'navigation.quality_info_management',
    route: '/transports/quality'
  },
  {
    icon: 'warning',
    label: 'navigation.drivers_incidents',
    route: '/transports/incidents',
    badge: 27
  },
  {
    icon: 'assignment-ind-icon',
    iconPath: 'assets/icons/assignment-ind.svg',
    iconType: 'png',

    label: 'navigation.driver_regularizations',
    route: '/transports/regularizations'
  },
  {
    icon: 'account_balance_wallet',
    label: 'navigation.additional_expenses',
    route: '/transports/expenses',
    badge: 30
  },
  {
    icon: 'all_inbox',
    label: 'navigation.driver_invoice_emission',
    route: '/transports/invoice-emission'
  },
  {
    icon: 'attach_money',
    label: 'navigation.driver_invoices',
    route: '/transports/driver-invoices',
    badge: 27
  },
  {
    icon: 'attach_money',
    label: 'navigation.client_invoices',
    route: '/transports/client-invoices'
  },
  {
    icon: 'chat',
    label: 'navigation.notifications',
    route: '/notifications'
  }
];