import { List } from './list.model';

export class User {

    public _id: string;
    public email: string;
    public password: string = '';
    public lists: Array<List> = [];

    constructor() {}
}
