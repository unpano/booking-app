import { ReservationType } from "./enums/ReservationType";

export class Reservation{
    reservationType !: ReservationType;
    startTime !: Date;
    endTime !: Date;
}