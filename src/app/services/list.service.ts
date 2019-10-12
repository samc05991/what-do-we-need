import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { EnvironmentConfig } from '../services/environment-config.service';
import { AuthService } from '../services/auth.service';
import { List } from '../models/list.model';

@Injectable()

export class ListService {

    // Objects
    lists: List[] = [];

    // Events
    listIsEdit = new EventEmitter<List>();

    gettingLists: boolean = false;
    updateListSubscriber: Subject<List> = new Subject<List>();

    constructor(
        private _http: HttpClient,
        private _envConfig: EnvironmentConfig,
        private _authService: AuthService,
    ) {
        this.updateListSubscriber.subscribe(
            (list: List) => {
                this.lists.push(list);
            }
        );
    }

    updateListsList(list: List) {
        this.updateListSubscriber.next(list);
    }

    handleAddList(list: List) {
        this.addList(list).subscribe((response: any) => {
            this.lists.push(new List(response.json().obj));

            return new List(response.json().obj);
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
                this.updateListsList(new List(list));
            }

            this.gettingLists = false;
            return lists;
        });
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
