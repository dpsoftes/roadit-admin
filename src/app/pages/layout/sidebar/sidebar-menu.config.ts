import { MenuItem } from './sidebar.types';

/**
 * Configuración del menú del sidebar
 * Estructura basada en el diseño exacto de Figma
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'custom',
    iconType: 'svg',
    iconPath: 'assets/icons/sidebar/home.svg',
    label: 'navigation.dashboard',
    route: '/dashboard'
  },
  {
    icon: 'person',
    label: 'navigation.users',
    route: '/users'
  },
  {
    icon: 'work',
    label: 'navigation.clients',
    // route: '/clients',
    collapsed: true,
    submenus: [
      {
        icon: 'groups',
        label: 'navigation.client_group',
        route: '/clients/groups'
      },
      {
        icon: 'groups',
        label: 'navigation.clients_list',
        route: '/clients/list'
      }
    ]
  },
  {
    icon: 'person',
    label: 'navigation.client_entity_users',
    route: '/clients/users'
  },
  {
    icon: 'custom',
    iconType: 'svg',
    iconPath: 'assets/icons/sidebar/drivers.svg',
    label: 'navigation.drivers',
    route: '/drivers'
  },
  {
    icon: 'directions_car',
    label: 'navigation.transports',
    collapsed: true,
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
    icon: 'custom',
    iconType: 'svg',
    iconPath: 'assets/icons/sidebar/exclamation.svg',
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
    icon: 'custom',
    iconType: 'svg',
    iconPath: 'assets/icons/sidebar/invoicesToDrivers.svg',
    label: 'navigation.driver_invoice_emission',
    route: '/transports/invoice-emission'
  },
  {
    icon: 'custom',
    iconType: 'svg',
    iconPath: 'assets/icons/sidebar/bills.svg',
    label: 'navigation.driver_invoices',
    route: '/transports/driver-invoices',
    badge: 27
  },
  {
    icon: 'custom',
    iconType: 'svg',
    iconPath: 'assets/icons/sidebar/bills.svg',
    label: 'navigation.client_invoices',
    route: '/transports/client-invoices'
  },
  {
    icon: 'custom',
    iconType: 'svg',
    iconPath: 'assets/icons/sidebar/notifications.svg',
    label: 'navigation.notifications',
    route: '/notifications'
  },
];
