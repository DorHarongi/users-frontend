import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from 'src/app/shared/models/location';

@Injectable({
  providedIn: 'root'
})
export class MapClickingService {
  
  mapClicked$: Observable<Location>;
  private mapClickedSubject: Subject<Location>;

  constructor() { 
    this.mapClickedSubject = new Subject<Location>();
    this.mapClicked$ = this.mapClickedSubject.asObservable();
  }

  emitLocation(location: Location): void{
    this.mapClickedSubject.next(location);
  }
  
}
