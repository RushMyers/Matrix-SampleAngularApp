import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MomentModule } from 'angular2-moment';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { environment } from '../environments/environment';
import { APP_ACTION_HANDLERS } from './app.actionHandlers';
import { APP_COMPONENTS } from './app.components';
import { APP_MOCK_INTERCEPTORS } from './app.mock.interceptors';
import { APP_ROUTES } from './app.routes';
import { APP_SERVICES } from './app.services';
import { APP_STORES } from './app.stores';
import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    ...APP_COMPONENTS,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot(APP_STORES),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    ToasterModule,
    HttpClientModule
  ],
  providers: [
    ...APP_ACTION_HANDLERS,
    ...APP_SERVICES,
    ...(environment.useMocking ? APP_MOCK_INTERCEPTORS : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
