import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from 'src/app/shared/models/location';

@Injectable({
  providedIn: 'root'
})
export class MapEventsService {
  
  mapClicked$: Observable<Location>;
  private mapClickedSubject: Subject<Location>;

  mapCenterChange$: Observable<Location>;
  private mapCenterChangeSubject: Subject<Location>;

  constructor() { 
    this.mapClickedSubject = new Subject<Location>();
    this.mapClicked$ = this.mapClickedSubject.asObservable();

    this.mapCenterChangeSubject = new Subject<Location>();
    this.mapCenterChange$ = this.mapCenterChangeSubject.asObservable();
  }

  emitLocation(location: Location): void{
    this.mapClickedSubject.next(location);
  }

  changeMapCenter(location: Location): void{
    this.mapCenterChangeSubject.next(location);
  }
  
}
