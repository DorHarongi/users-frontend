import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from 'src/app/shared/models/location';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit {

  constructor(private userService: UserService){}

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  panPath: number[][] = [];   // An array of points the current panning action will use
  panQueue: number[][] = [];  // An array of subsequent panTo actions to take
  panningSteps = 50; // The number of steps that each panTo action will undergo


  ngOnInit(): void {
    this.addMarkersForUsers();
  }

  addMarkersForUsers(): void{
    this.userService.users.forEach((user: User)=>{
      this.markerPositions.push({lat: user.homeLocation.latitude, lng: user.homeLocation.longitude});
    });
  }

}
