export class BaseModel {

    // public _id?: string;
    public _id: string;
    public created_by?: string;

    constructor(data: {} = {}) {
        Object.assign(this, data)
    }
}
