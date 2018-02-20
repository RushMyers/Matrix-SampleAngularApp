import { Action } from '@ngrx/store';
import { VehicleType } from '../models/vehicleType';

// State
export class State {
    isLoaderVisible: boolean;
    isBlockerVisible: boolean;
    refCount: number;
    shouldBlock: boolean;
};
const loaderInitialState = {
    isLoaderVisible: false,
    isBlockerVisible: false,
    refCount: 0,
    shouldBlock: false,
}

// ActionTypes
export const
    START_LOADER = 'START_LOADER',
    STOP_LOADER = 'STOP_LOADER';

export class StartLoaderAction implements Action {
    readonly type = START_LOADER;
    payload: State;
}
export class StopLoaderAction implements Action {
    readonly type = STOP_LOADER;
}
export type Actions = StartLoaderAction | StopLoaderAction;

// Store/Reducer
export function loaderState(state: State = loaderInitialState, action: Actions): State {
    switch (action.type) {

        case START_LOADER:
            return Object.assign(
                {},
                state,
                {
                    isBlockerVisible: action.payload.shouldBlock ? true : state.isBlockerVisible,
                    isLoaderVisible: true,
                    refCount: state.refCount + 1,
                }
            );

        case STOP_LOADER:
            return Object.assign(
                {},
                state,
                {
                    isBlockerVisible: (state.isBlockerVisible && (state.refCount - 1) === 0) ? false : state.isBlockerVisible,
                    isLoaderVisible: ((state.refCount - 1) > 0),
                    refCount: state.refCount - 1,
                }
            );

        default:
            return state;
    }
};
