import { signal } from "@angular/core";
import { TableConfig, ExportConfig } from "@components/dynamic-table/dynamic-table.interfaces";
import { TransportPrincipalType, TransportStatus } from "../../core/enums/transport.enum";

export const assignmentTableConfig: TableConfig = {
  columns: [
    {
      key: 'id',
      label: 'transports.assignments.id',
      type: 'text',
      width: 6
    },
    {
      key: 'reference_number',
      label: 'transports.assignments.reference',
      type: 'text',
      width: 8
    },
    {
      key: 'client_info',
      label: 'transports.assignments.client_sub',
      type: 'text',
      width: 12
    },
    {
      key: 'transport_principal_type',
      label: 'transports.assignments.movement',
      type: 'text',
      width: 10,
    },
    {
      key: 'init_date',
      label: 'transports.assignments.date_time',
      type: 'text',
      width: 10
    },
    {
      key: 'max_price',
      label: 'transports.assignments.client_price',
      type: 'text',
      width: 8
    },
    {
      key: 'min_price',
      label: 'transports.assignments.best_price',
      type: 'text',
      width: 8
    },
    {
      key: 'appointment_management',
      label: 'transports.assignments.appointment',
      type: 'text',
      width: 8,
      // chipConfig: {
      //   type: 'status',
      //   translateKey: 'transportStatus'
      // }
    },
    {
      key: 'tags',
      label: 'transports.assignments.tags',
      type: 'chip-array',
      width: 8,
      chipConfig: {
        type: 'tags'
      }
    },
    {
      key: 'kilometers',
      label: 'transports.assignments.km_duration',
      type: 'text',
      width: 8
    },
    {
      key: 'reservation_number',
      label: 'transports.assignments.budget_number',
      type: 'text',
      width: 8
    },
    {
      key: 'driver_name',
      label: 'transports.assignments.responsible',
      type: 'text',
      width: 8
    },
    {
      key: 'actions',
      label: 'transports.assignments.actions',
      type: 'actions',
      width: 8,
      actionConfig: {
        actions: [
          {
            icon: 'material-symbols-outlined/lock',
            label: 'Bloquear',
            color: 'warn',
            action: 'lock'
          },
          {
            icon: 'material-symbols-outlined/more_vert',
            label: 'Más opciones',
            color: 'primary',
            action: 'menu'
          }
        ]
      }
    }
  ],
  data: signal([]), // Se actualizará dinámicamente desde el servicio
  exportable: true,
  selectable: false,
  pagination: true,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50],
  searchable: true,
  searchPlaceholder: 'transports.assignments.searchPlaceholder',
  filterable: true,
  filters: [
    {
      key: 'reference_number',
      label: 'transports.assignments.reference_filter',
      type: 'text',
      width: 19
    },
    {
      key: 'transport_number',
      label: 'transports.assignments.transport_number_filter',
      type: 'text',
      width: 19
    },
    {
      key: 'reservation_number',
      label: 'transports.assignments.reservation_number_filter',
      type: 'text',
      width: 19
    },
    {
      key: 'created_from',
      label: 'transports.assignments.creation_date_filter',
      type: 'date',
      width: 19
    },
    {
      key: 'departure_province',
      label: 'transports.assignments.departure_province_filter',
      type: 'select',
      width: 19,
      options: [
        { value: 'madrid', label: 'Madrid' },
        { value: 'barcelona', label: 'Barcelona' },
        { value: 'valencia', label: 'Valencia' },
        { value: 'sevilla', label: 'Sevilla' },
        { value: 'bilbao', label: 'Bilbao' },
        { value: 'zaragoza', label: 'Zaragoza' },
        { value: 'malaga', label: 'Málaga' },
        { value: 'murcia', label: 'Murcia' },
        { value: 'palma', label: 'Palma de Mallorca' },
        { value: 'las_palmas', label: 'Las Palmas' }
      ]
    },
    {
      key: 'arrival_province',
      label: 'transports.assignments.arrival_province_filter',
      type: 'select',
      width: 19,
      options: [
        { value: 'madrid', label: 'Madrid' },
        { value: 'barcelona', label: 'Barcelona' },
        { value: 'valencia', label: 'Valencia' },
        { value: 'sevilla', label: 'Sevilla' },
        { value: 'bilbao', label: 'Bilbao' },
        { value: 'zaragoza', label: 'Zaragoza' },
        { value: 'malaga', label: 'Málaga' },
        { value: 'murcia', label: 'Murcia' },
        { value: 'palma', label: 'Palma de Mallorca' },
        { value: 'las_palmas', label: 'Las Palmas' }
      ]
    },
    {
      key: 'driver_email',
      label: 'transports.assignments.email_filter',
      type: 'text',
      width: 19
    },
    {
      key: 'date_range',
      label: 'transports.assignments.date_range_filter',
      type: 'date',
      width: 19
    },
    {
      key: 'transport_principal_type',
      label: 'transports.list.movement_type_filter',
      type: 'select',
      width: 19,
      options: [
        { value: TransportPrincipalType.SIMPLE_MOVEMENT, label: 'transportPrincipalType.SIMPLE_MOVEMENT' },
        { value: TransportPrincipalType.PICKUP_TO_FINAL_CUSTOMER, label: 'transportPrincipalType.PICKUP_TO_FINAL_CUSTOMER' },
        { value: TransportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER, label: 'transportPrincipalType.DELIVERY_TO_FINAL_CUSTOMER' },
        { value: TransportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER, label: 'transportPrincipalType.PICKUP_AND_DELIVERY_TO_FINAL_CUSTOMER' },
        { value: TransportPrincipalType.WITH_STOPOVER, label: 'transportPrincipalType.WITH_STOPOVER' }
      ]
    },
    {
      key: 'tags',
      label: 'transports.assignments.tags_filter',
      type: 'chips',
      multiple: true,
      width: 19,
      options: [
        { value: 'urgent', label: 'Urgente' },
        { value: 'fragile', label: 'Frágil' },
        { value: 'heavy', label: 'Pesado' },
        { value: 'oversized', label: 'Gran volumen' },
        { value: 'hazardous', label: 'Peligroso' },
        { value: 'temperature', label: 'Temperatura controlada' },
        { value: 'express', label: 'Express' },
        { value: 'standard', label: 'Estándar' }
      ]
    }
  ],
    exportConfig: {
      columns: ['id', 'reference_number', 'client_info', 'transport_principal_type', 'init_date', 'max_price', 'min_price', 'appointment_management', 'tags', 'kilometers', 'reservation_number', 'driver_name'],
      headers: ['ID', 'Referencia', 'Cliente/Sub', 'Movimiento', 'Fecha/Hora', 'Precio Cliente', 'Mejor Precio', 'Cita', 'Tags', 'Km/Duración', 'Nº Presupuesto', 'Responsable'],
      filename: `asignaciones_transporte_${new Date().toISOString().split('T')[0]}.csv`
    },
  actions: {
    create: { label: 'transports.assignments.create_transport', route: '/transports/create' }
  }
};