import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapViewerComponent } from './map-viewer/map-viewer.component';



@NgModule({
  declarations: [
    MapViewerComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  exports: [MapViewerComponent]
})
export class MapModule { }
