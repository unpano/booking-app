import { ReservationType } from "./enums/ReservationType";
import { User } from "./user";

export class Reservation{
    reservationType !: ReservationType;
    startTime !: Date;
    endTime !: Date;
    client !: User;
}