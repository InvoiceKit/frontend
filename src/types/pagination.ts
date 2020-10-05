export interface Pagination<T> {
    items: Array<T>;
    metadata: {
        per: number;
        total: number;
        page: number;
    };
}
