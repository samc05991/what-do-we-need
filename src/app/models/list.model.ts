export class List {

    public _id?: string;
    public items?: [{}];
    public shared_with?: [];
    public created_by?: string;
    public name?: string;
    public isExpanded: Boolean;

    constructor(list?: any) {
        if(list) {
            this._id = list._id || '';
            this.name = list.name || '';
            this.items = list.items || '';
            this.shared_with = list.shared_with || '';
            this.created_by = list.created_by || '';
        }

        this.isExpanded = false;
    }
}
