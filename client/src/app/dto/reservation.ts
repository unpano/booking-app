import { Boat } from "./boat";
import { ReservationType } from "./enums/ReservationType";
import { User } from "./user";

export class Reservation{
    id !: Number
    reservationType !: ReservationType;
    startTime !: String;
    endTime !: String;
    client !: User;
    reported : Boolean = false
    price !: String
    numOfPersons !: String
    clientId !: string
    boatId !: string
}