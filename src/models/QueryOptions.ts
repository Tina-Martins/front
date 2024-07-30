
import * as admin from 'firebase-admin';
  
export interface QueryParam {
    field: string;
    operator: FirebaseFirestore.WhereFilterOp;
    value: any;
}

export interface OrderByParam {
    field: string;
    direction: "asc" | "desc";
}

export interface PaginationOptions {
    limit: number;
    lastDocId?: string | null;
}

export interface QueryOptions {
    filters?: QueryParam[];
    orderBy?: OrderByParam;
    paginationOptions?: PaginationOptions;
}