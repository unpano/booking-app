import { ReservationType } from "./enums/ReservationType";
import { User } from "./user";

export class Reservation{
    id !: Number
    reservationType !: String;
    startTime !: String;
    endTime !: String;
    client !: User;
    reported : Boolean = false
    price !: String
}