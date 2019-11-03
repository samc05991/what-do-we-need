import { Injectable } from '@angular/core';
import { ServiceProviderService } from './service-provider.service';
import { Item } from '../models/item.model';

@Injectable({
    providedIn: 'root'
})

export class StockService extends ServiceProviderService {
    public apiEndpoint: string = '/items'

    handleAddItem(item: Item) {
        item.created_by = this._authService.getCurrentUserId();

        this.store(item).subscribe((response: any) => {
            this.updateSubscriber(new Item(response.obj));
        });
    }

    handleGetItems() {
        if (this.data.length > 0 || this.gettingData) {
            return this.data;
        }

        this.gettingData = true;

        return this.index({status: 'in_stock'}).subscribe((response: any) => {
            for (const item of response.obj) {
                this.updateSubscriber(new Item(item));
            }
        });
    }
}
