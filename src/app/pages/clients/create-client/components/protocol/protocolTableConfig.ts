import { TableConfig } from "@components/dynamic-table/dynamic-table.interfaces";
import { signal } from "@angular/core";

export const protocolTableConfig: TableConfig = {
    columns: [
        { key: 'title', label: 'clients.create-client.schemas', type: 'text', width: 70 },
        { key: 'actions', label: 'clients.list.actions', type: 'actions', width: 30, actionConfig: {
            actions: [
                { icon: 'material-symbols-outlined/visibility', label: 'Ver', color: 'primary', action: 'view' }
            ]
        }
    }
    ],
    data: signal([]),
    exportable: false,
    selectable: false,
    pagination: false,
    searchable: false,
    filterable: false
}