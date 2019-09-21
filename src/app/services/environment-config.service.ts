import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class EnvironmentConfig {

    public isProd = false;

    constructor() {}

    getBaseApiUrl() {
        if (this.isProd === true) {
        }
        else {
            return 'http://localhost:3000/api';
        }
    }
}
