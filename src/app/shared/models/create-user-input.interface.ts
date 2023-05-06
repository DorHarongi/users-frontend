export interface CreateUserInput {
    name: string;
    email: string;
    address: string;
    accessLevel: string;
    homeLocation: {
      longitude: number;
      latitude: number;
    }
  }
    