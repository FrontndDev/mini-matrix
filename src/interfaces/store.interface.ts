import { IPosition } from "./partners.interface";
import { type Component } from "vue";

export interface IObject {
    [key: string]: string
}

export type Type = {
    currency: string;
    price: number;
    category: string;
    type: string;
    title: string;
    required: boolean;
    depth: number;
    pow: number;
    allowBoosters: boolean;
    showLegend: boolean;
    infinityPos: number;
}

export interface ListOfTypes {
    types: Type[];
    opened: string[];
    pending: {
        [key: string]: number
    };
    teamOpened: {
        [key: string]: number
    };
}

export interface IOwner {
    id: number;
    fio: string;
    photo: string;
    photoHash: string;
    lvl_insystem: string;
    immutable?: boolean;
}

export interface IBinStatus {
    [key: string]: number;
}

export interface Matrix {
    id: number;
    uuid: string;
    owner: IOwner;
    parent_matrix_id: number | null;
    parent_matrix_uuid: string | null;
    filled: boolean;
    prev_type_matrix_id: number | null;
    create_date: string;
    time_to_activate?: {
        years: number;
        months: number;
        days: number;
        hours: number;
        mins: number;
    };
    type: string;
    is_bonus: boolean;
    is_booster: boolean;
    number: number;
    ceils: {
        [key: string]: {
            [key: string]: string;
        };
    };
    binstatus: IBinStatus[];
    immutable?: boolean;
}

export interface MatrixConfig {
    currency: string;
    category: string;
    showLegend: boolean;
    infinityPos: number;
    type: string;
    title: string;
    price: number;
    activationPrice: number;
    required: boolean;
    depth: number;
    pow: number;
}

export interface FillReward {
    event: string;
    value: {
        type?: string;
        count?: number;
        amount?: number;
        title?: string;
    } & string;
}

export interface IInformer {
    activationType: string;
    ceilType: string;
    userType: string;
}

export interface Ceil {
    depth: number;
    pos: number;
    queueId: number | null;
    matrix?: Matrix | null;
    allowBuyClone: boolean;
    allowSniper: boolean;
    fillRevard: FillReward[];
    isInfinity: boolean;
    informer: IInformer;
    uplineCeilMatrixId?: number;
}

export interface CeilsCollection {
    [key: string]: {
        [key: string]: Ceil;
    };
}

export interface Ceils {
    [key: string]: Ceil
}

export interface IMatrix {
    ctaText?: string;
    in_queue?: boolean;
    matrix: Matrix | null;
    matrixConfig: MatrixConfig;
    ceilsCollection?: CeilsCollection;
    allowTop: boolean | undefined;
    countInInfinity: number;
}

export interface IBuyBoosterParams extends IPosition {
    matrix_id: number;
    chainMode?: string;
    notificationText?: string;
}

export interface IWallet {
    id: string;
    currency: string;
    amount: number;
    amount_string: string;
    address: string | null;
    type: string | number;
}

export interface IFeePercent {
    USD: Record<string, never>;
    TON: Record<string, never>;
    JETON: Record<string, never>;
    USDT: Record<string, never>;
}

export interface IMinWithdrawal {
    USD: number;
    TON: number;
    USDT: number;
}

export interface IBalance {
    wallets: IWallet[];
    min_withdrawal: IMinWithdrawal;
    fee_percent: IFeePercent;
}

export interface ITab {
    id: number;
    name: string;
    indicator: {
        green: boolean;
        orange: boolean;
    };
    checkbox?: boolean;
    tooltip?: string;
}

export interface ICellInformationItem {
    icon: Component;
    title: string;
    value: string;
}

export interface ICellInformation {
    [key: string]: ICellInformationItem;
}

export interface ITabDefault {
    key: 'partners' | 'boosters' | 'chains';
    defaultTabID: number;
}

export type TabDefaults = {
    [key: number]: ITabDefault;
};