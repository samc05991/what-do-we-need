import { Item } from './item.model';
import { BaseModel } from './base-model.model';

export class List extends BaseModel {
    
    public items?: Item[] = [];
    public shared_with?: [];
    public name?: string;
    public isExpanded?: Boolean;

    constructor(list?: any) {
        super(list);

        for(let i = 0; i < list.items.length; i++) {
            this.items[i] = new Item(list.items[i]);
        }

        this.isExpanded = false;
    }
}
