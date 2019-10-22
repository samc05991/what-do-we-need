import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { EnvironmentConfig } from '../services/environment-config.service';
import { AuthService } from '../services/auth.service';
import { List } from '../models/list.model';
import { Item } from '../models/item.model';
import { Router } from '@angular/router';

@Injectable()

export class ListService {

    lists: List[] = [];
    gettingLists: boolean = false;
    updateListSubscriber: Subject<List> = new Subject<List>();

    constructor(
        private _http: HttpClient,
        private _envConfig: EnvironmentConfig,
        private _authService: AuthService,
        private _routeService: Router
    ) {
        this.updateListSubscriber.subscribe(
            (list: List) => {
                this.lists.push(list);
            }
        );
    }

    dataUpdatedSubscriber(list: List) {
        this.updateListSubscriber.next(list);
    }

    handleAddList(list: List, updateNeedList: Boolean = false) {
        list.created_by = this._authService.getCurrentUserId();

        this.addList(list).subscribe((response: any) => {
            const list = new List(response.obj);

            this.dataUpdatedSubscriber(list);

            if(updateNeedList) {
                for(let i = 0; i < list.items.length; i++) {
                    list.items[i] = new Item(list.items[i]);

                    // this._needsService.addNeedItem(list.items[i]);
                }
            }

            this._routeService.navigate(['/dashboard']);
        });
    }

    handleGetLists() {
        if (this.lists.length > 0 || this.gettingLists) {
            return this.lists;
        }

        this.gettingLists = true;

        return this.getLists().subscribe((response: any) => {
            const lists = response.obj;

            for (const list of lists) {
                for(let i = 0; i < list.items.length; i++) {
                    list.items[i] = new Item(list.items[i]);
                }

                this.dataUpdatedSubscriber(new List(list));
            }

            this.gettingLists = false;

            return lists;
        });
    }

    deleteList(list: List): Observable<List>  {
        return this._http.delete<List>(this._envConfig.getBaseApiUrl() + '/lists/' + list._id);
    }

    addList(list: List): Observable<List>  {
        return this._http.post<List>(this._envConfig.getBaseApiUrl() + '/lists/create-list', { list });
    }

    editList(list: List): Observable<List>  {
        return this._http.patch<List>(this._envConfig.getBaseApiUrl() + '/lists/update', { list });
    }

    getLists() {
        return this._http.get<List[]>(this._envConfig.getBaseApiUrl() + '/lists/' + this._authService.getCurrentUserId(), {});
    }
}
