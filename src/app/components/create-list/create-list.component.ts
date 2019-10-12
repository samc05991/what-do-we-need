import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {

    public list: List;
    public newItem: Object = {
        name: ''
    }

    constructor() { 
        this.list = new List();
    }

    ngOnInit() {
    }

    addItemToList() {
        let newItem = Object.assign({}, this.newItem);

        this.list.items ? this.list.items.push(newItem) : this.list.items = [newItem];
    }
}
