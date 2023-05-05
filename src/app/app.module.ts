import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapModule } from './map/map.module';
import { SidePanelModule } from './side-panel/side-panel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
    SidePanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
