import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import { VehicleType } from '../../models/vehicleType';

@Component({
  selector: 'app-vehicle-type',
  styleUrls: ['./vehicleType.component.css'],
  templateUrl: './vehicleType.component.html',
})
export class VehicleTypeComponent implements OnInit, OnDestroy {

  private vehicleTypes: Array<VehicleType>;
  private vehicleTypesSubscription;

  private selectedVehicleTypeId: string;
  public selectedVehicleType: VehicleType;

  public isPaymentTransactionModalShown: boolean;
  private isPaymentTransactionModalShownSubscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<any>,
    private _appStateActions: AppStateActions,
  ) { }

  public ngOnInit() {
    this.vehicleTypesSubscription = this._store.select('vehicleTypes').subscribe((vt: Array<VehicleType>) => {
      this.vehicleTypes = vt;
    });

    this.isPaymentTransactionModalShownSubscription = this._store.select('appState').subscribe((appState: any) => {
      this.isPaymentTransactionModalShown = appState['isPaymentTransactionModalShown'];
    });

    this._route.params.subscribe(params => {
      this.selectedVehicleTypeId = params['id'];
      this.selectedVehicleType = this.vehicleTypes.find(vt => vt.id === this.selectedVehicleTypeId);
      console.log(`switched to ${JSON.stringify(this.selectedVehicleType)}`);
    });
  }

  public ngOnDestroy() {
    this.vehicleTypesSubscription.unsubscribe();
    this.isPaymentTransactionModalShownSubscription.unsubscribe();
  }

  public buyNow() {
    this._appStateActions.updateState({ 'isPaymentTransactionModalShown': true });
  }

  public paymentTrxModalClosed() {
    this._appStateActions.updateState({ 'isPaymentTransactionModalShown': false });
  }

}
