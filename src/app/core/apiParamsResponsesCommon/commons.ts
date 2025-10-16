export class PagedQueryParams {
    page?: number;
    page_size?: number;
    [property: string]: any;
}

export class ResponsListsCommon<T>{
    count: number = 0;
    next?: string;
    previous?: string; 
    results: T[] = [];
    [property: string]: any;
}