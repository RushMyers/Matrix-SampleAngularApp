import { Action } from '@ngrx/store';

import * as Constants from '../constants/constants';
import { LogLevels } from '../services/logging.service';

// State
export type State = {
    /* globals */
    'global.apiVersion': string;
    'global.isUserSessionActive': boolean;

    /* logging service */
    'logging.sendToConsole': boolean;
    'logging.sendToApi': boolean;
    'logging.logLevel': number;

    /* Modals */
    'isPaymentTransactionModalShown': boolean;

    /* Main Menu */
    'menu.mainMenuCollapsed': boolean;

    /* search */
    'search.quoteSearchObject': null,
    'search.returnToQuoteSearchResults': boolean;
    'search.backToSearchResultsNeeded': boolean;
};
const initialAppState = {
    /* globals */
    'global.apiVersion': '',
    'global.isUserSessionActive': false,

    /* logging service */
    'logging.sendToConsole': true,
    'logging.sendToApi': false,
    'logging.logLevel': LogLevels.ERROR,

    /* Modals */
    'isPaymentTransactionModalShown': false,

    /* Main Menu */
    'menu.mainMenuCollapsed': true,

    /* search */
    'search.quoteSearchObject': null,
    'search.returnToQuoteSearchResults': false,
    'search.backToSearchResultsNeeded': false
};

// ActionTypes
export const
    UPDATE_APP_STATE = 'UPDATE_APP_STATE';

export class UpdateAppStateAction implements Action {
    readonly type = UPDATE_APP_STATE;
    payload: object;
}
export type Actions = UpdateAppStateAction;

// Store/Reducer
export function appState(state: State = initialAppState, action: Actions): State {
    switch (action.type) {
        case UPDATE_APP_STATE:
            const newState = Object.assign({}, state);
            Object.keys(action.payload).map((prop) => {
                // only update known properties, to catch errors
                if (prop in state) {
                    const newValue = action.payload[prop];
                    newState[prop] = newValue;
                } else {
                    // console.log(`invalid property [${prop}] passed into UiState-reducer`);
                }
            });
            return newState;

        default:
            return state;
    }
};
