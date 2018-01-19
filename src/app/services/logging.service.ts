import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import * as moment from 'angular2-moment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as Constants from '../constants/constants';
import { User } from '../models/user';

export const LogLevels = {
    ALL: 0, // only for use in appState.logging.logLevel
    DEBUG: 1,
    INFO: 2,
    WARN: 4,
    ERROR: 8,
    FATAL: 16,
    OFF: 32, // only for use in appState.logging.logLevel
}

@Injectable()
export class LoggingService implements OnInit, OnDestroy {
    private _sessionId = 0;
    private user: User;
    private userSubscription: any;
    private appState: any;
    private appStateSubscription: any;

    constructor(private _http: Http, private _store: Store<any>) {
        this.userSubscription = this._store.select('user')
            .subscribe(user => { this.user = user; });
        this.appStateSubscription = this._store.select('appState')
            .subscribe(appState => { this.appState = appState; });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
        this.appStateSubscription.unsubscribe();
    }

    public initialize({ sessionId }): void {
        this._sessionId = sessionId;
    }

    public sendLogMessage(level, message): void {
        const payload = {
            applicationName: Constants.AppName,
            applicationVersion: Constants.AppVersion,
            date: new Date(),
            exception: null,
            ipAddress: null,
            level,
            line: null,
            logger: null,
            message,
            server: null,
            source: 'html browser client',
            stackTrace: null,
            thread: null,
            userAgent: window.navigator.userAgent,
            userId: this.user && this.user.loginName || null,
            userName: this.user && this.user.fullName || null,
            sessionId: this._sessionId,
        };
        this.send(payload);
    }

    public sendLogException(level, exc): void {
        const payload = {
            applicationName: Constants.AppName,
            applicationVersion: Constants.AppVersion,
            date: new Date(),
            exception: null,
            ipAddress: null,
            level,
            line: null,
            logger: null,
            message: exc.message,
            server: null,
            source: 'html browser client',
            stackTrace: exc.stackTrace || null,
            thread: null,
            userAgent: window.navigator.userAgent,
            userId: this.user && this.user.loginName || null,
            userName: this.user && this.user.fullName || null,
            sessionId: this._sessionId,
        };
        this.send(payload);
    }

    private send(payload): void {
        if (this.shouldLog(payload)) {
            if (this.appState['logging.sendToConsole']) {
                console.log(`[${payload.level}] => ${payload.message}`);
            }
            if (this.appState['logging.sendToApi']) {
                this.sendLogDataToApi({ payload });
            }
        }
    }

    private shouldLog(payload): boolean {
        if (payload.level >= this.appState['logging.logLevel']) {
            return true;
        } else {
            return false;
        }
    }

    private sendLogDataToApi({ payload }): void {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const result = this._http.post(`${Constants.ApiBaseUrl}/log`, payload, { headers, 'withCredentials': true })
                .map(res => {
                    return res.json() || {};
                })
                .catch(err => {
                    console.log(`Error occurred in LoggingService.sendLogDataToApi(${payload}) => ${err}`);
                    return Observable.throw(err);
                });
        } catch (err) {
            console.log(`Error occurred in LoggingService.sendLogDataToApi(${payload}) => ${err}`);
        }
    }

}
