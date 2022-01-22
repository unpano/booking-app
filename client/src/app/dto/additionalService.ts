import { Adventure } from "./adventure";
import { Boat } from "./boat";
import { Cottage } from "./cottage";
import { ReservationType } from "./enums/ReservationType";

export class AdditionalService{
    id !: Number
    info !: String
    name !: String
    price !: Number

    reservationType !: ReservationType;
    boat !: Boat
    cottage !: Cottage
    adventure !: Adventure
  }