import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: Array<User>;
  editedUser!: User;
  editedUserName!: string;
  toggleCreateUser: boolean = false;
  toggleEditUser: boolean = false;

  constructor(private userService: UserService){
    this.users = this.userService.users;
  }

  ngOnInit(): void {}

  openCreateForm(editedUser?: User): void{
    if(editedUser) // editing user
    {
      if(editedUser.name == this.editedUserName) // clicked on the same user were editing - close it.
        this.toggleEditUser = !this.toggleEditUser;
      this.editedUser = editedUser;
      this.editedUserName = editedUser?.name;
      this.toggleCreateUser = false;
    }
    else // creating user
    {
      this.toggleCreateUser = !this.toggleCreateUser;
      this.toggleEditUser = false;
    }
  }

}
