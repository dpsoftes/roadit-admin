import { TableConfig } from "@components/dynamic-table/dynamic-table.interfaces";
import { signal } from "@angular/core";

export const protocolAssignedTableConfig: TableConfig = {
    columns: [
        { key: 'title', label: 'clients.create-client.protocols', type: 'text', width: 40 },
        { key: 'protocol_type', label: 'clients.create-client.type', type: 'text', width: 40 },
        { key: 'actions', label: 'clients.list.actions', type: 'actions', width: 30, actionConfig: {
            actions: [
                { icon: 'material-symbols-outlined/edit_square', label: 'Editar', color: 'primary', action: 'edit' },
                { icon: 'material-symbols-outlined/delete', label: 'Eliminar', color: 'error', action: 'delete' }
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