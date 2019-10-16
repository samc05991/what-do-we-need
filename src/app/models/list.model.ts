import { Item } from './item.model';
import { BaseModel } from './base-model.model';

export class List extends BaseModel {
    
    public items?: Item[] = [];
    public shared_with?: [];
    public name?: string;
    public isExpanded: Boolean;

    constructor(list?: any) {
        super(list);

        this.isExpanded = false;
    }
}
