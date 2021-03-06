import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { EnvironmentConfig } from './environment-config.service';

@Injectable()

export class AuthService {
    public currentUser: User;

    isUserLoggedIn: boolean;

    userLoggedInChange: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _http: HttpClient,
        private _envConfig: EnvironmentConfig,
        private _router: Router
    ) {
        this.userLoggedInChange.subscribe((value) => {
            this.isUserLoggedIn = value;
        });
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        if(token) {
            return true;
        }
    }

    toggleUserIsLoggedIn() {
        this.userLoggedInChange.next(this.isUserLoggedIn);
    }

    handleAddUser(user: User) {
        this.addUser(user).subscribe(
            (data: any) => {
                this.currentUser = data['user'];

                localStorage.setItem('user', JSON.stringify(this.currentUser));
                localStorage.setItem('token', JSON.stringify(data.token));

                this.isUserLoggedIn = true;

                this.toggleUserIsLoggedIn();

                this._router.navigate(['/dashboard']);
            },
            (error: any) => {}
        );
    }

    handleUserLogin (user: User) {
        this.loginUser(user).subscribe(
            (data: any) => {
                const userObject = new User();
                userObject.email = data['user'].email;
                userObject._id = data['user']._id;

                this.currentUser = userObject;

                localStorage.setItem('user', JSON.stringify(this.currentUser));
                localStorage.setItem('token', JSON.stringify(data['token']));

                this.isUserLoggedIn = true;

                this.toggleUserIsLoggedIn();

                this._router.navigate(['/dashboard']);
            },
            (error: any) => {}
        );
    }

    handleUserLogout () {
        localStorage.clear();

        this.isUserLoggedIn = false;

        this.toggleUserIsLoggedIn();

        this._router.navigate(['/']);
    }

    addUser(user: User): Observable<User> {
        return this._http.post<User>(this._envConfig.getBaseApiUrl() + '/users/sign-up', {user});
    }

    loginUser(user: User): Observable<User> {
        return this._http.post<User>(this._envConfig.getBaseApiUrl() + '/users/login', {user});
    }

    refreshCurrentUser(): Observable<Object> {
        return this._http.post(this._envConfig.getBaseApiUrl() + '/users/me', {});
    }

    getCurrentUserId() {
        const user = this.getCurrentUser();

        if (user && user._id) {
            return user._id;
        }
    }

    getCurrentUser() {
        if (this.currentUser) {
            return this.currentUser;
        }

        if (this.isAuthenticated()) {
            this.refreshCurrentUser().subscribe(
                (response: any) => {
                    this.currentUser = new User();
                    this.currentUser._id = response.obj[0]._id;

                    this.isUserLoggedIn = true;
                    this.toggleUserIsLoggedIn();

                    return this.currentUser;
                }
            );
        } 
        else {
            // return a message here too saying not auth
            this._router.navigate(['/']);
        }
    }
}
