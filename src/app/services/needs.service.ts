import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { NeedsList } from '../models/needs.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { EnvironmentConfig } from './environment-config.service';
import { ServiceProviderService } from './service-provider.service';

@Injectable({
    providedIn: 'root'
})

export class NeedsService extends ServiceProviderService {

    dataUpdatedSubscriber(list: NeedsList) {
        this.dataUpdatedSubscriber.next(list);
    }    
}
