import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from './graphql.queries';


@Injectable()

export class UserService {

  constructor(private apollo: Apollo) { }

  users: Array<User> = [];

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

}
