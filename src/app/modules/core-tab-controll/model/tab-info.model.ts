import {TabType} from './TabType';

export interface TabInfoModel {
    id: number;
    name: string;
    type: TabType;
    data?: any;
}
