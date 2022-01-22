import { AdditionalService } from "./additionalService"
import { Adventure } from "./adventure"
import { Boat } from "./boat"
import { Cottage } from "./cottage"
import { ReservationType } from "./enums/ReservationType"

export class Action{
    id !: Number
    reservationType !: ReservationType;
    startDate !: String
    endDate !: String
    price !: Number
    oldPrice !: Number
    boat !: Boat
    cottage !: Cottage
    adventure !: Adventure
    maxNumOfPersons !: Number
    taken !: Boolean
    services !: AdditionalService[]

}