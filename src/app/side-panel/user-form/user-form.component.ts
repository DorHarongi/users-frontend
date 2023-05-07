import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Location} from 'src/app/shared/models/location';
import { AccessLevel } from 'src/app/shared/models/accessLevel.enum';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService){}

  @Input() editedUser!: User
  @Output() userCreated: EventEmitter<User> = new EventEmitter<User>();
  @Output() userEdited: EventEmitter<User> = new EventEmitter<User>();

  userEditedResponseSubscription!: Subscription;
  userCreatedResponseSubsciprtion!: Subscription;

  user!: User;
  isEditMode!: boolean; // edit or create

  ngOnInit(): void {
    if(this.editedUser) // editing
    {
      this.isEditMode = true;
      this.user = new User(this.editedUser.name, this.editedUser.email, this.editedUser.address,
      this.editedUser.accessLevel, new Location(this.editedUser.homeLocation.longitude, this.editedUser.homeLocation.latitude));
    }
    else // creating
    {
      this.isEditMode = false;
      this.user = new User("", "", "", AccessLevel.USER, new Location(0, 0));
    }
  }

  ngOnDestroy(): void {
    if(this.userEditedResponseSubscription)
      this.userEditedResponseSubscription.unsubscribe();
    if(this.userCreatedResponseSubsciprtion)
    this.userCreatedResponseSubsciprtion.unsubscribe();
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
      this.userEditedResponseSubscription = this.userService.editUser(userInput).subscribe((result)=>{
        this.userEdited.emit(this.user);
      })
    }
    else
    {
      this.userCreatedResponseSubsciprtion = this.userService.createUser(userInput).subscribe((result)=>{
        this.userCreated.emit(this.user);
      })
    }
  }

}
