import { ReservationType } from "./enums/ReservationType";
import { User } from "./user";

export class Reservation{
    id !: Number
    reservationType !: ReservationType;
    startTime !: any;
    endTime !: any;
    client !: User;
    reported : Boolean = false
    price !: Number
}