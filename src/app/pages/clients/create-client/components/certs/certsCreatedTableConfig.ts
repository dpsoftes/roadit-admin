import { TableConfig } from '@components/dynamic-table/dynamic-table.interfaces';

export const certsCreatedTableConfig: TableConfig = {
    columns: [
        { key: 'cert_list', label: 'clients.create-client.cert_list', type: 'text', width: 70 },
        { key: 'actions', label: 'clients.list.actions', type: 'actions', width: 30, actionConfig: {
            actions: [
                {
                    icon: 'material-symbols-outlined/visibility',
                    label: 'Ver',
                    color: 'primary',
                    action: 'view'
                }
            ]
        }
    }
    ],
    data: [
        { cert_list: 'Cert 1' },
        { cert_list: 'Cert 2' },
        { cert_list: 'Cert 3' },
    ],
    exportable: false,
    selectable: false,
    pagination: false,
    
}