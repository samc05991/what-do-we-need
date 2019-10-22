import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list.model';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { faTrashAlt, faCog, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/models/item.model';
import { NeedsService } from 'src/app/services/needs.service';

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
        name: ''
    }

    constructor(
        private _listService: ListService,
        private _needsService: NeedsService
    ) {
        this.lists = this._listService.lists;
        this.needs = this._needsService.items;
    }

    ngOnInit() {
        this._listService.updateListSubscriber.subscribe(value => {
            this.lists = this._listService.lists;
        });

        this._needsService.updateNeedItemSubscriber.subscribe(value => {
            this.needs = this._needsService.items;
        });
    }

    addToNeeds(item: Item, index: number) {
        this.needs.push(item);
        this.stock.splice(index, 1)
    }
    addToStock(item: Item, index: number) {
        this.stock.push(item);
        this.needs.splice(index, 1)
    }

    addNewItemToNeeds() {
        this.needs.push(new Item(Object.assign({}, this.newItem)))
    }

    removeFromNeeds(index: number) {
        this.needs.splice(index, 1)
    }
    removeFromStock(index: number) {
        this.stock.splice(index, 1)
    }

    deleteList(list, index) {
        this.lists.splice(index, 1)

        this._listService.deleteList(list).subscribe();
    }
}
