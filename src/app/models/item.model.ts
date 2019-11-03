import { BaseModel } from './base-model.model';

export class Item extends BaseModel {

    public name?: string;
    public quantity?: Number;
    public isExpanded?: Boolean;
    public status?: String;
    public expiry_date?: any;
    public recurs?: {}

    constructor(item?: any) {
        super(item);

        this.isExpanded = false;
    }
}
