import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

// ActionTypes
import {
    START_LOADER,
    STOP_LOADER,
} from '../stores/loaderState.store';

@Injectable()
export class LoaderActions {

    constructor(
        private _store: Store<any>,
    ) { }

    public showLoaderGraphic(shouldBlock: boolean = false): void {
        this._store.dispatch(
            {
                type: START_LOADER,
                payload: { shouldBlock }
            }
        );
    }

    public hideLoaderGraphic(): void {
        this._store.dispatch(
            {
                type: STOP_LOADER
            }
        );
    }

}
