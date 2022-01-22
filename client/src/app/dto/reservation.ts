import { Adventure } from "./adventure";
import { Boat } from "./boat";
import { Client } from "./client";
import { Cottage } from "./cottage";
import { ReservationType } from "./enums/ReservationType";
import { User } from "./user";

export class Reservation{
    id !: Number
    reservationType !: ReservationType;
    startTime !: String;
    endTime !: String;
    client !: Client;
    reported : Boolean = false
    price !: Number
    numOfPersons !: Number
    boat !: Boat 
    cottage !: Cottage
    adventure !: Adventure
}