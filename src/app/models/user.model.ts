import { List } from './list.model';
import { BaseModel } from './base-model.model';

export class User extends BaseModel {

    public email: string;
    public password: string = '';
    public lists: Array<List> = [];

    constructor(user?: any) {
        super(user);
    }
}
