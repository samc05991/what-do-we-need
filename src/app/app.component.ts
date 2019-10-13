import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { EnvironmentConfig } from './services/environment-config.service';
import { ListService } from './services/list.service';
import { User } from './models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AuthService, EnvironmentConfig, ListService]
})

export class AppComponent implements OnInit {
    title = 'what-do-we-need'; 

    public isUserLoggedIn: Boolean;

    constructor(private _authService: AuthService, private _listService: ListService) {
        this.isUserLoggedIn = false;

        this._authService.userLoggedInChange.subscribe(value => {
            this.isUserLoggedIn = value;

            if(value) {
                this._listService.handleGetLists();
            }
        });
    }

    ngOnInit() {
        if(this._authService.isAuthenticated()) {
            this._authService.refreshCurrentUser().subscribe(
                (response: any) => {
                    this._authService.currentUser = new User();
                    this._authService.currentUser._id = response.obj[0]._id;

                    this._authService.isUserLoggedIn = true;
                    this._authService.toggleUserIsLoggedIn();
                }
            );
        }
    }
}
