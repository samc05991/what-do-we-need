import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isUserLoggedIn: Boolean = false;
    public showDropdown: Boolean = false;
    public currentUrl: string = '';

    constructor(private _authService: AuthService, private _router: Router) {
        this._authService.userLoggedInChange.subscribe(value => {
            this.isUserLoggedIn = value;
        });

        this._router.events.subscribe((val: any) => {
            if(val instanceof NavigationEnd) {
                this.currentUrl = val.url;
                console.log(this.currentUrl);
            }
        });
    }

    get navigationTitle() {
        switch(this.currentUrl) {
            case '/dashboard':
                return 'Dashboard';
            case '/manage-inventory':
                return 'Inventory';
            case '/manage-chores':
                return 'Chores';
            default:
                return '';
        }
    }

    ngOnInit() {}

    logout() {
        this._authService.handleUserLogout();
    }
}
