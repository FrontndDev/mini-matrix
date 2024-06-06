import {
    Matrix
} from "./store.interface";

export interface IPartners {
    currentPage: number;
    list: Matrix[];
    totalCount: number;
    totalPages: number;
}

export interface IGetPendingBoostersParams {
    filter?: number;
    changeTab?: boolean;
    isPartnerMatrix?: boolean;
    newTypeMatrix?: null | string;
    matrixType?: string;
    userId: number;
    matrixUUID: number;
    ownerID: number;
    matrixFilterPageId: number;
}

export interface IPosition {
    depth: number;
    pos: number;
}

export interface IExposePartnerParams extends IPosition {
    matrix_id: number;
    child_id: number;
    chainMode?: string;
    notificationText?: string;
}

export interface ILineOfPartners {
    id: number;
    name: string;
}

export interface IInfinityPartnersParams {
    parentId: number;
    isPartnerMatrix: boolean;
}