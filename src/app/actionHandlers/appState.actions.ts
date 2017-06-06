import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { VehicleType } from '../models/vehicleType';

// ActionTypes
import {
    UPDATE_APP_STATE,
    START_LOADER,
    STOP_LOADER,
} from '../stores/appState.store';
import {
    UPDATE_VEHICLE_TYPES
} from '../stores/vehicles.store';

@Injectable()
export class AppStateActions {

    constructor(
        private _store: Store<any>,
    ) { }

    public initializeApp(): void {
        // load vehicle types
        const vehicleTypes: Array<VehicleType> = this.getVehicleTypesMock();
        this._store.dispatch({ type: UPDATE_VEHICLE_TYPES, payload: vehicleTypes });
    }

    public updateState(stateChanges): void {
        this._store.dispatch(
            {
                type: UPDATE_APP_STATE,
                payload: stateChanges
            }
        );
    }

    //------------------------------------------------------------------------------------------------
    // mock services

    private getVehicleTypesMock(): Array<VehicleType> {
        const vehicleTypes = [
            {
                id: "S",
                name: "Model S",
                description: "Luxury sedan with great performance",
                imageUrl: 'http://insideevs.com/wp-content/uploads/2013/12/tesla-model-s-beach.jpg',
                basePrice: 65000,
            },
            {
                id: "3",
                name: "Model 3",
                description: "An affordable compact car for the masses",
                // imageUrl: 'http://viteze.ro/wp-content/uploads/2016/04/tesla-model-3-2.jpg',
                // imageUrl: 'http://insideevs.com/wp-content/uploads/2016/06/model-3.jpg',
                imageUrl: 'http://cdn.coresites.factorymedia.com/mpora_new/wp-content/uploads/2015/06/1966_vw_beetle_by_dangeruss-d5qbyyz.jpg',
                basePrice: 35000,
            },
            {
                id: "X",
                name: "Model X",
                description: "Luxury SUV with great performance and cargo capacity",
                // imageUrl: 'https://cdn.arstechnica.net/wp-content/uploads/sites/3/2015/06/Tesla_Model_X_front_view_16042113157.jpg',
                // imageUrl: 'http://www.tflcar.com/wp-content/uploads/2014/06/Tesla-Model-X.jpg',
                // imageUrl: 'https://wordlesstech.com/wp-content/uploads/2015/10/Tesla-Model-X-3.jpg',
                // imageUrl: 'http://st.motortrend.com/uploads/sites/5/2016/03/2016-Tesla-Model-X-P90D-side-profile.jpg',
                imageUrl: 'https://cdn.arstechnica.net/wp-content/uploads/2014/05/DSC_2096-980x651.jpg',
                basePrice: 75000,
            },
        ];
        return vehicleTypes;
    }

}