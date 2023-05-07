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

  openCreateForm(userToEdit?: User): void{
    if(userToEdit) // we want to edit a user
    {
      if(!this.toggleEditUser ||  this.editedUserName == userToEdit.name) // clicked on the same user were editing - close it.
      {  
        this.toggleEditUser = !this.toggleEditUser;
      }
      this.editedUser = userToEdit;
      this.editedUserName = userToEdit?.name;
      this.toggleCreateUser = false;
    }
    else // we want to create a new user
    {
      this.toggleCreateUser = !this.toggleCreateUser;
      this.toggleEditUser = false;
    }
  }

  handleUserCreated(user: User): void
  {
    this.users = [...this.users, user] // add the new user that we just created
    this.toggleCreateUser = false;
    this.userService.changeUsers(this.users);
  }

  handleUserEdited(user: User): void
  {
    let copyArray: Array<User> = [...this.users]

    let editedUserIndex: number = copyArray.findIndex(item => item.name === user.name);
    if(editedUserIndex >= 0){
      copyArray[editedUserIndex] = user;
    }

    this.users = copyArray;
    this.userService.changeUsers(this.users);
  }

}
