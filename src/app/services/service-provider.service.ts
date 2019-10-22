import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { NeedsList } from '../models/needs.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { EnvironmentConfig } from './environment-config.service';
import { HttpClient } from '@angular/common/http';
import { BaseModel } from '../models/base-model.model';

@Injectable({
    providedIn: 'root'
})

export class ServiceProviderService {

    public data: BaseModel[] = [];
    public gettingData: boolean = false;
    public dataUpdatedSubscriber: Subject<NeedsList> = new Subject<NeedsList>();

    constructor(
        private _http: HttpClient,
        private _envConfig: EnvironmentConfig,
        private _authService: AuthService,
        private _routeService: Router
    ) {
        this.dataUpdatedSubscriber.subscribe(
            (model: BaseModel) => {
                this.data.push(model);
            }
        );
    }
}
