import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster/angular2-toaster';

import { AppStateActions } from '../../actionHandlers/appState.actions';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    public toasterconfig: ToasterConfig = new ToasterConfig({ showCloseButton: true });

    constructor(
        private _appStateActions: AppStateActions
    ) { }

    public ngOnInit() {
        this._appStateActions.initializeApp();
    }

}
