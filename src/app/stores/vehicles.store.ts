import { Action } from '@ngrx/store';
import { VehicleType } from '../models/vehicleType';

// State
export type State = Array<VehicleType>;

// ActionTypes
export const
    UPDATE_VEHICLE_TYPES = 'UPDATE_VEHICLE_TYPES',
    CLEAR_VEHICLE_TYPES = 'CLEAR_VEHICLE_TYPES';

export class UpdateVehicleTypesAction implements Action {
    readonly type = UPDATE_VEHICLE_TYPES;
    payload: Array<VehicleType>;
}
export class ClearVehicleTypesAction implements Action {
    readonly type = CLEAR_VEHICLE_TYPES;
}
export type Actions = UpdateVehicleTypesAction | ClearVehicleTypesAction;

// Store/Reducer
export function vehicleTypes(state: State = [], action: Actions): State {
    switch (action.type) {

        case UPDATE_VEHICLE_TYPES:
            return action.payload;

        case CLEAR_VEHICLE_TYPES:
            return [];

        default:
            return state;
    }
};
