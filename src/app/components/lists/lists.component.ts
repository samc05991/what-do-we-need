import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { NeedsService } from 'src/app/services/needs.service';
import { ListService } from 'src/app/services/list.service';
import { StockService } from 'src/app/services/stock.service';
import { List } from 'src/app/models/list.model';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
    public lists: List[] = [];

    constructor(
        private _listService: ListService,
        private _needsService: NeedsService,
    ) {
        this.lists = this._listService.data;
    }

    ngOnInit() {
        this._listService.subscriberUpdated.subscribe(value => {
            this.lists = this._listService.data;
        });
    }
    
    /**
     * @desc Add an item from a list
     */
    addToNeedsFromList(item: Item) {
        item.status = 'need';

        this._needsService.handleAddItem(new Item(Object.assign({}, item)));
    }

    /**
     * @desc Deletes a list
     */
    deleteList(list, index) {
        this.lists.splice(index, 1)
        this._listService.destroy(list).subscribe();
    }
}
