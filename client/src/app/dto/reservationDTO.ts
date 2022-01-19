import { ReservationType } from "./enums/ReservationType";

export class ReservationDTO{
    id !: Number
    reservationType !: ReservationType;
    startTime !: String;
    endTime !: String;
    price !: String

}
