import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Apollo } from 'apollo-angular';
import { GET_USERS, EDIT_USER, CREATE_USER } from './graphql.queries';
import { UpdateUserInput } from '../models/update-user-input.interface';
import { CreateUserInput } from '../models/create-user-input.interface';


@Injectable()

export class UserService {

  constructor(private apollo: Apollo) { 
    this.usersChangedSubject = new Subject<void>();
    this.usersChanged$ = this.usersChangedSubject.asObservable();
  }

  users: Array<User> = [];

  usersChanged$: Observable<void>;
  private usersChangedSubject: Subject<void>;

  changeUsers(newUsers: Array<User>)
  {
    this.users = [...newUsers];
    this.usersChangedSubject.next();
  }

  getUsers(): Observable<any> {
    let users$: Observable<any>;
    users$ = this.apollo.query<User>({
      query: GET_USERS
    });

    users$.subscribe((users)=>{
      this.users = users.data.getAllUsers;
    });

    return users$;
  }

  editUser(editedUser: UpdateUserInput): Observable<any> { 
    return this.apollo.mutate<User>({
      mutation: EDIT_USER,
      variables: {
        input: editedUser
      }
    });
  }

  createUser(createdUser: CreateUserInput): Observable<any>{
    return this.apollo.mutate<User>({
      mutation: CREATE_USER,
      variables: {
        input: createdUser
      }
    });
  }
}
