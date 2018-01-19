import { Action } from '@ngrx/store';

import { User } from '../models/user';

// State
export type State = User;

// ActionTypes
export const
    LOAD_USER_PROFILE = 'LOAD_USER_PROFILE';

export class LoadUserProfileAction implements Action {
    readonly type = LOAD_USER_PROFILE;
    payload: User;
}
export type Actions = LoadUserProfileAction;

// Store/Reducer
export function user(state: State = null, action: Actions): State {
    switch (action.type) {

        case LOAD_USER_PROFILE:
            return action.payload;

        default:
            return state;

    }
};
