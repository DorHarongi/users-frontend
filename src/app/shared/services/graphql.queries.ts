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
`

export {GET_USERS}


