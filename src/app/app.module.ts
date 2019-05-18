import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapViewComponent } from './map-view/map-view.component';
import { SportSelectionComponent } from './sport-selection/sport-selection.component';
import { Globals } from './global';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    SportSelectionComponent,
    NavbarComponent,
    CallbackComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'select/sport', component: SportSelectionComponent },
      { path: 'view/map', component: MapViewComponent },
    ]),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFZ_1LBsY7eAZygMwez_ytM_g0U3TheG8' + '&libraries=visualization'
    })
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent]
})
export class AppModule { }
