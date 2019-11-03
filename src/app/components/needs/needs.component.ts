import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { NeedsService } from 'src/app/services/needs.service';
import { StockService } from 'src/app/services/stock.service';
import { faTrashAlt, faCog, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-needs',
    templateUrl: './needs.component.html',
    styleUrls: ['./needs.component.scss']
})

export class NeedsComponent implements OnInit {
    public faTrashAlt = faTrashAlt;
    public faCog = faCog;
    public faExternalLinkAlt = faExternalLinkAlt;
    public needs: Item[] = [];
    public newItem: {} = {
        name: '',
        status: 'need'
    }

    constructor(
        private _needsService: NeedsService,
        private _stockService: StockService
    ) { 
        this.needs = this._needsService.data;        
    }

    ngOnInit() {     
        this._needsService.subscriberUpdated.subscribe(value => {
            this.needs = this._needsService.data;
        });
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
}
