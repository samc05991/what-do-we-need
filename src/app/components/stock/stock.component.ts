import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { Item } from 'src/app/models/item.model';
import { NeedsService } from 'src/app/services/needs.service';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
    public stock: Item[] = [];

    constructor(
        private _stockService: StockService,
        private _needsService: NeedsService
    ) {
        this.stock = this._stockService.data;
    }
    
    ngOnInit() {
        this._stockService.subscriberUpdated.subscribe(value => {
            this.stock = this._stockService.data;
        });
    }

    /**
     * @desc Add update the stocklist item
     */
    addToNeedsFromStock(item: Item, index: number) {
        item.status = 'need';

        this._stockService.update(item).subscribe((res) => {
            this._needsService.updateSubscriber(item);
            this.stock.splice(index, 1);
        });
    }

    /**
     * @desc Remove an item from stock
     */
    removeFromStock(index: number) {
        this.stock.splice(index, 1)
    }
}
