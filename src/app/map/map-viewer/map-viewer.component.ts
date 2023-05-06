import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/shared/models/location';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MapClickingService } from '../services/map-clicking.service';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit {

  constructor(private userService: UserService, private mapClickingService: MapClickingService){}

  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  ngOnInit(): void {
    this.addMarkersForUsers();
  }

  mapClicked(event: google.maps.MapMouseEvent) {
    if(event.latLng)
      this.mapClickingService.emitLocation(new Location(event.latLng.toJSON().lng, event.latLng.toJSON().lat));
  }

  addMarkersForUsers(): void{
    this.userService.users.forEach((user: User)=>{
      this.markerPositions.push({lat: user.homeLocation.latitude, lng: user.homeLocation.longitude});
    });
  }

}
