import { AdditionalAdvService } from "./AdditionalAdvService";
import { Adventure } from "./Adventure";
import { ReservationType } from "./enums/ReservationType";

export class AdventureReservation{
    id !: Number;
    adventure !: Adventure;
    reservationType !: ReservationType;
    startTime !: Date;
    endTime !: Date;
    exactPlace !: String;
    additionalAdvServices !: String[];
    isReserved !: Boolean;
    instructorId !: Number;
    instructorEmail !: Number;
    hasReserved !: Boolean;

}