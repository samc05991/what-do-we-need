import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.scss']
})

export class CreateListComponent implements OnInit {

    public list: List;
    public newItem: any = {
        name: ''
    }

    constructor(private _listService: ListService, private _router: Router) { 
        this.list = new List();
    }

    ngOnInit() {
    }

    addItemToList() {
        let newItem = Object.assign({}, this.newItem);

        this.list.items ? this.list.items.push(newItem) : this.list.items = [newItem];

        this.newItem.name = '';
    }

    removeItemFromList(index) {
        this.list.items.splice(index, 1);
    }

    saveList() {
        this._listService.handleAddList(this.list);
    }

    drop(event: CdkDragDrop<number[]>) {
        moveItemInArray(this.list.items, event.previousIndex, event.currentIndex);
    }
}
