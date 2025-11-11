import { signal } from "@angular/core";
import { TableConfig } from "@components/dynamic-table/dynamic-table.interfaces";

export const additionalServicesTableConfig: TableConfig = {
    columns: [
        { key: 'name', label: 'clients.create-client.name', type: 'text', width: 70 },
        { key: 'description', label: 'clients.create-client.description', type: 'text', width: 70 },
        { key: 'actions', label: 'clients.list.actions', type: 'actions', width: 30, actionConfig: {
            actions: [
                { icon: 'material-symbols-outlined/visibility', label: 'Ver', color: 'primary', action: 'view' }
            ]
        }
    }
    ],
    data: signal([
        { name: 'Additional Service 1', description: 'Description 1' },
        { name: 'Additional Service 2', description: 'Description 2' },
        { name: 'Additional Service 3', description: 'Description 3' },
    ]),
    exportable: false,
    selectable: false,
    pagination: false,
    searchable: false,
    filterable: false
}