import { Action } from '@ngrx/store';

import { User } from '../models/user';

// State
export type State = any;

// ActionTypes
export const
    UPDATE_USER_ROLE_MASK = 'UPDATE_USER_ROLE_MASK',
    CLEAR_USER_ROLE_MASK = 'CLEAR_USER_ROLE_MASK';

export class UpdateUserRoleMaskAction implements Action {
    readonly type = UPDATE_USER_ROLE_MASK;
    payload: any;
}
export class ClearUserRoleMaskAction implements Action {
    readonly type = CLEAR_USER_ROLE_MASK;
}
export type Actions = UpdateUserRoleMaskAction | ClearUserRoleMaskAction;

// Store/Reducer
export function userRoleMask(state: any = {}, action: Actions): State {
    switch (action.type) {

        case UPDATE_USER_ROLE_MASK:
            return action.payload;

        case CLEAR_USER_ROLE_MASK:
            return {};

        default:
            return state;
    }
};
