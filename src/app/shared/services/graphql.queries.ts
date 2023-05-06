import {gql} from 'apollo-angular'

const GET_USERS = gql`
query {
    getAllUsers {
      name
      email
      address
      accessLevel
      homeLocation {
        longitude
        latitude
      }
    }
  }
`;

const CREATE_USER = gql`
mutation createUser($input: CreateUserInput!) {
  createUser(createUserData: $input) {
    name
    email
    address
    accessLevel
    homeLocation {
      longitude
      latitude
    }
  }
}
`;

const EDIT_USER = gql`
mutation editUser($input: UpdateUserInput!) {
  updateUser(updateUserData: $input){
    name
    email
    address
    accessLevel
    homeLocation {
      longitude
      latitude
    }
  }
}
`;

export {GET_USERS, CREATE_USER, EDIT_USER}


