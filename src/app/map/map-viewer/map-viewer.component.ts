import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from 'src/app/shared/models/location';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MapEventsService } from '../services/map-events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private mapEventsService: MapEventsService){}

  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  mapCenter!: google.maps.LatLngLiteral;
  mapCenterChangedSubscription!: Subscription;
  usersChangedSubscription!: Subscription;

  ngOnInit(): void {
    this.addMarkersForUsers();

    this.mapCenterChangedSubscription = this.mapEventsService.mapCenterChange$.subscribe((center: Location)=>{
      this.mapCenter = {
        lat: center.latitude,
        lng: center.longitude
      }
    })

  this.usersChangedSubscription = this.userService.usersChanged$.subscribe(()=>{
      this.markerPositions = [];
      this.addMarkersForUsers();
    })
  }

  ngOnDestroy(): void {
    this.usersChangedSubscription.unsubscribe();
    this.mapCenterChangedSubscription.unsubscribe();
  }

  mapClicked(event: google.maps.MapMouseEvent) {
    if(event.latLng)
      this.mapEventsService.emitLocation(new Location(event.latLng.toJSON().lng, event.latLng.toJSON().lat));
  }

  addMarkersForUsers(): void{
    this.userService.users.forEach((user: User)=>{
      this.markerPositions.push({lat: user.homeLocation.latitude, lng: user.homeLocation.longitude});
    });
  }

}
