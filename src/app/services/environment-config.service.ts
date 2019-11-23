import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class EnvironmentConfig {

    public isProd = false;

    constructor() {}

    getBaseApiUrl() {
        if (this.isProd === true) {
            return 'https://what-do-we-need.herokuapp.com/api'
        }
        else {
            return 'http://localhost:3000/api';
        }
    }
}
