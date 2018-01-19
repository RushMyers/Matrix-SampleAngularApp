import { Action } from '@ngrx/store';

import { PaymentTrxResponse } from '../models/paymentTrxResponse';

// State
export type State = PaymentTrxResponse;

// ActionTypes
export const
    UPDATE_PAYMENT_TRX = 'UPDATE_PAYMENT_TRX',
    CLEAR_PAYMENT_TRX = 'CLEAR_PAYMENT_TRX';

export class UpdatePaymentTrxAction implements Action {
    readonly type = UPDATE_PAYMENT_TRX;
    payload: PaymentTrxResponse;
}
export class ClearPaymentTrxAction implements Action {
    readonly type = CLEAR_PAYMENT_TRX;
}
export type Actions = UpdatePaymentTrxAction | ClearPaymentTrxAction;

// Store/Reducer
export function payment(state: State = null, action: Actions): State {
    switch (action.type) {

        case UPDATE_PAYMENT_TRX:
            return action.payload;

        case CLEAR_PAYMENT_TRX:
            return null;

        default:
            return state;
    }
};
