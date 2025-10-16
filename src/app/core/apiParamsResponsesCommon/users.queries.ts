import { PagedQueryParams } from "./commons";

export class UsersListRequest extends PagedQueryParams {
    description?: string;
    email?: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    last_name?: string;
    name?: string;
    username?: string;
    [property: string]: any;
}