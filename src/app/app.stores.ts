// Store framework functions
import { compose } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

// Stores/Reducers
import { appState } from './stores/appState.store';
import { loaderState } from './stores/loaderState.store';
import { payment } from './stores/payment.store';
import { user } from './stores/user.store';
import { userRoleMask } from './stores/userRoleMask.store';
import { vehicleTypes } from './stores/vehicles.store';

// const reducers = { /* see below */
export const APP_STORES = {
    // AppState
    appState,
    loaderState,

    // User
    user,
    userRoleMask,

    // Vehicles
    vehicleTypes,

    // Payment
    payment,
};

/*
// required for AOT -- see http://orizens.com/wp/topics/guidelines-for-developing-with-angular-ngrxstore-ngrxeffects-aot/
const composer = compose(Object.keys(reducers), combineReducers)(reducers);

export function APP_STORES(state: any, action: any) {
    return composer(state, action);
}
*/
