import { AdditionalService } from "./additionalService"
import { Adventure } from "./adventure"
import { Boat } from "./boat"
import { Cottage } from "./cottage"

export class Action{
    id !: Number
    startDate !: String
    endDate !: String
    price !: Number
    boat !: Boat
    cottage !: Cottage
    adventure !: Adventure
    maxNumOfPersons !: Number
    taken !: Boolean
    services !: AdditionalService[]

}