import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject, Observable } from 'rxjs';
import { NeedsList } from '../models/needs.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { EnvironmentConfig } from './environment-config.service';
import { HttpClient } from '@angular/common/http';
import { BaseModel } from '../models/base-model.model';

@Injectable({
    providedIn: 'root'
})

/**
 * @class ServiceProviderService
 * @desc This is used as a base service to quickly get services up and running
 * @desc Extend as is and use the public methods to talk to the API and to subscribe for changes
 */
export class ServiceProviderService {

    /** @desc where the data the service is handling is stored */
    public data: BaseModel[] = [];

    /** @desc where the data the service is handling is stored */
    public gettingData: boolean = false;

    /** @desc this is the subscriber to be listened to in a component for it to update when there has been a change */
    public subscriberUpdated: Subject<NeedsList> = new Subject<NeedsList>();

    /** @desc add the name of the endpoint here */
    public apiEndpoint: string = '/test'

    constructor(
        public _http: HttpClient,
        public _envConfig: EnvironmentConfig,
        public _authService: AuthService,
        public _routeService: Router
    ) {

        /** @desc where the data the service is handling is stored */
        this.subscriberUpdated.subscribe(
            (model: BaseModel) => {
                this.data.push(model);
            }
        );
    }

    /** @desc to be used to add models to the services data array */
    updateSubscriber(model: BaseModel) {
        this.subscriberUpdated.next(model)
    }

    /** @desc remove a model from the database */
    destroy(model: BaseModel): Observable<BaseModel>  {
        return this._http.delete<BaseModel>(this._envConfig.getBaseApiUrl() + this.apiEndpoint + '/' + model._id);
    }

    /** @desc save a model to the database */
    store(model: BaseModel): Observable<BaseModel>  {
        return this._http.post<BaseModel>(this._envConfig.getBaseApiUrl() + this.apiEndpoint + '/create', { model });
    }

    /** @desc update a specific model */
    update(model: BaseModel): Observable<BaseModel>  {
        return this._http.patch<BaseModel>(this._envConfig.getBaseApiUrl() + this.apiEndpoint + '/update', { model });
    }

    /** @desc return an array of models */
    index(params: {} = {}) {
        return this._http.get<BaseModel[]>(this._envConfig.getBaseApiUrl() + this.apiEndpoint + '/' + this._authService.getCurrentUserId(), {params});
    }
}
