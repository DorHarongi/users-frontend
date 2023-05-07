import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from 'src/app/shared/models/location';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MapEventsService } from '../services/map-events.service';
import { Subscription } from 'rxjs';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private mapEventsService: MapEventsService){}

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  mapCenterChangedSubscription!: Subscription;
  usersChangedSubscription!: Subscription;

  panPath: number[][] = [];   // An array of points the current panning action will use
  panQueue: number[][] = [];  // An array of subsequent panTo actions to take
  STEPS = 50;     // The number of steps that each panTo action will undergo


  ngOnInit(): void {
    this.addMarkersForUsers();
    this.doPan = this.doPan.bind(this);
    this.mapCenterChangedSubscription = this.mapEventsService.mapCenterChange$.subscribe((center: Location)=>{
        this.panTo(center.latitude, center.longitude);
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

  panTo(newLat: number, newLng: number) {
    if (this.panPath.length > 0) {
      // We are already moving the map...queue this up for next move
      this.panQueue.push([newLat, newLng]);
    } else{
      // Lets compute the points we'll use
      this.panPath.push([]); // 'release' this before calling setTimeout
      var curLat = this.map?.getCenter()?.lat();
      var curLng = this.map?.getCenter()?.lng();
    
      if(curLat && curLng)
      {
        var dLat = (newLat - curLat)/this.STEPS;
        var dLng = (newLng - curLng)/this.STEPS;
    
        for (var i=0; i < this.STEPS; i++) {
          this.panPath.push([curLat + dLat * i, curLng + dLng * i]);
        }
        this.panPath.push([newLat, newLng]);
        this.panPath.shift(); // LAZY SYNCRONIZED LOCK
        setTimeout(this.doPan, 20);
      }
    }
  }
  
  doPan() {
    var next = this.panPath.shift();
    if (next != null) {
      // Continue our current pan action
      this.map.panTo( new google.maps.LatLng(next[0], next[1]));
      setTimeout(this.doPan, 20 );
    } else {
      // We are finished with this pan - check if there are any queue'd up locations to pan to 
      var queued = this.panQueue.shift();
      if (queued != null) {
        this.panTo(queued[0], queued[1]);
      }
    }
  }

}
