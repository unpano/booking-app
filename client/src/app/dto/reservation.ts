import { ReservationType } from "./enums/ReservationType";
import { User } from "./user";

export class Reservation{
    id !: Number
    reservationType !: ReservationType
    startTime !: Date
    endTime !: Date
    client !: User
    reported : Boolean = false
}