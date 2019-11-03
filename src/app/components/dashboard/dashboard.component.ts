import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { faTrashAlt, faCog, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/models/item.model';
import { NeedsService } from 'src/app/services/needs.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({opacity: 0}),
                    animate('500ms', style({opacity: 1}))
                ]),
                transition(':leave', [
                    style({opacity: 1}),
                    animate('500ms', style({opacity: 0}))
                ])
            ]
        )
    ],
})

export class DashboardComponent implements OnInit {
    public lists: List[] = [];
    public stock: Item[] = [];
    public needs: Item[] = [];

    public faTrashAlt = faTrashAlt;
    public faCog = faCog;
    public faExternalLinkAlt = faExternalLinkAlt;

    public addItemToStock: Boolean = false;
    public newItem: {} = {
        name: '',
        status: 'need'
    }

    constructor(
        private _listService: ListService,
        private _needsService: NeedsService,
        private _stockService: StockService
    ) {
        this.lists = this._listService.data;
        this.needs = this._needsService.data;
    }

    ngOnInit() {
        this._listService.subscriberUpdated.subscribe(value => {
            this.lists = this._listService.data;
        });

        this._needsService.subscriberUpdated.subscribe(value => {
            this.needs = this._needsService.data;
        });

        this._needsService.subscriberUpdated.subscribe(value => {
            this.stock = this._stockService.data;
        });
    }

    /**
     * @desc Add update the stocklist item
     */
    addToNeedsFromStock(item: Item, index: number) {
        item.status = 'need';

        this._needsService.update(item).subscribe((res) => {
            this._needsService.updateSubscriber(item);
            this.stock.splice(index, 1);
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
     * @desc Add from a list or stock to the needs list
     */
    addNewItemToNeeds() {
        this._needsService.handleAddItem(new Item(Object.assign({}, this.newItem)));
    }

    /**
     * @desc Add from a list or stock to the needs list
     */
    removeFromNeeds(index: number) {
        this._needsService.destroy(this.needs[index]).subscribe();

        this.needs.splice(index, 1);
    }

    /**
     * @desc Add from a list or stock to the needs list
     */
    addToStock(item: Item, index: number) {
        item.status = 'in_stock';

        this._stockService.update(item).subscribe((res) => {
            this._stockService.updateSubscriber(item);
        });

        this.needs.splice(index, 1);
    }

    /**
     * @desc Remove an item from stock
     */
    removeFromStock(index: number) {
        this.stock.splice(index, 1)
    }

    /**
     * @desc Deletes a list
     */
    deleteList(list, index) {
        this.lists.splice(index, 1)
        this._listService.destroy(list).subscribe();
    }
}
