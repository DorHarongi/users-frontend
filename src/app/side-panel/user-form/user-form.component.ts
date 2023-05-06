import { Component, Input, OnInit } from '@angular/core';
import { MapEventsService } from 'src/app/map/services/map-events.service';
import { User } from 'src/app/shared/models/user.model';
import { Location} from 'src/app/shared/models/location';
import { AccessLevel } from 'src/app/shared/models/accessLevel.enum';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  constructor(private mapEventsService: MapEventsService, private userService: UserService){}

  @Input() editedUser!: User
  user!: User;
  isEditMode!: boolean; // edit or create

  ngOnInit(): void {
    if(this.editedUser)
    {
      this.mapEventsService.changeMapCenter(this.editedUser.homeLocation);
      this.isEditMode = true;
      this.user = new User(this.editedUser.name, this.editedUser.email, this.editedUser.address,
      this.editedUser.accessLevel, this.editedUser.homeLocation);
    }
    else
    {
      this.isEditMode = false;
      this.user = new User("", "", "", AccessLevel.USER, new Location(0, 0));
    }

    this.mapEventsService.mapClicked$.subscribe((location: Location)=>{
      this.user.homeLocation = location;
    })
  }

  submit(): void{
    
    let userInput = {
      name: this.user.name,
      email: this.user.email,
      address: this.user.address,
      accessLevel: AccessLevel[this.user.accessLevel],
      homeLocation: {
        longitude: this.user.homeLocation.longitude,
        latitude: this.user.homeLocation.latitude
      }
    }

    if(this.isEditMode)
    {
      this.userService.editUser(userInput).subscribe((result)=>{
        console.log(result);
      })
    }
    else
    {
      this.userService.createUser(userInput).subscribe((result)=>{
        (console.log(result));
      })
    }
  }

}
