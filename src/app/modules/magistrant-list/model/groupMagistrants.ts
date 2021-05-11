import {MaigistrantModel} from './maigistrant.model';

export interface GroupMagistrants {
    groupNumber: number;
    loading: boolean;
    magistrants: MaigistrantModel[];
}
