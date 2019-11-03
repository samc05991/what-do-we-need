import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { EnvironmentConfig } from '../services/environment-config.service';
import { AuthService } from '../services/auth.service';
import { List } from '../models/list.model';
import { Item } from '../models/item.model';
import { Router } from '@angular/router';
import { ServiceProviderService } from './service-provider.service';
import { NeedsService } from './needs.service';

@Injectable()

export class ListService extends ServiceProviderService {
    public apiEndpoint: string = '/lists';

    constructor(
        _http: HttpClient,
        _envConfig: EnvironmentConfig,
        _authService: AuthService,
        _routeService: Router,
        private _needsService: NeedsService
    ) {
        super(_http, _envConfig, _authService, _routeService);
    }

    handleAddList(list: List, updateNeedList: Boolean = false) {
        list.created_by = this._authService.getCurrentUserId();

        this.store(list).subscribe((response: any) => {
            const list = new List(response.obj);

            this.updateSubscriber(list);

            if(updateNeedList) {
                for(let i = 0; i < list.items.length; i++) {
                    list.items[i] = new Item(list.items[i]);

                    this._needsService.updateSubscriber(list.items[i]);
                }
            }

            this._routeService.navigate(['/dashboard']);
        });
    }

    handleGetLists() {
        if (this.data.length > 0 || this.gettingData) {
            console.log('1');
            return this.data;
        }

        this.gettingData = true;

        return this.index().subscribe((response: any) => {
            const lists = response.obj;

            for (const list of lists) {
                this.updateSubscriber(new List(list));
            }

            this.gettingData = false;

            return lists;
        });
    }
}
