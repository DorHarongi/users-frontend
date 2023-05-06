import { AccessLevel } from "./accessLevel.enum";
import { Location } from "./location";

export class User
{
    name: string;
    email: string;
    address: string;
    accessLevel: AccessLevel;
    homeLocation: Location;

    constructor(name: string, email:string, address: string, accessLevel: AccessLevel, homeLocation: Location)
    {
        this.name = name;
        this.email = email;
        this.address= address;
        this.accessLevel = accessLevel;
        this.homeLocation = homeLocation
    }
}